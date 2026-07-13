import { createFileRoute } from "@tanstack/react-router";
import { LibraryPage } from "@/components/shared/LibraryPage";
export const Route = createFileRoute("/employee/library")({
  head: () => ({ meta: [{ title: "Bibliothèque — QVT-Care" }] }),
  component: LibraryPage,
});
