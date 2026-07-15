import { createFileRoute, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { useAuth, useMySpace, hasRole, useManagerPermissions } from "@/hooks/useAuth";
import { managerAccessForPath } from "@/lib/manager-access";

export const Route = createFileRoute("/admin")({
  ssr: false,
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();
  const { info, loading: spaceLoading } = useMySpace();
  const isManager = hasRole(info?.roles ?? [], "manager") && !hasRole(info?.roles ?? [], ["hr_admin", "super_admin"]);
  const { permissions, loading: permissionsLoading } = useManagerPermissions(info?.spaceId ?? null, isManager);

  useEffect(() => {
    if (loading) return;
    if (!user) { navigate({ to: "/auth", replace: true }); return; }
    if (spaceLoading) return;
    if (!info?.spaceId) { navigate({ to: "/onboarding", replace: true }); return; }
    if (!hasRole(info.roles, ["hr_admin", "super_admin", "manager"])) {
      navigate({ to: "/employee/home", replace: true });
      return;
    }
    if (isManager && !permissionsLoading) {
      const requiredAccess = managerAccessForPath(location.pathname);
      if (requiredAccess === "admin_only" || (requiredAccess && !permissions.has(requiredAccess))) {
        navigate({ to: "/admin/dashboard", replace: true });
      }
    }
  }, [user, loading, info, spaceLoading, navigate, isManager, permissionsLoading, permissions, location.pathname]);

  if (loading || spaceLoading || (isManager && permissionsLoading) || !user || !info?.spaceId) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="w-6 h-6 animate-spin text-brand" /></div>;
  }

  return <AppShell><Outlet /></AppShell>;
}
