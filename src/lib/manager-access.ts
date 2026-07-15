export type ManagerModule =
  | "employees"
  | "surveys"
  | "alerts"
  | "actions"
  | "library"
  | "events"
  | "messages"
  | "reports"
  | "erp";

export type ManagerRouteAccess = ManagerModule | "admin_only" | null;

export function managerAccessForPath(pathname: string): ManagerRouteAccess {
  if (pathname === "/admin" || pathname.startsWith("/admin/dashboard")) return null;
  if (pathname.startsWith("/admin/employees")) return "employees";
  if (pathname.startsWith("/admin/surveys")) return "surveys";
  if (pathname.startsWith("/admin/anonymous") || pathname.startsWith("/admin/burnout") || pathname.startsWith("/admin/alerts")) return "alerts";
  if (pathname.startsWith("/admin/actions")) return "actions";
  if (pathname.startsWith("/admin/library")) return "library";
  if (pathname.startsWith("/admin/events")) return "events";
  if (pathname.startsWith("/admin/messages")) return "messages";
  if (pathname.startsWith("/admin/reports")) return "reports";
  if (pathname.startsWith("/admin/erp")) return "erp";
  return "admin_only";
}
