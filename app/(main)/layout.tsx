"use client";

import Spinner from "@/components/ui/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Navigation from "./_components/navigation";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) return redirect("/");

  return (
    <div className="flex h-full dark:bg-slate-800">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">{children}</main>
    </div>
  );
}
