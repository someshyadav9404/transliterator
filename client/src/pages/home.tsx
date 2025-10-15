import { useState } from "react";
import { CameraUploadZone } from "@/components/camera-upload-zone";
import { LanguageToggle } from "@/components/language-toggle";
import { TextDisplayCard } from "@/components/text-display-card";
import { ProcessingStatus } from "@/components/processing-status";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RotateCcw } from "lucide-react";
import type { TransliterationDirection } from "@shared/schema";

type ProcessingStatus = "idle" | "processing" | "success" | "error";

export default function Home() {
  const [direction, setDirection] = useState<TransliterationDirection>("en-to-hi");
  const [extractedText, setExtractedText] = useState("");
  const [transliteratedText, setTransliteratedText] = useState("");
  const [status, setStatus] = useState<ProcessingStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [hasImage, setHasImage] = useState(false);

  const handleImageCapture = async (imageSrc: string) => {
    setHasImage(true);
    setStatus("processing");
    setStatusMessage("Extracting text from image...");
    setExtractedText("");
    setTransliteratedText("");

    // OCR and transliteration will be implemented in phase 3
    // For now, this is a placeholder
    setTimeout(() => {
      setStatus("success");
      setStatusMessage("Ready for text extraction");
    }, 1000);
  };

  const handleReset = () => {
    setExtractedText("");
    setTransliteratedText("");
    setStatus("idle");
    setStatusMessage("");
    setHasImage(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-2xl font-bold" data-testid="text-app-title">
              Photo Transliterator
            </h1>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-6">
          {/* Language Direction Toggle */}
          <div className="space-y-3">
            <h2 className="text-sm font-medium text-muted-foreground text-center">
              Translation Direction
            </h2>
            <LanguageToggle direction={direction} onDirectionChange={setDirection} />
          </div>

          {/* Camera/Upload Zone */}
          <CameraUploadZone
            onImageCapture={handleImageCapture}
            isProcessing={status === "processing"}
          />

          {/* Processing Status */}
          <ProcessingStatus status={status} message={statusMessage} />

          {/* Results Section */}
          {hasImage && (
            <div className="space-y-4 animate-in fade-in duration-500">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Results</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  data-testid="button-new-photo"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  New Photo
                </Button>
              </div>

              <div className="space-y-4">
                <TextDisplayCard
                  title="Extracted Text"
                  text={extractedText}
                  variant="extracted"
                  isEmpty={!extractedText && status === "success"}
                  testId="card-extracted-text"
                />
                <TextDisplayCard
                  title="Transliterated Text"
                  text={transliteratedText}
                  variant="transliterated"
                  testId="card-transliterated-text"
                />
              </div>
            </div>
          )}

          {/* Tips Section */}
          <div className="pt-8">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="tips" data-testid="accordion-tips">
                <AccordionTrigger className="text-base font-medium">
                  Tips for better results
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Ensure good lighting when capturing images</li>
                    <li>Keep the camera steady and text in focus</li>
                    <li>Avoid shadows and glare on the text</li>
                    <li>Use high-contrast images for better accuracy</li>
                    <li>Make sure text is clearly visible and not blurry</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Supported Scripts Info */}
          <div className="text-center text-sm text-muted-foreground pb-8">
            <p>Supports English (Latin) and Hindi (Devanagari) scripts</p>
          </div>
        </div>
      </main>
    </div>
  );
}
