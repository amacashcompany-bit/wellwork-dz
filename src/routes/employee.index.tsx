import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/employee/")({
  component: () => {
    const nav = useNavigate();
    useEffect(() => { nav({ to: "/employee/home", replace: true }); }, [nav]);
    return null;
  },
});
