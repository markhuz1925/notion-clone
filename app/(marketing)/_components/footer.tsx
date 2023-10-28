import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="flex items-center w-full p-6 bg-background z-50">
      <Logo />
      <div className="flex items-center justify-between gap-x-2 text-muted-foreground w-full md:justify-end md:ml-auto">
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </footer>
  );
}
