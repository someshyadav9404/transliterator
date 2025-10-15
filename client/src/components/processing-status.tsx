import { Loader2, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessingStatusProps {
  status: "processing" | "success" | "error" | "idle";
  message?: string;
}

export function ProcessingStatus({ status, message }: ProcessingStatusProps) {
  if (status === "idle") return null;

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 rounded-lg transition-all duration-300",
        status === "processing" && "bg-primary/10 text-primary",
        status === "success" && "bg-success/10 text-success",
        status === "error" && "bg-destructive/10 text-destructive"
      )}
      role="status"
      aria-live="polite"
      data-testid={`status-${status}`}
    >
      {status === "processing" && (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="font-medium">{message || "Extracting text..."}</span>
        </>
      )}
      {status === "success" && (
        <>
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">{message || "Text extracted successfully!"}</span>
        </>
      )}
      {status === "error" && (
        <>
          <AlertCircle className="h-5 w-5" />
          <span className="font-medium">{message || "Failed to extract text"}</span>
        </>
      )}
    </div>
  );
}
