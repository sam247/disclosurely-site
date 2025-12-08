import * as React from "react";
import { cn } from "@/lib/utils";

export type CalendarProps = {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
};

// Lightweight calendar placeholder to avoid heavy deps; replace with a full picker if needed.
function Calendar({ className, value, onChange }: CalendarProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <input
        type="date"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
