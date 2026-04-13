import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type OutlineButtonProps = React.ComponentProps<typeof Button>;

const outlineButtonClass =
  "h-12 border-2 border-primary bg-transparent px-7 text-base font-bold text-foreground hover:bg-primary/20 focus-visible:ring-primary";

function OutlineButton({ className, ...props }: OutlineButtonProps) {
  return <Button className={cn(outlineButtonClass, className)} {...props} />;
}

export { OutlineButton, outlineButtonClass };
