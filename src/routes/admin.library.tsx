import { createFileRoute } from "@tanstack/react-router";
import { LibraryPage } from "@/components/shared/LibraryPage";
export const Route = createFileRoute("/admin/library")({
  head: () => ({ meta: [{ title: "Bibliothèque — QVT-Care" }] }),
  component: LibraryPage,
});
