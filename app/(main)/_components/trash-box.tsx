"use client";

import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { SearchIcon, Trash2Icon, TrashIcon, Undo2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function TrashBox() {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getArchived);
  const unArchived = useMutation(api.documents.unArchived);
  const permanentDelete = useMutation(api.documents.permanentDelete);
  const [search, setSearch] = useState("");

  const filteredDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onUnArchive = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    event.stopPropagation();
    const promise = unArchived({ id: documentId });

    toast.promise(promise, {
      loading: "Unarchiving note...",
      success: "Note unarchived!",
      error: "Failed to unarchive note",
    });
  };

  const onPermanentDelete = (documentId: Id<"documents">) => {
    const promise = permanentDelete({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note Deleted!",
      error: "Failed to delete note",
    });

    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  if (documents === undefined) {
    return (
      <div className="flex items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <SearchIcon className="w-4 h-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by note title..."
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No notes found.
        </p>
        {filteredDocuments?.map((document) => (
          <div
            key={document._id}
            role="button"
            onClick={() => onClick(document._id)}
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center justify-between text-primary p-2"
          >
            <span className="truncate">{document.title}</span>
            <div className="flex items-center">
              <div
                role="button"
                onClick={(e) => onUnArchive(e, document._id)}
                className="rounded-sm p-2 hover:bg-slate-200"
              >
                <Undo2Icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div
                role="button"
                onClick={(e) => onPermanentDelete(document._id)}
                className="group rounded-sm p-2 hover:bg-red-50"
              >
                <Trash2Icon className="w-4 h-4 text-muted-foreground group-hover:text-red-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
