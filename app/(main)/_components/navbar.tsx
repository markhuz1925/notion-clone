"use client";

import Spinner from "@/components/ui/spinner";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";

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
    return <Spinner size="lg" />;
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
        <div className="flex itemx-center justify-between w-full">Navbar</div>
      </nav>
    </>
  );
}
