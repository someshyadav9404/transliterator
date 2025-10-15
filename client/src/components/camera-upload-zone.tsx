import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { Camera, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CameraUploadZoneProps {
  onImageCapture: (imageSrc: string) => void;
  isProcessing: boolean;
}

export function CameraUploadZone({ onImageCapture, isProcessing }: CameraUploadZoneProps) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImage(imageSrc);
        setIsCameraActive(false);
        onImageCapture(imageSrc);
      }
    }
  }, [onImageCapture]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageSrc = e.target?.result as string;
        setCapturedImage(imageSrc);
        setIsCameraActive(false);
        onImageCapture(imageSrc);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageCapture]);

  const handleReset = () => {
    setCapturedImage(null);
    setIsCameraActive(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const startCamera = () => {
    setIsCameraActive(true);
    setCapturedImage(null);
  };

  return (
    <div className="relative w-full">
      <div
        className={cn(
          "relative overflow-hidden rounded-lg transition-all duration-300",
          capturedImage || isCameraActive ? "min-h-96 aspect-[4/3]" : "min-h-96"
        )}
      >
        {!isCameraActive && !capturedImage && (
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(210,80%,20%)] to-[hsl(210,70%,30%)] dark:from-[hsl(210,80%,15%)] dark:to-[hsl(210,70%,25%)] flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-lg">
            <Camera className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">Take photo or upload</p>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Capture an image with your camera or upload from your device
            </p>
            <div className="flex gap-4">
              <Button
                onClick={startCamera}
                size="lg"
                className="min-h-12"
                data-testid="button-start-camera"
              >
                <Camera className="mr-2 h-5 w-5" />
                Open Camera
              </Button>
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                size="lg"
                className="min-h-12"
                data-testid="button-upload-photo"
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload Photo
              </Button>
            </div>
          </div>
        )}

        {isCameraActive && (
          <div className="relative">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full h-full rounded-lg"
              videoConstraints={{
                facingMode: "environment",
                aspectRatio: 4 / 3,
              }}
              data-testid="webcam-preview"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
              <Button
                onClick={handleCapture}
                size="lg"
                className="rounded-full h-16 w-16 p-0"
                disabled={isProcessing}
                data-testid="button-capture-photo"
              >
                <Camera className="h-6 w-6" />
              </Button>
              <Button
                onClick={() => setIsCameraActive(false)}
                variant="outline"
                size="icon"
                className="rounded-full backdrop-blur-lg bg-black/30"
                data-testid="button-close-camera"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="absolute bottom-4 right-4">
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                size="icon"
                className="rounded-lg backdrop-blur-lg bg-black/30"
                data-testid="button-upload-from-camera"
              >
                <Upload className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {capturedImage && (
          <div className="relative">
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full h-full object-contain rounded-lg"
              data-testid="img-captured"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                onClick={handleReset}
                variant="outline"
                size="icon"
                className="rounded-lg backdrop-blur-lg bg-black/30"
                disabled={isProcessing}
                data-testid="button-reset-image"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
        data-testid="input-file-upload"
      />
    </div>
  );
}
