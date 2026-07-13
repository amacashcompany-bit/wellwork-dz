import { createFileRoute } from "@tanstack/react-router";
import { EventsPage } from "@/components/shared/EventsPage";
export const Route = createFileRoute("/admin/events")({
  head: () => ({ meta: [{ title: "Événements — QVT-Care" }] }),
  component: EventsPage,
});
