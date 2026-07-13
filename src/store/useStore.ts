import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Lang, Role, ActionPlan, AnonymousPost, BurnoutAlert, Reply, Message,
} from "@/types";
import {
  employees, departments, surveys, anonymousPosts, burnoutAlerts,
  actionPlans, wellnessContent, events, messageThreads, kpiData, chartData,
} from "@/data/mockData";

interface AppState {
  language: Lang;
  direction: "ltr" | "rtl";
  role: Role;
  tenant: string;
  isDarkMode: boolean;

  employees: typeof employees;
  departments: typeof departments;
  surveys: typeof surveys;
  anonymousPosts: AnonymousPost[];
  burnoutAlerts: BurnoutAlert[];
  actionPlans: ActionPlan[];
  wellnessContent: typeof wellnessContent;
  events: typeof events;
  messageThreads: typeof messageThreads;
  kpiData: typeof kpiData;
  chartData: typeof chartData;

  setLanguage: (lang: Lang) => void;
  setRole: (role: Role) => void;
  toggleDarkMode: () => void;
  addAnonymousPost: (post: AnonymousPost) => void;
  addReply: (postId: string, reply: Reply) => void;
  updateActionPlan: (id: string, updates: Partial<ActionPlan>) => void;
  resolveAlert: (id: string) => void;
  toggleBookmark: (contentId: string) => void;
  registerForEvent: (eventId: string) => void;
  sendMessage: (threadId: string, message: Message) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      language: "fr",
      direction: "ltr",
      role: "admin",
      tenant: "TechDZ",
      isDarkMode: false,

      employees, departments, surveys, anonymousPosts, burnoutAlerts,
      actionPlans, wellnessContent, events, messageThreads, kpiData, chartData,

      setLanguage: (lang) => set({ language: lang, direction: lang === "ar" ? "rtl" : "ltr" }),
      setRole: (role) => set({ role }),
      toggleDarkMode: () => set((s) => ({ isDarkMode: !s.isDarkMode })),
      addAnonymousPost: (post) => set((s) => ({ anonymousPosts: [post, ...s.anonymousPosts] })),
      addReply: (postId, reply) => set((s) => ({
        anonymousPosts: s.anonymousPosts.map((p) => p.id === postId ? { ...p, replies: [...p.replies, reply] } : p),
      })),
      updateActionPlan: (id, updates) => set((s) => ({
        actionPlans: s.actionPlans.map((p) => p.id === id ? { ...p, ...updates } : p),
      })),
      resolveAlert: (id) => set((s) => ({
        burnoutAlerts: s.burnoutAlerts.map((a) => a.id === id ? { ...a, status: "resolved" as const } : a),
      })),
      toggleBookmark: (contentId) => set((s) => ({
        wellnessContent: s.wellnessContent.map((c) => c.id === contentId ? { ...c, isBookmarked: !c.isBookmarked } : c),
      })),
      registerForEvent: (eventId) => set((s) => ({
        events: s.events.map((e) => e.id === eventId && e.registered < e.capacity ? { ...e, registered: e.registered + 1 } : e),
      })),
      sendMessage: (threadId, message) => set((s) => ({
        messageThreads: s.messageThreads.map((t) => t.id === threadId
          ? { ...t, messages: [...t.messages, message], lastMessageAt: message.timestamp }
          : t),
      })),
    }),
    {
      name: "qvt-care-storage",
      partialize: (s) => ({ language: s.language, direction: s.direction, isDarkMode: s.isDarkMode, role: s.role }),
    }
  )
);

export function useT() {
  const language = useStore((s) => s.language);
  return language;
}
