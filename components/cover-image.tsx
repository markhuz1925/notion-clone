"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

export default function CoverImage({
  url,
  preview,
}: {
  url?: string;
  preview?: boolean;
}) {
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
    </div>
  );
}
