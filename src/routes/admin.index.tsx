import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/admin/")({
  component: () => {
    const nav = useNavigate();
    useEffect(() => { nav({ to: "/admin/dashboard", replace: true }); }, [nav]);
    return null;
  },
});
