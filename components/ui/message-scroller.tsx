"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const MessageScroller = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const innerRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => innerRef.current as HTMLDivElement);

  React.useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [children]);

  return (
    <div
      ref={innerRef}
      className={cn(
        "flex-1 overflow-y-auto overscroll-contain px-4 py-6 [scrollbar-gutter:stable]",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">{children}</div>
    </div>
  );
});
MessageScroller.displayName = "MessageScroller";

export { MessageScroller };
