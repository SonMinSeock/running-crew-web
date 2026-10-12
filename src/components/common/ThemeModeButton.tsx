import { Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeModeButton() {
  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      aria-label="테마 모드"
      className="bg-app-card text-app-text hover:bg-app-card hover:text-app-text fixed top-6 right-6 z-50 size-10 cursor-pointer rounded-full"
    >
      <Sun className="size-5" aria-hidden="true" />
    </Button>
  );
}
