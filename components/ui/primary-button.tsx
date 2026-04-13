import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PrimaryButtonProps = React.ComponentProps<typeof Button>;

const primaryButtonClass =
  "h-12 border-transparent bg-primary px-7 text-lg font-bold text-chart-1 shadow-[3px_3px_0_0_var(--color-chart-1)] outline-none hover:bg-primary hover:text-chart-1 focus-visible:border-transparent focus-visible:ring-0";

function PrimaryButton({ className, ...props }: PrimaryButtonProps) {
  return <Button className={cn(primaryButtonClass, className)} {...props} />;
}

export { PrimaryButton, primaryButtonClass };
