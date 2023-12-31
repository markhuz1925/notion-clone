import { ReactNode } from "react";
import Navbar from "./_components/navbar";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full dark:bg-slate-800">
      <Navbar />
      <div className="h-full pt-40">{children}</div>
    </div>
  );
}
