import { cn } from "@/lib/utils";
import React from "react";

interface OverlayCardWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const OverlayCardWrapper = ({
  children,
  className,
  ...props
}: OverlayCardWrapperProps) => {
  return (
    <div className="h-max shrink-0 p-4">
      <div
        className={cn(
          "rounded-3xl border h-full flex flex-col relative overflow-hidden w-full",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};
