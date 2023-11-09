"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import Banner from "./banner";
import Menu from "./menu";
import Title from "./title";

export default function Navbar({
  isCollapsed,
  onResetWidth,
}: {
  isCollapsed: boolean;
  onResetWidth: () => void;
}) {
  const params = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document === undefined) {
    return (
      <nav className="flex items-center bg-background dark:bg-slate-900 px-3 py-2 w-full">
        <Title.Skeleton />
      </nav>
    );
  }

  if (document === null) return null;

  return (
    <>
      <nav className="flex items-center gap-x-4 bg-background dark:bg-slate-900 px-3 py-2 w-full">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex itemx-center justify-between w-full">
          <Title initialData={document} />
          <div className="flex items-center gap-x-2">
            <Menu documentId={document._id} />
          </div>
        </div>
      </nav>
      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
}
