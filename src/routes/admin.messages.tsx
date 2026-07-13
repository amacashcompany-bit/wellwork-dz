import { createFileRoute } from "@tanstack/react-router";
import { MessagingPage } from "@/components/shared/MessagingPage";
export const Route = createFileRoute("/admin/messages")({
  head: () => ({ meta: [{ title: "Messagerie — QVT-Care" }] }),
  component: MessagingPage,
});
