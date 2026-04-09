import React from "react";
import { cn } from "@/lib/utils";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantStyles = {
  primary:
    "bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm",
  secondary:
    "border-2 border-border hover:border-primary text-foreground hover:text-primary font-semibold bg-transparent",
  ghost:
    "text-muted-foreground hover:text-foreground hover:bg-muted/60 bg-transparent font-medium",
};

const sizeStyles = {
  sm: "min-h-[36px] px-4 text-sm rounded-lg",
  md: "min-h-[44px] px-6 text-sm rounded-xl",
  lg: "min-h-[52px] px-8 text-base rounded-full",
};

const ActionButton = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  className,
  ...props
}: ActionButtonProps) => (
  <button
    className={cn(
      "inline-flex items-center justify-center gap-2 transition-all duration-200 ease-in-out",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:opacity-40 disabled:cursor-not-allowed",
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && "w-full",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export default ActionButton;
