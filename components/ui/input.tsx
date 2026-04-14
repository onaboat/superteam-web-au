import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full border-2 border-chart-1 bg-background px-3 py-2 text-sm text-foreground shadow-none placeholder:text-muted-foreground focus-visible:border-chart-1 focus-visible:ring-2 focus-visible:ring-chart-1/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-[120px] w-full resize-y border-2 border-chart-1 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-chart-1 focus-visible:ring-2 focus-visible:ring-chart-1/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input, Textarea };
