import type { Lang } from "@/types";

export const LANGS: { code: Lang; label: string; flag: string; dir: "rtl" | "ltr" }[] = [
  { code: "fr", label: "Français", flag: "https://flagcdn.com/w20/fr.png", dir: "ltr" },
  { code: "ar", label: "العربية", flag: "https://flagcdn.com/w20/dz.png", dir: "rtl" },
  { code: "en", label: "English", flag: "https://flagcdn.com/w20/gb.png", dir: "ltr" },
];

export const dict = {
  brand: { fr: "QVT-Care", ar: "QVT-Care", en: "QVT-Care" },
  tagline: {
    fr: "Qualité de Vie au Travail & Prévention RPS",
    ar: "جودة الحياة في العمل والوقاية من المخاطر النفسية",
    en: "Quality of Work Life & Psychosocial Risk Prevention",
  },
  // Landing Page translations
  landingNavPlatform: { fr: "Plateforme", ar: "المنصة", en: "Platform" },
  landingNavApproach: { fr: "Approche", ar: "النهج", en: "Approach" },
  landingNavInsights: { fr: "Insights", ar: "رؤى", en: "Insights" },
  landingNavPricing: { fr: "Tarifs", ar: "الأسعار", en: "Pricing" },
  landingLogin: { fr: "Connexion", ar: "تسجيل الدخول", en: "Login" },
  landingDemoBtn: { fr: "Demander une démo", ar: "طلب عرض تجريبي", en: "Request Demo" },
  landingHeroBadge: { fr: "Prévention QVT · Conformité Loi 18-07", ar: "الوقاية · مطابقة القانون 18-07", en: "QWL Prevention · Law 18-07 Compliant" },
  landingHeroTitle1: { fr: "Prévenez les risques ", ar: "امنع المخاطر ", en: "Prevent risks " },
  landingHeroTitle2: { fr: "avant", ar: "قبل", en: "before" },
  landingHeroTitle3: { fr: " qu'ils ne touchent votre entreprise.", ar: " أن تصل إلى شركتك.", en: " they impact your company." },
  landingHeroDesc: { fr: "WellWork réunit RH, managers et salariés autour d'une même plateforme : mesurer le bien-être en continu, agir sur les signaux faibles, et faire du bien-être un levier de performance durable.", ar: "تجمع منصة WellWork بين الموارد البشرية والمديرين والموظفين: قياس مستمر لجودة الحياة، والتصرف حيال الإشارات الضعيفة، وجعل الرفاهية محركًا للأداء المستدام.", en: "WellWork brings HR, managers, and employees together: continuous measurement, acting on weak signals, and making well-being a driver of sustainable performance." },
  landingHeroStartBtn: { fr: "Démarrer gratuitement", ar: "ابدأ مجاناً", en: "Start for free" },
  landingHeroDiscoverBtn: { fr: "Découvrir la plateforme", ar: "اكتشف المنصة", en: "Discover the platform" },
  hrPortal: { fr: "Espace RH", ar: "إدارة الموارد البشرية", en: "HR Portal" },
  employeePortal: { fr: "Espace Employé", ar: "فضاء الموظف", en: "Employee Space" },
  complianceBadge: { fr: "Conforme Loi 18-07", ar: "متوافق مع القانون 18-07", en: "Law 18-07 Compliant" },
  tenant: { fr: "Tenant", ar: "المستأجر", en: "Tenant" },
  notifications: { fr: "Notifications", ar: "الإشعارات", en: "Notifications" },
  darkMode: { fr: "Mode sombre", ar: "الوضع الداكن", en: "Dark mode" },
  profile: { fr: "Profil", ar: "الملف الشخصي", en: "Profile" },
  logout: { fr: "Déconnexion", ar: "تسجيل الخروج", en: "Logout" },

  // Nav — admin
  dashboard: { fr: "Tableau de bord", ar: "لوحة التحكم", en: "Dashboard" },
  employees: { fr: "Employés", ar: "الموظفون", en: "Employees" },
  surveys: { fr: "Questionnaires", ar: "الاستبيانات", en: "Surveys" },
  anonymousSpace: { fr: "Espace Anonyme", ar: "الفضاء المجهول", en: "Anonymous Space" },
  burnoutEngine: { fr: "IA Burn-out", ar: "الذكاء الاصطناعي", en: "AI Burnout" },
  alerts: { fr: "Alertes & Seuils", ar: "التنبيهات", en: "Alerts" },
  actionPlans: { fr: "Plans d'action", ar: "خطط العمل", en: "Action Plans" },
  events: { fr: "Événements", ar: "الفعاليات", en: "Events" },
  library: { fr: "Bibliothèque", ar: "المكتبة", en: "Library" },
  messages: { fr: "Messagerie", ar: "المراسلة", en: "Messaging" },
  erp: { fr: "Intégration ERP", ar: "ربط ERP", en: "ERP Integration" },
  reports: { fr: "Rapports", ar: "التقارير", en: "Reports" },
  settings: { fr: "Paramètres", ar: "الإعدادات", en: "Settings" },

  // Nav — employee
  home: { fr: "Accueil", ar: "الرئيسية", en: "Home" },
  mySurveys: { fr: "Mes questionnaires", ar: "استبياناتي", en: "My Surveys" },
  anonymousFeedback: { fr: "Feedback anonyme", ar: "رأي مجهول", en: "Anonymous Feedback" },
  myMessages: { fr: "Mes messages", ar: "رسائلي", en: "My Messages" },
  help: { fr: "Aide & Anonymat", ar: "المساعدة", en: "Help & Privacy" },

  // KPIs
  kpiSatisfaction: { fr: "Satisfaction générale", ar: "الرضا الوظيفي", en: "Overall Satisfaction" },
  kpiStress: { fr: "Niveau de stress", ar: "مستوى الضغط", en: "Stress Level" },
  kpiParticipation: { fr: "Taux de participation", ar: "نسبة المشاركة", en: "Participation Rate" },
  kpiTurnover: { fr: "Turnover / Absentéisme", ar: "الدوران / الغياب", en: "Turnover / Absenteeism" },

  // Charts
  qvtEvolution: { fr: "Évolution QVT", ar: "تطور جودة الحياة في العمل", en: "QVT Evolution" },
  stressByDept: { fr: "Stress par département", ar: "الضغط حسب القسم", en: "Stress by Department" },
  psRisks: { fr: "Facteurs RPS", ar: "عوامل المخاطر النفسية", en: "Psychosocial Risk Factors" },
  burnoutTrend: { fr: "Tendance Burn-out", ar: "اتجاه الاحتراق الوظيفي", en: "Burnout Trend" },
  severityDist: { fr: "Répartition sévérité", ar: "توزيع الخطورة", en: "Severity Distribution" },

  // Common
  search: { fr: "Rechercher…", ar: "بحث…", en: "Search…" },
  filter: { fr: "Filtrer", ar: "تصفية", en: "Filter" },
  all: { fr: "Tous", ar: "الكل", en: "All" },
  actions: { fr: "Actions", ar: "الإجراءات", en: "Actions" },
  details: { fr: "Détails", ar: "تفاصيل", en: "Details" },
  submit: { fr: "Envoyer", ar: "إرسال", en: "Submit" },
  cancel: { fr: "Annuler", ar: "إلغاء", en: "Cancel" },
  save: { fr: "Enregistrer", ar: "حفظ", en: "Save" },
  next: { fr: "Suivant", ar: "التالي", en: "Next" },
  previous: { fr: "Précédent", ar: "السابق", en: "Previous" },
  finish: { fr: "Terminer", ar: "إنهاء", en: "Finish" },
  view: { fr: "Voir", ar: "عرض", en: "View" },
  export: { fr: "Exporter", ar: "تصدير", en: "Export" },
  print: { fr: "Imprimer", ar: "طباعة", en: "Print" },
  register: { fr: "S'inscrire", ar: "تسجيل", en: "Register" },
  registered: { fr: "Inscrit", ar: "مسجَّل", en: "Registered" },

  // Risk levels
  riskLow: { fr: "Faible", ar: "منخفض", en: "Low" },
  riskMedium: { fr: "Moyen", ar: "متوسط", en: "Medium" },
  riskHigh: { fr: "Élevé", ar: "مرتفع", en: "High" },
  riskCritical: { fr: "Critique", ar: "حرج", en: "Critical" },

  // Employee-specific
  anonymousBanner: {
    fr: "Votre identité est protégée à 100 %",
    ar: "هويتك محمية بنسبة 100%",
    en: "Your identity is 100% protected",
  },
  anonymousBannerSub: {
    fr: "Session basée sur un jeton · hachage cryptographique · aucune IP ni email stockés",
    ar: "جلسة قائمة على رمز مميز · تجزئة تشفيرية · لا يتم تخزين IP أو البريد",
    en: "Token-based session · cryptographic hashing · no IP or email stored",
  },
  howAnonymityWorks: {
    fr: "Comment fonctionne l'anonymat ?",
    ar: "كيف تعمل خاصية عدم الكشف عن الهوية؟",
    en: "How does anonymity work?",
  },
  yourTrackingCode: { fr: "Votre code de suivi", ar: "رمز التتبع الخاص بك", en: "Your tracking code" },
  copy: { fr: "Copier", ar: "نسخ", en: "Copy" },
  copied: { fr: "Copié !", ar: "تم النسخ!", en: "Copied!" },
} as const;

export type DictKey = keyof typeof dict;

export function t(key: DictKey, lang: Lang): string {
  const entry = dict[key];
  if (!entry) return key;
  return (entry as Record<Lang, string>)[lang] ?? entry.fr;
}

export const months = {
  fr: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
  ar: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
} as const;
