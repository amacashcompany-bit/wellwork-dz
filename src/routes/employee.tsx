import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { useAuth, useMySpace } from "@/hooks/useAuth";

export const Route = createFileRoute("/employee")({
  ssr: false,
  component: EmployeeLayout,
});

function EmployeeLayout() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { info, loading: spaceLoading } = useMySpace();

  useEffect(() => {
    if (loading) return;
    if (!user) { navigate({ to: "/auth", replace: true }); return; }
    if (spaceLoading) return;
    if (!info?.spaceId) { navigate({ to: "/onboarding", replace: true }); return; }
  }, [user, loading, info, spaceLoading, navigate]);

  if (loading || spaceLoading || !user || !info?.spaceId) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="w-6 h-6 animate-spin text-brand" /></div>;
  }

  return <AppShell><Outlet /></AppShell>;
}
