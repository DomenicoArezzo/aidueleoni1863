import React from "react";
import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps {
  as?: HeadingLevel;
  children: React.ReactNode;
  className?: string;
}

const headingStyles: Record<HeadingLevel, string> = {
  h1: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]",
  h2: "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight",
  h3: "text-2xl sm:text-3xl font-bold",
  h4: "text-xl font-semibold",
  h5: "text-lg font-semibold",
  h6: "text-base font-semibold",
};

export const Heading = ({ as: Tag = "h2", children, className }: HeadingProps) => (
  <Tag className={cn(headingStyles[Tag], "text-foreground", className)}>{children}</Tag>
);

interface BodyTextProps {
  children?: React.ReactNode;
  className?: string;
  size?: "body" | "lead" | "caption";
  muted?: boolean;
  maxWidth?: boolean;
  dangerouslySetInnerHTML?: { __html: string };
}

const sizeStyles = {
  body: "text-base leading-relaxed",
  lead: "text-lg sm:text-xl leading-relaxed",
  caption: "text-xs leading-normal",
};

export const BodyText = ({ children, className, size = "body", muted = false, maxWidth = false, dangerouslySetInnerHTML }: BodyTextProps) => (
  <p
    className={cn(
      sizeStyles[size],
      muted ? "text-muted-foreground" : "text-foreground",
      maxWidth && "max-w-[65ch]",
      className
    )}
    dangerouslySetInnerHTML={dangerouslySetInnerHTML}
  >
    {dangerouslySetInnerHTML ? undefined : children}
  </p>
);

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  as?: HeadingLevel;
}

export const SectionHeader = ({ title, subtitle, className, as = "h2" }: SectionHeaderProps) => (
  <div className={cn("text-center mb-12", className)}>
    <Heading as={as}>{title}</Heading>
    {subtitle && (
      <BodyText size="lead" muted maxWidth className="mx-auto mt-4">
        {subtitle}
      </BodyText>
    )}
  </div>
);
