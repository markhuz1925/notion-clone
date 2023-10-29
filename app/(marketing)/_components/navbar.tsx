"use client";

import Logo from "@/components/logo";
import useScrollTop from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "fixed z-50 top-0 bg-background flex items-center w-full p-6 transition-all",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="flex items-center justify-between gap-x-2 w-full md:ml-auto md:justify-end">
        Login
      </div>
    </div>
  );
}
