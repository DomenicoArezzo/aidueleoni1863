import React from "react";
import { cn } from "@/lib/utils";

interface SectionBlockProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  bg?: "white" | "muted" | "muted-light";
}

const bgMap = {
  white: "bg-background",
  muted: "bg-muted/50",
  "muted-light": "bg-muted/30",
};

const SectionBlock = ({ id, children, className, bg = "white" }: SectionBlockProps) => (
  <section id={id} className={cn("py-10 sm:py-16", bgMap[bg], className)}>
    <div className="max-w-[1280px] mx-auto px-6">{children}</div>
  </section>
);

export default SectionBlock;
