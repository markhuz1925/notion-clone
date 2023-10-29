import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Loader2Icon } from "lucide-react";

const spinnerVariants = cva("text-muted-foreground animate-spin", {
  variants: {
    size: {
      default: "w-4 h-4",
      sm: "w-2 h-2",
      lg: "w-6 h-6",
      icon: "w-10 h-10",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {}

export default function Spinner({ size }: SpinnerProps) {
  return <Loader2Icon className={cn(spinnerVariants({ size }))} />;
}
