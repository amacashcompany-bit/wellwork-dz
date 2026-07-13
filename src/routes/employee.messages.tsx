import { createFileRoute } from "@tanstack/react-router";
import { MessagingPage } from "@/components/shared/MessagingPage";
export const Route = createFileRoute("/employee/messages")({
  head: () => ({ meta: [{ title: "Mes messages — QVT-Care" }] }),
  component: MessagingPage,
});
