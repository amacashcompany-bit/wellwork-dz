import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useStore } from "@/store/useStore";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const role = useStore((s) => s.role);
  useEffect(() => {
    navigate({ to: role === "admin" ? "/admin/dashboard" : "/employee/home", replace: true });
  }, [role, navigate]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-10 h-10 rounded-full border-2 border-brand border-t-transparent animate-spin" />
    </div>
  );
}
