"use client";

import { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  onClick: () => void;
  icon: LucideIcon;
}
export default function Item({ label, onClick, icon: Icon }: Props) {
  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: "12px" }}
      className="group flex items-center min-h-[27px] text-sm text-muted-foreground font-medium hover:bg-primary/5 py-1 pr-3"
    >
      <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      <span className="truncate">{label}</span>
    </div>
  );
}
