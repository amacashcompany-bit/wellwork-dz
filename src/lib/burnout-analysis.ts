import { createServerFn } from "@tanstack/react-start";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

export type BurnoutLocale = "fr" | "ar" | "en";
export type BurnoutSeverity = "medium" | "high" | "critical";

export interface BurnoutDriver {
  label: string;
  weight: number;
}

export interface BurnoutResult {
  id: string;
  departmentId: string | null;
  department: string;
  title: string;
  summary: string;
  severity: BurnoutSeverity;
  score: number;
  confidence: number;
  populationSize: number;
  trend: number[];
  drivers: BurnoutDriver[];
  recommendations: string[];
  analyzedAt: string;
  source: "atomesus" | "statistical";
  status: "open" | "acknowledged" | "resolved";
}

interface AnalysisRequest {
  spaceId: string;
  locale: BurnoutLocale;
}

interface ResolveRequest extends AnalysisRequest {
  alertId: string;
}

interface StoredPayload {
  version: 1;
  summary: string;
  confidence: number;
  populationSize: number;
  trend: number[];
  drivers: BurnoutDriver[];
  recommendations: string[];
  source: "atomesus" | "statistical";
  locale: BurnoutLocale;
}

interface ResponseRow {
  department_id: string | null;
  factor: string | null;
  value_num: number | null;
  submission_batch: string;
  submitted_at_bucket: string;
}

interface KpiRow {
  department_id: string | null;
  month: string;
  satisfaction: number | null;
  stress: number | null;
  burnout_risk: number | null;
  response_count: number;
}

interface Candidate {
  key: string;
  departmentId: string | null;
  department: string;
  score: number;
  confidence: number;
  populationSize: number;
  trend: number[];
  drivers: BurnoutDriver[];
}

interface AiItem {
  key?: unknown;
  title?: unknown;
  summary?: unknown;
  recommendations?: unknown;
}

const MIN_GROUP_SIZE = 6;
const ALERT_THRESHOLD = 50;
const METRIC_NAME = "burnout_ai_v1";
const MAX_RESPONSE_ROWS = 10_000;

function validateRequest(value: unknown): AnalysisRequest {
  if (!value || typeof value !== "object") throw new Error("Invalid analysis request.");
  const candidate = value as Partial<AnalysisRequest>;
  if (typeof candidate.spaceId !== "string" || !candidate.spaceId.trim()) {
    throw new Error("A company space is required.");
  }
  if (candidate.locale !== "fr" && candidate.locale !== "ar" && candidate.locale !== "en") {
    throw new Error("Invalid language.");
  }
  return { spaceId: candidate.spaceId, locale: candidate.locale };
}

function validateResolveRequest(value: unknown): ResolveRequest {
  const base = validateRequest(value);
  const candidate = value as { alertId?: unknown };
  if (typeof candidate.alertId !== "string" || !candidate.alertId) {
    throw new Error("Invalid alert.");
  }
  return { ...base, alertId: candidate.alertId };
}

function clamp(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

function average(values: number[]) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
}

function percent(value: number | null) {
  if (value === null || !Number.isFinite(value)) return null;
  if (value >= 0 && value <= 1) return value * 100;
  if (value > 1 && value <= 5) return ((value - 1) / 4) * 100;
  return clamp(value);
}

function isAdverseFactor(factor: string) {
  if (/(manageable|reasonable|recovery|positive)/i.test(factor)) return false;
  return /(stress|charge|workload|demand|exhaust|burnout|fatigue|pressure|harass|conflict|ins[eé]cur|anxi|sleep)/i.test(
    factor,
  );
}

function riskFromAnswer(value: number, factor: string) {
  const normalized = percent(value) ?? 50;
  return isAdverseFactor(factor) ? normalized : 100 - normalized;
}

function labelFactor(factor: string, locale: BurnoutLocale) {
  const key = factor.trim().toLowerCase();
  const known: Record<string, Record<BurnoutLocale, string>> = {
    energy: { fr: "Energie", ar: "الطاقة", en: "Energy" },
    mood: { fr: "Humeur", ar: "المزاج", en: "Mood" },
    workload: { fr: "Charge de travail", ar: "عبء العمل", en: "Workload" },
    manageable_workload: {
      fr: "Charge soutenable",
      ar: "عبء عمل قابل للإدارة",
      en: "Manageable workload",
    },
    autonomy: { fr: "Autonomie", ar: "الاستقلالية", en: "Autonomy" },
    support: { fr: "Soutien managerial", ar: "دعم الإدارة", en: "Manager support" },
    recognition: { fr: "Reconnaissance", ar: "التقدير", en: "Recognition" },
    communication: { fr: "Communication", ar: "التواصل", en: "Communication" },
    environment: { fr: "Environnement de travail", ar: "بيئة العمل", en: "Work environment" },
    balance: {
      fr: "Equilibre travail-vie",
      ar: "التوازن بين العمل والحياة",
      en: "Work-life balance",
    },
    stress: { fr: "Stress percu", ar: "الضغط المدرك", en: "Perceived stress" },
    satisfaction: { fr: "Satisfaction", ar: "الرضا", en: "Satisfaction" },
    "overall wellbeing": { fr: "Bien-etre global", ar: "الرفاه العام", en: "Overall wellbeing" },
  };
  return known[key]?.[locale] || factor.replace(/[_-]+/g, " ");
}

function severityFor(score: number): BurnoutSeverity {
  if (score >= 75) return "critical";
  if (score >= 62) return "high";
  return "medium";
}

function localCopy(locale: BurnoutLocale, department: string, score: number) {
  if (locale === "ar") {
    return {
      title: `إشارة وقائية في ${department}`,
      summary: `تُظهر المؤشرات المجمعة مستوى خطر قدره ${score}/100. هذه إشارة وقائية على مستوى الفريق وليست تشخيصاً طبياً أو تقييماً فردياً.`,
      recommendations: [
        "مناقشة عبء العمل والأولويات مع الفريق دون البحث عن أفراد.",
        "توفير نقطة تواصل سرية ودعم مهني مستقل.",
        "إعادة قياس المؤشرات بعد أسبوعين إلى أربعة أسابيع.",
      ],
    };
  }
  if (locale === "en") {
    return {
      title: `Preventive signal in ${department}`,
      summary: `Aggregated indicators show a ${score}/100 risk level. This is a team-level prevention signal, not a medical diagnosis or an individual assessment.`,
      recommendations: [
        "Review workload and priorities with the team without identifying individuals.",
        "Offer a confidential contact point and independent professional support.",
        "Measure the same indicators again in two to four weeks.",
      ],
    };
  }
  return {
    title: `Signal preventif - ${department}`,
    summary: `Les indicateurs agreges montrent un niveau de risque de ${score}/100. Il s'agit d'un signal de prevention collectif, pas d'un diagnostic medical ni d'une evaluation individuelle.`,
    recommendations: [
      "Revoir la charge et les priorites avec l'equipe sans rechercher d'individus.",
      "Proposer un point de contact confidentiel et un soutien professionnel independant.",
      "Mesurer de nouveau les memes indicateurs dans deux a quatre semaines.",
    ],
  };
}

function parseStoredPayload(description: string | null): StoredPayload | null {
  if (!description) return null;
  try {
    const value = JSON.parse(description) as Partial<StoredPayload>;
    if (value.version !== 1 || typeof value.summary !== "string") return null;
    return {
      version: 1,
      summary: value.summary,
      confidence: clamp(Number(value.confidence) || 0),
      populationSize: Math.max(0, Number(value.populationSize) || 0),
      trend: Array.isArray(value.trend)
        ? value.trend
            .map(Number)
            .filter(Number.isFinite)
            .slice(-12)
            .map((item) => Math.round(clamp(item)))
        : [],
      drivers: Array.isArray(value.drivers)
        ? value.drivers
            .filter((item): item is BurnoutDriver => !!item && typeof item.label === "string")
            .slice(0, 5)
            .map((item) => ({
              label: item.label,
              weight: Math.round(clamp(Number(item.weight) || 0)),
            }))
        : [],
      recommendations: Array.isArray(value.recommendations)
        ? value.recommendations
            .filter((item): item is string => typeof item === "string")
            .slice(0, 5)
        : [],
      source: value.source === "atomesus" ? "atomesus" : "statistical",
      locale: value.locale === "ar" || value.locale === "en" ? value.locale : "fr",
    };
  } catch {
    return null;
  }
}

async function assertCanAnalyze(
  supabase: SupabaseClient<Database>,
  userId: string,
  spaceId: string,
) {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role, space_id")
    .eq("user_id", userId)
    .in("role", ["hr_admin", "super_admin"]);
  if (error) throw error;
  const allowed = (data || []).some(
    (row) => row.role === "super_admin" || (row.role === "hr_admin" && row.space_id === spaceId),
  );
  if (!allowed) throw new Error("Only the company administrator can run this analysis.");
}

function buildCandidates(
  responses: ResponseRow[],
  kpis: KpiRow[],
  departments: Map<string, string>,
  locale: BurnoutLocale,
) {
  const departmentIds = new Set<string | null>();
  responses.forEach((row) => departmentIds.add(row.department_id));
  kpis.forEach((row) => departmentIds.add(row.department_id));

  return [...departmentIds].flatMap((departmentId): Candidate[] => {
    const responseRows = responses.filter((row) => row.department_id === departmentId);
    const kpiRows = kpis
      .filter((row) => row.department_id === departmentId)
      .sort((a, b) => a.month.localeCompare(b.month));
    const batches = new Set(responseRows.map((row) => row.submission_batch));
    const latestKpiCount = kpiRows.at(-1)?.response_count || 0;
    const populationSize = Math.max(batches.size, latestKpiCount);
    if (populationSize < MIN_GROUP_SIZE) return [];

    const factorScores = new Map<string, number[]>();
    for (const row of responseRows) {
      if (row.value_num === null) continue;
      const factor = row.factor?.trim() || "overall wellbeing";
      const values = factorScores.get(factor) || [];
      values.push(riskFromAnswer(Number(row.value_num), factor));
      factorScores.set(factor, values);
    }

    const factorRisks = [...factorScores].map(([factor, values]) => ({
      factor,
      risk: average(values) ?? 0,
    }));
    const surveyRisk = average(factorRisks.map((item) => item.risk));
    const latestKpi = kpiRows.at(-1);
    const kpiRisk = average(
      [
        percent(latestKpi?.burnout_risk ?? null),
        percent(latestKpi?.stress ?? null),
        latestKpi?.satisfaction === null || latestKpi?.satisfaction === undefined
          ? null
          : 100 - (percent(latestKpi.satisfaction) ?? 50),
      ].filter((item): item is number => item !== null),
    );
    const availableScores = [surveyRisk, kpiRisk].filter((item): item is number => item !== null);
    if (!availableScores.length) return [];

    const score = Math.round(clamp(average(availableScores) ?? 0));
    const totalRisk = factorRisks.reduce((sum, item) => sum + Math.max(item.risk, 1), 0);
    const drivers = factorRisks
      .sort((a, b) => b.risk - a.risk)
      .slice(0, 5)
      .map((item) => ({
        label: labelFactor(item.factor, locale),
        weight: Math.round((Math.max(item.risk, 1) / Math.max(totalRisk, 1)) * 100),
      }));

    if (!drivers.length && latestKpi) {
      const rawDrivers = [
        { factor: "stress", risk: percent(latestKpi.stress) ?? 0 },
        {
          factor: "satisfaction",
          risk: latestKpi.satisfaction === null ? 0 : 100 - (percent(latestKpi.satisfaction) ?? 50),
        },
      ];
      const total = rawDrivers.reduce((sum, item) => sum + Math.max(item.risk, 1), 0);
      drivers.push(
        ...rawDrivers.map((item) => ({
          label: labelFactor(item.factor, locale),
          weight: Math.round((Math.max(item.risk, 1) / total) * 100),
        })),
      );
    }

    const trend = kpiRows
      .map((row) => percent(row.burnout_risk))
      .filter((item): item is number => item !== null)
      .slice(-12)
      .map((item) => Math.round(item));
    if (!trend.length) trend.push(score);

    const confidence = Math.round(
      clamp(45 + Math.min(populationSize, 40) * 1.25 + Math.min(availableScores.length, 2) * 5),
    );
    return [
      {
        key: departmentId || "company",
        departmentId,
        department: departmentId ? departments.get(departmentId) || "Department" : "Company",
        score,
        confidence,
        populationSize,
        trend,
        drivers,
      },
    ];
  });
}

function extractJson(text: string) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1];
  const source = fenced || text;
  const start = source.indexOf("{");
  const end = source.lastIndexOf("}");
  if (start === -1 || end <= start) return null;
  try {
    return JSON.parse(source.slice(start, end + 1)) as { items?: AiItem[] };
  } catch {
    return null;
  }
}

async function enrichWithAtomesus(candidates: Candidate[], locale: BurnoutLocale) {
  const apiKey = process.env.ATOMESUS_API_KEY;
  if (!apiKey || !candidates.length) return new Map<string, ReturnType<typeof localCopy>>();

  const language = locale === "ar" ? "Arabic" : locale === "en" ? "English" : "French";
  const safeInput = candidates.map((candidate) => ({
    key: candidate.key,
    department: candidate.department,
    score: candidate.score,
    confidence: candidate.confidence,
    populationSize: candidate.populationSize,
    trend: candidate.trend,
    drivers: candidate.drivers,
  }));
  const prompt = `
You are a workplace psychosocial-risk prevention assistant.
Interpret only the anonymous, aggregated team metrics below. No identities, emails, free text, or individual records are included.
This is not a medical diagnosis and must never identify or infer an individual.
Write concise, practical prevention guidance in ${language}.

Return strict JSON only:
{"items":[{"key":"same key","title":"short preventive title","summary":"2 sentences including that this is a collective prevention signal, not a diagnosis","recommendations":["action 1","action 2","action 3"]}]}

Rules:
- Do not alter, estimate, or restate a different risk score.
- Do not claim causation.
- Recommend organizational actions before individual wellbeing advice.
- Never recommend monitoring individual employees.
- Keep each recommendation under 140 characters.

AGGREGATED METRICS
${JSON.stringify(safeInput)}
`.trim();

  try {
    const response = await fetch("https://api.atomesus.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "cipher",
        messages: [{ role: "user", content: prompt }],
      }),
      signal: AbortSignal.timeout(18_000),
    });
    if (!response.ok) return new Map();
    const payload = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const parsed = extractJson(payload.choices?.[0]?.message?.content || "");
    const map = new Map<string, ReturnType<typeof localCopy>>();
    for (const item of parsed?.items || []) {
      if (
        typeof item.key !== "string" ||
        typeof item.title !== "string" ||
        typeof item.summary !== "string" ||
        !Array.isArray(item.recommendations)
      )
        continue;
      const recommendations = item.recommendations
        .filter((value): value is string => typeof value === "string")
        .map((value) => value.trim().slice(0, 180))
        .filter(Boolean)
        .slice(0, 5);
      if (recommendations.length < 2) continue;
      map.set(item.key, {
        title: item.title.trim().slice(0, 160),
        summary: item.summary.trim().slice(0, 1_000),
        recommendations,
      });
    }
    return map;
  } catch (error) {
    console.warn("[Burnout analysis] Atomesus unavailable; using statistical guidance.", error);
    return new Map();
  }
}

async function loadStoredResults(
  supabase: SupabaseClient<Database>,
  spaceId: string,
): Promise<BurnoutResult[]> {
  const { data, error } = await supabase
    .from("alerts")
    .select(
      "id, department_id, title, description, severity, status, observed, created_at, departments(name)",
    )
    .eq("space_id", spaceId)
    .eq("metric", METRIC_NAME)
    .order("created_at", { ascending: false });
  if (error) throw error;

  return (data || []).flatMap((row): BurnoutResult[] => {
    const details = parseStoredPayload(row.description);
    if (!details || row.severity === "low") return [];
    const relation = row.departments as unknown as { name?: string } | null;
    return [
      {
        id: row.id,
        departmentId: row.department_id,
        department: relation?.name || "Company",
        title: row.title,
        summary: details.summary,
        severity: row.severity,
        score: Math.round(clamp(Number(row.observed) || 0)),
        confidence: details.confidence,
        populationSize: details.populationSize,
        trend: details.trend,
        drivers: details.drivers,
        recommendations: details.recommendations,
        analyzedAt: row.created_at,
        source: details.source,
        status: row.status,
      },
    ];
  });
}

export const getBurnoutResults = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(validateRequest)
  .handler(async ({ data, context }) => {
    await assertCanAnalyze(context.supabase, context.userId, data.spaceId);
    const alerts = await loadStoredResults(context.supabase, data.spaceId);
    return { alerts, minimumGroupSize: MIN_GROUP_SIZE };
  });

export const runBurnoutAnalysis = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(validateRequest)
  .handler(async ({ data, context }) => {
    await assertCanAnalyze(context.supabase, context.userId, data.spaceId);
    const since = new Date();
    since.setUTCMonth(since.getUTCMonth() - 12);
    const sinceDate = since.toISOString().slice(0, 10);

    const [responseResult, kpiResult, departmentResult] = await Promise.all([
      context.supabase
        .from("survey_responses")
        .select("department_id, factor, value_num, submission_batch, submitted_at_bucket")
        .eq("space_id", data.spaceId)
        .not("value_num", "is", null)
        .gte("submitted_at_bucket", sinceDate)
        .limit(MAX_RESPONSE_ROWS),
      context.supabase
        .from("space_kpi_snapshots")
        .select("department_id, month, satisfaction, stress, burnout_risk, response_count")
        .eq("space_id", data.spaceId)
        .gte("month", sinceDate)
        .order("month", { ascending: true }),
      context.supabase.from("departments").select("id, name").eq("space_id", data.spaceId),
    ]);

    if (responseResult.error) throw responseResult.error;
    if (kpiResult.error) throw kpiResult.error;
    if (departmentResult.error) throw departmentResult.error;

    const departments = new Map((departmentResult.data || []).map((row) => [row.id, row.name]));
    const candidates = buildCandidates(
      (responseResult.data || []) as ResponseRow[],
      (kpiResult.data || []) as KpiRow[],
      departments,
      data.locale,
    );
    const alertCandidates = candidates.filter((candidate) => candidate.score >= ALERT_THRESHOLD);
    const aiCopy = await enrichWithAtomesus(alertCandidates, data.locale);
    const analyzedAt = new Date().toISOString();

    const { error: resolveError } = await context.supabase
      .from("alerts")
      .update({ status: "resolved" })
      .eq("space_id", data.spaceId)
      .eq("metric", METRIC_NAME)
      .in("status", ["open", "acknowledged"]);
    if (resolveError) throw resolveError;

    if (alertCandidates.length) {
      const rows = alertCandidates.map((candidate) => {
        const fallback = localCopy(data.locale, candidate.department, candidate.score);
        const copy = aiCopy.get(candidate.key) || fallback;
        const payload: StoredPayload = {
          version: 1,
          summary: copy.summary,
          confidence: candidate.confidence,
          populationSize: candidate.populationSize,
          trend: candidate.trend,
          drivers: candidate.drivers,
          recommendations: copy.recommendations,
          source: aiCopy.has(candidate.key) ? "atomesus" : "statistical",
          locale: data.locale,
        };
        return {
          space_id: data.spaceId,
          department_id: candidate.departmentId,
          title: copy.title,
          description: JSON.stringify(payload),
          severity: severityFor(candidate.score),
          status: "open" as const,
          metric: METRIC_NAME,
          threshold: ALERT_THRESHOLD,
          observed: candidate.score,
          created_at: analyzedAt,
          updated_at: analyzedAt,
        };
      });
      const { error: insertError } = await context.supabase.from("alerts").insert(rows);
      if (insertError) throw insertError;
    }

    const alerts = await loadStoredResults(context.supabase, data.spaceId);
    return {
      alerts: alerts.filter((alert) => alert.status !== "resolved"),
      groupsAnalyzed: candidates.length,
      groupsBelowMinimum:
        new Set([
          ...(responseResult.data || []).map((row) => row.department_id || "company"),
          ...(kpiResult.data || []).map((row) => row.department_id || "company"),
        ]).size - candidates.length,
      minimumGroupSize: MIN_GROUP_SIZE,
      source: aiCopy.size > 0 ? ("atomesus" as const) : ("statistical" as const),
    };
  });

export const resolveBurnoutAlert = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(validateResolveRequest)
  .handler(async ({ data, context }) => {
    await assertCanAnalyze(context.supabase, context.userId, data.spaceId);
    const { error } = await context.supabase
      .from("alerts")
      .update({ status: "resolved" })
      .eq("id", data.alertId)
      .eq("space_id", data.spaceId)
      .eq("metric", METRIC_NAME);
    if (error) throw error;
    return { success: true };
  });
