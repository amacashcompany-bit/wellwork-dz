import type {
  Employee, Department, Survey, AnonymousPost, BurnoutAlert, ActionPlan,
  WellnessContent, CalendarEvent, MessageThread, KPIData, ChartDataPoint,
} from "@/types";

const avatar = (seed: string) =>
  `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;

export const employees: Employee[] = [
  { id: "e1", code: "EMP-0142", name: "Ahmed Benali", nameAr: "أحمد بن علي", email: "a.benali@techdz.dz", department: "IT", departmentAr: "المعلوماتية", role: "Développeur", roleAr: "مطوّر", avatar: avatar("Ahmed"), qvtScore: 72, riskLevel: "medium", lastSurveyDate: "2026-07-01", joinDate: "2022-03-15", status: "active" },
  { id: "e2", code: "EMP-0187", name: "Leila Merad", nameAr: "ليلى مراد", email: "l.merad@techdz.dz", department: "Marketing", departmentAr: "التسويق", role: "Designer", roleAr: "مصممة", avatar: avatar("Leila"), qvtScore: 85, riskLevel: "low", lastSurveyDate: "2026-06-28", joinDate: "2021-09-01", status: "active" },
  { id: "e3", code: "EMP-0203", name: "Karim Hadad", nameAr: "كريم حداد", email: "k.hadad@techdz.dz", department: "Finance", departmentAr: "المالية", role: "Comptable", roleAr: "محاسب", avatar: avatar("Karim"), qvtScore: 45, riskLevel: "critical", lastSurveyDate: "2026-07-05", joinDate: "2019-11-12", status: "active" },
  { id: "e4", code: "EMP-0055", name: "Sara Akacha", nameAr: "سارة عكاشة", email: "s.akacha@techdz.dz", department: "RH", departmentAr: "الموارد البشرية", role: "Responsable QVT", roleAr: "مسؤولة QVT", avatar: avatar("Sara"), qvtScore: 91, riskLevel: "low", lastSurveyDate: "2026-07-02", joinDate: "2020-01-20", status: "active" },
  { id: "e5", code: "EMP-0311", name: "Nourredine Bekkar", nameAr: "نور الدين بكار", email: "n.bekkar@techdz.dz", department: "Operations", departmentAr: "العمليات", role: "Superviseur", roleAr: "مشرف", avatar: avatar("Nour"), qvtScore: 58, riskLevel: "high", lastSurveyDate: "2026-06-30", joinDate: "2018-06-01", status: "active" },
  { id: "e6", code: "EMP-0289", name: "Fatima Zahra", nameAr: "فاطمة الزهراء", email: "f.zahra@techdz.dz", department: "IT", departmentAr: "المعلوماتية", role: "QA Engineer", roleAr: "مختبرة", avatar: avatar("Fatima"), qvtScore: 78, riskLevel: "low", lastSurveyDate: "2026-07-03", joinDate: "2023-02-14", status: "active" },
  { id: "e7", code: "EMP-0176", name: "Rachid Bouroubi", nameAr: "رشيد بوروبي", email: "r.bouroubi@techdz.dz", department: "Marketing", departmentAr: "التسويق", role: "Community Manager", roleAr: "مسؤول مجتمع", avatar: avatar("Rachid"), qvtScore: 68, riskLevel: "medium", lastSurveyDate: "2026-06-27", joinDate: "2022-08-10", status: "active" },
  { id: "e8", code: "EMP-0398", name: "Meriem Bouzid", nameAr: "مريم بوزيد", email: "m.bouzid@techdz.dz", department: "Finance", departmentAr: "المالية", role: "Analyste", roleAr: "محللة", avatar: avatar("Meriem"), qvtScore: 52, riskLevel: "high", lastSurveyDate: "2026-07-04", joinDate: "2020-05-18", status: "active" },
  { id: "e9", code: "EMP-0421", name: "Yacine Khelifi", nameAr: "ياسين خليفي", email: "y.khelifi@techdz.dz", department: "IT", departmentAr: "المعلوماتية", role: "DevOps", roleAr: "مهندس", avatar: avatar("Yacine"), qvtScore: 64, riskLevel: "medium", lastSurveyDate: "2026-07-01", joinDate: "2021-11-05", status: "active" },
  { id: "e10", code: "EMP-0512", name: "Amina Djelloul", nameAr: "أمينة جلول", email: "a.djelloul@techdz.dz", department: "RH", departmentAr: "الموارد البشرية", role: "Recruteuse", roleAr: "مسؤولة توظيف", avatar: avatar("Amina"), qvtScore: 82, riskLevel: "low", lastSurveyDate: "2026-06-29", joinDate: "2022-04-22", status: "active" },
];

export const departments: Department[] = [
  { id: "d1", name: "IT", nameAr: "المعلوماتية", headcount: 24, avgQvtScore: 71, stressLevel: 62, riskLevel: "high", actionCount: 3, manager: "Ahmed Benali" },
  { id: "d2", name: "Marketing", nameAr: "التسويق", headcount: 12, avgQvtScore: 79, stressLevel: 38, riskLevel: "low", actionCount: 1, manager: "Leila Merad" },
  { id: "d3", name: "Finance", nameAr: "المالية", headcount: 8, avgQvtScore: 49, stressLevel: 78, riskLevel: "critical", actionCount: 4, manager: "Karim Hadad" },
  { id: "d4", name: "RH", nameAr: "الموارد البشرية", headcount: 6, avgQvtScore: 88, stressLevel: 32, riskLevel: "low", actionCount: 0, manager: "Sara Akacha" },
  { id: "d5", name: "Operations", nameAr: "العمليات", headcount: 32, avgQvtScore: 63, stressLevel: 55, riskLevel: "medium", actionCount: 2, manager: "Nourredine Bekkar" },
];

export const surveys: Survey[] = [
  { id: "s1", title: "Pulse mensuel", titleAr: "استبيان النبض الشهري", titleEn: "Monthly Pulse", type: "custom", status: "active", responseCount: 68, targetCount: 82, completionRate: 83, createdAt: "2026-07-01", closesAt: "2026-07-20" },
  { id: "s2", title: "Karasek — Job Demand-Control", titleAr: "كاراسيك", titleEn: "Karasek — Job Demand-Control", type: "karasek", status: "active", responseCount: 45, targetCount: 82, completionRate: 55, createdAt: "2026-06-15", closesAt: "2026-07-15" },
  { id: "s3", title: "MBI — Burnout Inventory", titleAr: "MBI مقياس الاحتراق", titleEn: "MBI Burnout Inventory", type: "mbi", status: "closed", responseCount: 79, targetCount: 80, completionRate: 99, createdAt: "2026-05-01", closesAt: "2026-05-30" },
  { id: "s4", title: "WHO-5 Wellbeing", titleAr: "منظمة الصحة العالمية 5", titleEn: "WHO-5 Wellbeing", type: "who5", status: "scheduled", responseCount: 0, targetCount: 82, completionRate: 0, createdAt: "2026-07-10", closesAt: "2026-08-01" },
  { id: "s5", title: "Siegrist — Effort-Reward", titleAr: "زيغريست", titleEn: "Siegrist — Effort-Reward", type: "siegrist", status: "active", responseCount: 34, targetCount: 82, completionRate: 41, createdAt: "2026-06-20", closesAt: "2026-07-25" },
  { id: "s6", title: "COPSOQ-S3", titleAr: "كوبسوك", titleEn: "COPSOQ-S3", type: "copsoq", status: "closed", responseCount: 71, targetCount: 80, completionRate: 89, createdAt: "2026-04-01", closesAt: "2026-04-30" },
];

export const anonymousPosts: AnonymousPost[] = [
  { id: "p1", token: "REF-A7K92", category: "conflict", severity: "high", content: "Tensions récurrentes avec un manager sur la répartition des tâches. Réunions constamment reportées, feedback rare et souvent négatif en public.", upvotes: 12, sentiment: "negative", createdAt: "2026-07-08", replies: [{ id: "r1", from: "hr", content: "Merci pour ce signalement. Nous prenons cela très au sérieux et proposons un échange confidentiel cette semaine.", createdAt: "2026-07-09" }] },
  { id: "p2", token: "REF-B4X18", category: "suggestion", severity: "low", content: "Idée : instaurer un vendredi après-midi 'focus' sans réunions pour terminer sereinement la semaine.", upvotes: 34, sentiment: "positive", createdAt: "2026-07-06", replies: [] },
  { id: "p3", token: "REF-C9M04", category: "harassment", severity: "high", content: "Commentaires déplacés à répétition en salle de pause. Malaise partagé par plusieurs collègues.", upvotes: 8, sentiment: "negative", createdAt: "2026-07-05", replies: [{ id: "r2", from: "hr", content: "Un entretien confidentiel avec la cellule d'écoute est ouvert. Merci de votre courage.", createdAt: "2026-07-06" }] },
  { id: "p4", token: "REF-D2P73", category: "idea", severity: "low", content: "Une salle de sieste ou de décompression serait un vrai plus pour la charge cognitive.", upvotes: 27, sentiment: "positive", createdAt: "2026-07-04", replies: [] },
  { id: "p5", token: "REF-E5V61", category: "grievance", severity: "medium", content: "Les objectifs trimestriels arrivent trop tard, on découvre les priorités en retard.", upvotes: 15, sentiment: "neutral", createdAt: "2026-07-02", replies: [] },
];

export const burnoutAlerts: BurnoutAlert[] = [
  {
    id: "al1", severity: "critical", department: "Finance", departmentAr: "المالية",
    title: "Pic de charge de travail — Finance", titleAr: "ارتفاع حاد في عبء العمل — المالية",
    description: "Hausse de 42 % du stress signalé et baisse de 18 pts de satisfaction en 3 semaines.",
    descriptionAr: "ارتفاع 42% في الضغط وانخفاض 18 نقطة في الرضا خلال 3 أسابيع.",
    trend: [45, 48, 52, 58, 65, 71, 78], populationSize: 8, detectedAt: "2026-07-09",
    drivers: [
      { label: "Overtime hours", labelAr: "ساعات إضافية", weight: 45 },
      { label: "Negative reviews", labelAr: "تقييمات سلبية", weight: 30 },
      { label: "Absenteeism", labelAr: "الغياب", weight: 15 },
      { label: "Other", labelAr: "أخرى", weight: 10 },
    ],
    recommendations: ["Redistribuer la charge Q3", "Entretiens individuels avec le manager", "Journée de récupération collective"],
    recommendationsAr: ["إعادة توزيع عبء الربع الثالث", "مقابلات فردية مع المدير", "يوم استرداد جماعي"],
    status: "active",
  },
  {
    id: "al2", severity: "high", department: "IT", departmentAr: "المعلوماتية",
    title: "Fatigue cognitive — IT", titleAr: "إجهاد ذهني — المعلوماتية",
    description: "Sentiment de fatigue en hausse continue depuis 4 semaines, participation en baisse.",
    descriptionAr: "شعور بالتعب في ارتفاع مستمر منذ 4 أسابيع، مشاركة في تراجع.",
    trend: [30, 32, 38, 44, 49, 55, 58], populationSize: 12, detectedAt: "2026-07-07",
    drivers: [
      { label: "On-call rotations", labelAr: "المناوبات", weight: 40 },
      { label: "Meeting overload", labelAr: "كثرة الاجتماعات", weight: 35 },
      { label: "Unclear priorities", labelAr: "أولويات غامضة", weight: 25 },
    ],
    recommendations: ["Réduire les réunions récurrentes", "Bloquer 2h de focus/jour", "Rotation on-call revue"],
    recommendationsAr: ["تقليل الاجتماعات المتكررة", "حجز ساعتين تركيز يومياً", "مراجعة نظام المناوبة"],
    status: "active",
  },
  {
    id: "al3", severity: "medium", department: "Operations", departmentAr: "العمليات",
    title: "Baisse de reconnaissance — Operations", titleAr: "تراجع في التقدير — العمليات",
    description: "Perception de reconnaissance en baisse de 12 pts sur le dernier trimestre.",
    descriptionAr: "انخفاض 12 نقطة في الشعور بالتقدير خلال الربع الأخير.",
    trend: [62, 60, 58, 56, 54, 52, 50], populationSize: 18, detectedAt: "2026-07-04",
    drivers: [
      { label: "Feedback frequency", labelAr: "تكرار التغذية الراجعة", weight: 50 },
      { label: "Career visibility", labelAr: "المسار المهني", weight: 30 },
      { label: "Peer recognition", labelAr: "تقدير الزملاء", weight: 20 },
    ],
    recommendations: ["Rituel de reconnaissance hebdo", "Plan de carrière visible", "Formation manager feedback"],
    recommendationsAr: ["طقس أسبوعي للتقدير", "مسار مهني واضح", "تكوين المدراء على التغذية الراجعة"],
    status: "active",
  },
];

export const actionPlans: ActionPlan[] = [
  { id: "a1", title: "Bilan individuel IT", titleAr: "مقابلات فردية لفريق IT", description: "Entretiens 1-1 avec chaque membre de l'équipe IT.", descriptionAr: "مقابلات فردية مع كل عضو من فريق المعلوماتية.", category: "support", assignee: "Ahmed Benali", assigneeAvatar: avatar("Ahmed"), dueDate: "2026-06-01", status: "completed", progress: 100 },
  { id: "a2", title: "Atelier santé mentale", titleAr: "ورشة الصحة النفسية", description: "Atelier de 3h animé par une psychologue du travail.", descriptionAr: "ورشة عمل 3 ساعات مع أخصائي علم النفس المهني.", category: "training", assignee: "Leila Merad", assigneeAvatar: avatar("Leila"), dueDate: "2026-07-15", status: "in_progress", progress: 60 },
  { id: "a3", title: "Audit répartition charge Finance", titleAr: "مراجعة توزيع الأعباء", description: "Analyse détaillée de la charge de travail par personne.", descriptionAr: "تحليل مفصل لعبء العمل لكل شخص.", category: "process", assignee: "Karim Hadad", assigneeAvatar: avatar("Karim"), dueDate: "2026-07-20", status: "in_progress", progress: 45 },
  { id: "a4", title: "Formation managers RPS", titleAr: "تكوين المدراء في RPS", description: "Programme de 2 jours pour tous les managers.", descriptionAr: "برنامج يومين لجميع المدراء.", category: "training", assignee: "Sara Akacha", assigneeAvatar: avatar("Sara"), dueDate: "2026-08-01", status: "pending", progress: 0 },
  { id: "a5", title: "Évaluation ergonomique", titleAr: "تقييم المراقبة المهنية", description: "Audit ergonomique de tous les postes.", descriptionAr: "تدقيق مريح لجميع مواقع العمل.", category: "process", assignee: "Nourredine Bekkar", assigneeAvatar: avatar("Nour"), dueDate: "2026-08-10", status: "pending", progress: 0 },
  { id: "a6", title: "Horaires flexibles pilote", titleAr: "ساعات مرنة تجريبية", description: "Test de 3 mois sur l'équipe Marketing.", descriptionAr: "تجربة 3 أشهر على فريق التسويق.", category: "process", assignee: "Fatima Zahra", assigneeAvatar: avatar("Fatima"), dueDate: "2026-06-05", status: "completed", progress: 100 },
  { id: "a7", title: "Revue feedback anonyme", titleAr: "مراجعة الآراء المجهولة", description: "Revue mensuelle avec cellule d'écoute.", descriptionAr: "مراجعة شهرية مع خلية الاستماع.", category: "support", assignee: "Rachid Bouroubi", assigneeAvatar: avatar("Rachid"), dueDate: "2026-07-18", status: "in_progress", progress: 70 },
  { id: "a8", title: "Pulse survey trimestriel", titleAr: "استبيان نبض ربع سنوي", description: "Lancement du pulse Q3.", descriptionAr: "إطلاق النبض للربع الثالث.", category: "measurement", assignee: "Meriem Bouzid", assigneeAvatar: avatar("Meriem"), dueDate: "2026-08-15", status: "pending", progress: 0 },
];

const grads = [
  "linear-gradient(135deg,#0d9488,#14b8a6)",
  "linear-gradient(135deg,#6366f1,#8b5cf6)",
  "linear-gradient(135deg,#f59e0b,#f97316)",
  "linear-gradient(135deg,#10b981,#059669)",
  "linear-gradient(135deg,#ec4899,#f43f5e)",
  "linear-gradient(135deg,#0ea5e9,#6366f1)",
  "linear-gradient(135deg,#84cc16,#22c55e)",
  "linear-gradient(135deg,#a855f7,#6366f1)",
];

export const wellnessContent: WellnessContent[] = [
  { id: "w1", title: "Reconnaître les signes du burn-out", titleAr: "التعرف على علامات الاحتراق الوظيفي", description: "Les 6 signaux faibles à surveiller au quotidien.", descriptionAr: "6 علامات مبكرة يجب مراقبتها.", category: "burnout", type: "article", coverGradient: grads[0], readTime: "5 min", isBookmarked: false },
  { id: "w2", title: "Ergonomie du poste : les fondamentaux", titleAr: "أساسيات مريحية مكان العمل", description: "Réglages simples pour prévenir les TMS.", descriptionAr: "تعديلات بسيطة لتفادي الاضطرابات العضلية.", category: "ergonomics", type: "video", coverGradient: grads[1], readTime: "8 min", isBookmarked: true },
  { id: "w3", title: "Gérer l'anxiété au travail", titleAr: "إدارة القلق في العمل", description: "Techniques de respiration et de recentrage.", descriptionAr: "تقنيات التنفس والتركيز.", category: "anxiety", type: "article", coverGradient: grads[2], readTime: "6 min", isBookmarked: false },
  { id: "w4", title: "Méditation guidée 10 minutes", titleAr: "تأمل موجه 10 دقائق", description: "Session courte pour recharger l'attention.", descriptionAr: "جلسة قصيرة لإعادة الشحن.", category: "mindfulness", type: "video", coverGradient: grads[3], readTime: "10 min", isBookmarked: false },
  { id: "w5", title: "Nutrition et concentration", titleAr: "التغذية والتركيز", description: "Ce que vous mangez influence votre focus.", descriptionAr: "ما تأكله يؤثر على تركيزك.", category: "nutrition", type: "article", coverGradient: grads[4], readTime: "7 min", isBookmarked: false },
  { id: "w6", title: "Hygiène du sommeil", titleAr: "صحة النوم", description: "Bâtir une routine du soir apaisante.", descriptionAr: "بناء روتين مسائي مريح.", category: "sleep", type: "article", coverGradient: grads[5], readTime: "6 min", isBookmarked: true },
  { id: "w7", title: "Télétravail sain", titleAr: "العمل عن بعد الصحي", description: "Frontières, rituels, ergonomie.", descriptionAr: "حدود، طقوس، مريحية.", category: "remote", type: "video", coverGradient: grads[6], readTime: "9 min", isBookmarked: false },
  { id: "w8", title: "Manager avec bienveillance", titleAr: "الإدارة بلطف", description: "Feedback régulier et sécurité psychologique.", descriptionAr: "تغذية راجعة منتظمة وأمان نفسي.", category: "leadership", type: "article", coverGradient: grads[7], readTime: "8 min", isBookmarked: false },
];

export const events: CalendarEvent[] = [
  { id: "ev1", title: "Atelier gestion du stress", titleAr: "ورشة إدارة الضغط", description: "Animé par Dr. Amina Rahal, psychologue du travail.", date: "2026-07-18", time: "14:00", location: "Salle Alger 1", locationAr: "قاعة الجزائر 1", type: "workshop", capacity: 20, registered: 14 },
  { id: "ev2", title: "Formation managers RPS", titleAr: "تكوين المدراء على المخاطر", description: "Programme certifiant sur 2 jours.", date: "2026-07-25", time: "09:00", location: "Auditorium", locationAr: "المدرج", type: "training", capacity: 15, registered: 12 },
  { id: "ev3", title: "Séance yoga au bureau", titleAr: "جلسة يوغا في المكتب", description: "45 min de pratique douce, tout niveau.", date: "2026-07-16", time: "12:30", location: "Terrasse", locationAr: "التراس", type: "wellness", capacity: 25, registered: 18 },
  { id: "ev4", title: "Semaine QVT — Ouverture", titleAr: "أسبوع جودة الحياة — الافتتاح", description: "Conférence d'ouverture avec témoignages.", date: "2026-08-05", time: "10:00", location: "Grand Hall", locationAr: "الردهة الكبرى", type: "awareness", capacity: 100, registered: 62 },
  { id: "ev5", title: "Café d'écoute anonyme", titleAr: "مقهى الاستماع المجهول", description: "Échange informel, sans jugement.", date: "2026-07-22", time: "16:00", location: "Cafétéria", locationAr: "الكافتيريا", type: "wellness", capacity: 12, registered: 9 },
];

export const messageThreads: MessageThread[] = [
  {
    id: "m1", title: "Atelier santé mentale — inscription", participant: "RH — Sara Akacha",
    lastMessageAt: "2026-07-10T14:30:00", unread: 0,
    messages: [
      { id: "mm1", from: "hr", content: "Bonjour, votre inscription à l'atelier du 18/07 est confirmée. À très vite !", timestamp: "2026-07-10T14:30:00", isRead: true },
    ],
  },
  {
    id: "m2", title: "Suivi REF-A7K92", participant: "Anonyme · REF-A7K92",
    lastMessageAt: "2026-07-09T11:15:00", unread: 1,
    messages: [
      { id: "mm2", from: "hr", content: "Merci pour votre signalement. Un entretien confidentiel vous est proposé cette semaine.", timestamp: "2026-07-09T11:15:00", isRead: false },
    ],
  },
  {
    id: "m3", title: "Rappel — Pulse mensuel", participant: "RH — Automatique",
    lastMessageAt: "2026-07-08T09:00:00", unread: 0,
    messages: [
      { id: "mm3", from: "hr", content: "Il vous reste 5 jours pour compléter le pulse. Cela prend 3 minutes.", timestamp: "2026-07-08T09:00:00", isRead: true },
    ],
  },
];

export const kpiData: KPIData = {
  satisfaction: 78, satisfactionChange: 4.2,
  stress: 42, stressChange: -1.8,
  participation: 85, participationChange: 12,
  turnover: 6.3, absenteeism: 3.1,
};

export const chartData: ChartDataPoint[] = [
  { month: "Jan", monthAr: "يناير", satisfaction: 68, stress: 55, participation: 62, burnoutRisk: 40 },
  { month: "Fév", monthAr: "فبراير", satisfaction: 70, stress: 52, participation: 68, burnoutRisk: 38 },
  { month: "Mar", monthAr: "مارس", satisfaction: 72, stress: 48, participation: 74, burnoutRisk: 36 },
  { month: "Avr", monthAr: "أبريل", satisfaction: 74, stress: 46, participation: 79, burnoutRisk: 34 },
  { month: "Mai", monthAr: "مايو", satisfaction: 76, stress: 44, participation: 82, burnoutRisk: 33 },
  { month: "Juin", monthAr: "يونيو", satisfaction: 78, stress: 42, participation: 85, burnoutRisk: 35 },
];

export const rpsFactors = [
  { factor: "Workload", factorAr: "عبء العمل", current: 62, benchmark: 55 },
  { factor: "Autonomy", factorAr: "الاستقلالية", current: 78, benchmark: 70 },
  { factor: "Social", factorAr: "العلاقات", current: 74, benchmark: 72 },
  { factor: "Recognition", factorAr: "التقدير", current: 58, benchmark: 65 },
  { factor: "Work-Life", factorAr: "التوازن", current: 66, benchmark: 68 },
  { factor: "Support", factorAr: "الدعم", current: 71, benchmark: 70 },
];
