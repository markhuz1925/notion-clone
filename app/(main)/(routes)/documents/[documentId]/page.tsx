"use client";

import CoverImage from "@/components/cover-image";
import Editor from "@/components/editor";
import Toolbar from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";

export default function DocumentPage({
  params,
}: {
  params: { documentId: Id<"documents"> };
}) {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });
  const update = useMutation(api.documents.update);

  if (document === undefined) {
    return (
      <div>
        <CoverImage.Skeleton />
      </div>
    );
  }

  if (document === null) {
    return <div>Not found!</div>;
  }

  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content,
    });
  };

  return (
    <div className="pb-40">
      <CoverImage url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        <Editor onChange={onChange} initialContent={document.content} />
      </div>
    </div>
  );
}
