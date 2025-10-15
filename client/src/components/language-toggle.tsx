import { Button } from "@/components/ui/button";
import type { TransliterationDirection } from "@shared/schema";

interface LanguageToggleProps {
  direction: TransliterationDirection;
  onDirectionChange: (direction: TransliterationDirection) => void;
}

export function LanguageToggle({ direction, onDirectionChange }: LanguageToggleProps) {
  return (
    <div className="flex gap-2 w-full max-w-md mx-auto" data-testid="language-toggle">
      <Button
        variant={direction === "en-to-hi" ? "default" : "outline"}
        className="flex-1 transition-all duration-300"
        onClick={() => onDirectionChange("en-to-hi")}
        data-testid="button-en-to-hi"
      >
        English → Hindi
      </Button>
      <Button
        variant={direction === "hi-to-en" ? "default" : "outline"}
        className="flex-1 transition-all duration-300"
        onClick={() => onDirectionChange("hi-to-en")}
        data-testid="button-hi-to-en"
      >
        Hindi → English
      </Button>
    </div>
  );
}
