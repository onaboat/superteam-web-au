import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PrimaryButtonProps = React.ComponentProps<typeof Button>;

/** Gold (chart-1) fill + border, black label — overrides default variant greens. */
const primaryButtonClass =
  "h-12 border-2 border-chart-1 bg-chart-1 px-7 text-lg font-bold text-black shadow-[4px_4px_0_0_var(--color-chart-4)] outline-none hover:bg-chart-2 hover:text-black focus-visible:border-chart-1 focus-visible:ring-0";

function PrimaryButton({ className, ...props }: PrimaryButtonProps) {
  return <Button className={cn(primaryButtonClass, className)} {...props} />;
}

export { PrimaryButton, primaryButtonClass };
