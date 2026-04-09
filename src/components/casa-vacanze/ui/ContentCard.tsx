import React from "react";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "gradient";
  padding?: "sm" | "md" | "lg";
}

const paddingMap = { sm: "p-4", md: "p-6", lg: "p-8" };

const ContentCard = ({ children, className, variant = "default", padding = "md" }: ContentCardProps) => (
  <div
    className={cn(
      "rounded-[10px]",
      paddingMap[padding],
      variant === "default" && "bg-card text-card-foreground shadow-sm border border-border/50",
      variant === "elevated" && "bg-card text-card-foreground shadow-elegant",
      variant === "gradient" && "bg-gradient-to-br from-primary/10 to-accent/10",
      className
    )}
  >
    {children}
  </div>
);

export default ContentCard;
