import * as React from "react";
import { cn } from "@/lib/utils";

type MessageAlign = "start" | "end";

const Message = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { align?: MessageAlign }
>(({ className, align = "start", ...props }, ref) => (
  <div
    ref={ref}
    data-align={align}
    className={cn(
      "group/message flex w-full gap-3",
      align === "end" ? "flex-row-reverse" : "flex-row",
      className
    )}
    {...props}
  />
));
Message.displayName = "Message";

const MessageGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex w-full flex-col gap-1", className)} {...props} />
  )
);
MessageGroup.displayName = "MessageGroup";

const MessageAvatar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex shrink-0 self-end has-[+[data-has-footer=true]]:mb-8", className)}
      {...props}
    />
  )
);
MessageAvatar.displayName = "MessageAvatar";

const MessageContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex min-w-0 flex-1 flex-col gap-1 group-data-[align=end]/message:items-end",
        className
      )}
      {...props}
    />
  )
);
MessageContent.displayName = "MessageContent";

const MessageHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-1 text-xs font-medium text-muted-foreground", className)} {...props} />
  )
);
MessageHeader.displayName = "MessageHeader";

const MessageFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-has-footer="true"
    className={cn(
      "flex items-center gap-2 px-1 text-xs text-muted-foreground group-data-[align=end]/message:justify-end",
      className
    )}
    {...props}
  />
));
MessageFooter.displayName = "MessageFooter";

export {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
};
