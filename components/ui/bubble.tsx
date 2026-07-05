import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bubbleVariants = cva("relative w-fit max-w-[min(100%,42rem)] rounded-2xl text-sm leading-relaxed", {
  variants: {
    variant: {
      default: "bg-muted text-foreground",
      primary: "bg-primary text-primary-foreground",
    },
  },
  defaultVariants: { variant: "default" },
});

const Bubble = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof bubbleVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} className={cn(bubbleVariants({ variant }), className)} {...props} />
));
Bubble.displayName = "Bubble";

const BubbleContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-4 py-3", className)} {...props} />
  )
);
BubbleContent.displayName = "BubbleContent";

export { Bubble, BubbleContent, bubbleVariants };
