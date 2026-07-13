export type Lang = "fr" | "ar" | "en";
export type Role = "admin" | "employee";
export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface Employee {
  id: string;
  code: string;
  name: string;
  nameAr: string;
  email: string;
  department: string;
  departmentAr: string;
  role: string;
  roleAr: string;
  avatar: string;
  qvtScore: number;
  riskLevel: RiskLevel;
  lastSurveyDate: string;
  joinDate: string;
  status: "active" | "inactive" | "onLeave";
}

export interface Department {
  id: string;
  name: string;
  nameAr: string;
  headcount: number;
  avgQvtScore: number;
  stressLevel: number;
  riskLevel: RiskLevel;
  actionCount: number;
  manager: string;
}

export interface Survey {
  id: string;
  title: string;
  titleAr: string;
  titleEn: string;
  type: "karasek" | "siegrist" | "copsoq" | "mbi" | "who5" | "kessler" | "custom";
  status: "active" | "scheduled" | "closed";
  responseCount: number;
  targetCount: number;
  completionRate: number;
  createdAt: string;
  closesAt: string;
}

export interface AnonymousPost {
  id: string;
  token: string;
  category: "suggestion" | "conflict" | "harassment" | "grievance" | "idea" | "other";
  severity: "low" | "medium" | "high";
  content: string;
  upvotes: number;
  replies: Reply[];
  createdAt: string;
  sentiment: "positive" | "neutral" | "negative";
}

export interface Reply {
  id: string;
  from: "hr" | "anonymous";
  content: string;
  createdAt: string;
}

export interface BurnoutAlert {
  id: string;
  severity: "critical" | "high" | "medium";
  department: string;
  departmentAr: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  trend: number[];
  populationSize: number;
  detectedAt: string;
  drivers: { label: string; labelAr: string; weight: number }[];
  recommendations: string[];
  recommendationsAr: string[];
  status: "active" | "resolved";
}

export interface ActionPlan {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  category: string;
  assignee: string;
  assigneeAvatar: string;
  dueDate: string;
  status: "pending" | "in_progress" | "completed";
  progress: number;
}

export interface WellnessContent {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  category: "burnout" | "ergonomics" | "anxiety" | "mindfulness" | "nutrition" | "sleep" | "remote" | "leadership";
  type: "article" | "video";
  coverGradient: string;
  readTime: string;
  isBookmarked: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  date: string;
  time: string;
  location: string;
  locationAr: string;
  type: "training" | "workshop" | "wellness" | "awareness";
  capacity: number;
  registered: number;
}

export interface Message {
  id: string;
  from: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface MessageThread {
  id: string;
  title: string;
  participant: string;
  messages: Message[];
  lastMessageAt: string;
  unread: number;
}

export interface KPIData {
  satisfaction: number;
  satisfactionChange: number;
  stress: number;
  stressChange: number;
  participation: number;
  participationChange: number;
  turnover: number;
  absenteeism: number;
}

export interface ChartDataPoint {
  month: string;
  monthAr: string;
  satisfaction: number;
  stress: number;
  participation: number;
  burnoutRisk: number;
}
