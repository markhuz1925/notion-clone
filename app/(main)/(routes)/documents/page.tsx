"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircleIcon } from "lucide-react";
import Image from "next/image";

export default function DocumentsPage() {
  const { user } = useUser();
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <Image
        src="/empty.png"
        width="300"
        height="300"
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        width="300"
        height="300"
        alt="Empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Jotion
      </h2>
      <Button>
        <PlusCircleIcon className="mr-2 w-4 h-4" />
        Create a note
      </Button>
    </div>
  );
}
