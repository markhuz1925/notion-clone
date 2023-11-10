"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { ImageIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export default function CoverImage({
  url,
  preview,
}: {
  url?: string;
  preview?: boolean;
}) {
  const { edgestore } = useEdgeStore();
  const coverImage = useCoverImage();
  const params = useParams();
  const remove = useMutation(api.documents.removeCoverImage);

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }
    const promise = remove({ id: params.documentId as Id<"documents"> });
    toast.promise(promise, {
      loading: "Removing cover image...",
      success: "Cover image removed!",
      error: "Failed to remove cover image",
    });
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && (
        <Image src={url} alt="Cover Image" fill className="object-cover" />
      )}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => coverImage.onReplace(url)}
            className="text-muted-foreground text-sm"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Change cover image
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onRemove}
            className="text-red-500 text-sm hover:text-red-500"
          >
            <XIcon className="w-4 h-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}
