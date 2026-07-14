import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useAuth, useMySpace, hasRole } from "@/hooks/useAuth";
import { Link } from "@tanstack/react-router";
import { Sparkles, LayoutDashboard, LogOut } from "lucide-react";

export const Route = createFileRoute("/superadmin")({
  ssr: false,
  component: SuperAdminLayout,
});

function SuperAdminLayout() {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const { info, loading: spaceLoading } = useMySpace();

  useEffect(() => {
    if (loading || spaceLoading) return;
    if (!user) {
      navigate({ to: "/auth", replace: true });
      return;
    }
    // Only allow super_admin role
    if (!hasRole(info?.roles ?? [], ["super_admin"])) {
      navigate({ to: "/", replace: true });
    }
  }, [user, loading, info, spaceLoading, navigate]);

  if (loading || spaceLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-6 h-6 animate-spin text-brand" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar for Super Admin */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border/40 bg-card flex flex-col">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center shadow-glow">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-display font-bold leading-tight">Wellwork</div>
              <div className="text-[9px] uppercase tracking-widest text-brand font-semibold">Master Admin</div>
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <Link
            to="/superadmin"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium bg-brand/10 text-brand"
          >
            <LayoutDashboard className="w-4 h-4" />
            Tableau de bord
          </Link>
        </nav>

        <div className="p-4 border-t border-border/40">
          <button
            onClick={signOut}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-[calc(100vh-4rem)] md:min-h-screen p-6 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
