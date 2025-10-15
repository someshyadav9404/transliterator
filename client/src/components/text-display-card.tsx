import { Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TextDisplayCardProps {
  title: string;
  text: string;
  variant?: "extracted" | "transliterated";
  isEmpty?: boolean;
  testId?: string;
}

export function TextDisplayCard({ 
  title, 
  text, 
  variant = "extracted",
  isEmpty = false,
  testId 
}: TextDisplayCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card 
      className={cn(
        "transition-all duration-300",
        isEmpty && "opacity-50"
      )}
      data-testid={testId}
    >
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        {text && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="h-8 w-8"
            data-testid={`button-copy-${variant}`}
            aria-label="Copy text"
          >
            {copied ? (
              <Check className="h-4 w-4 text-success" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {text ? (
          <p 
            className="font-mono text-lg leading-relaxed whitespace-pre-wrap break-words"
            data-testid={`text-${variant}`}
          >
            {text}
          </p>
        ) : (
          <p className="text-muted-foreground italic" data-testid={`text-empty-${variant}`}>
            {isEmpty ? "No text detected" : "Text will appear here"}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
