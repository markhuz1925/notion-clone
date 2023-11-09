"use client";

import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Banner({
  documentId,
}: {
  documentId: Id<"documents">;
}) {
  const router = useRouter();
  const remove = useMutation(api.documents.permanentDelete);
  const recover = useMutation(api.documents.unArchived);

  const onRemove = () => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note Deleted!",
      error: "Failed to delete note",
    });
    router.push("/documents");
  };

  const onRecover = () => {
    const promise = recover({ id: documentId });
    toast.promise(promise, {
      loading: "Recovering note...",
      success: "Note Restored!",
      error: "Failed to restore note",
    });
  };

  return (
    <div className="flex items-center justify-center gap-x-2 p-2 w-full bg-rose-500 text-center text-sm text-white">
      <p>This note is in the Trash.</p>
      <Button
        onClick={onRecover}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore note
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          variant="outline"
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Delete forever!
        </Button>
      </ConfirmModal>
    </div>
  );
}
