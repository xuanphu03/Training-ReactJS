import { cn } from "@/lib/utils";
import type React from "react";

type LogoProps = React.ComponentProps<"p"> & { letterGClassName?: string };

export default function logo({
  className,
  letterGClassName,
  ...props
}: LogoProps) {
  return (
    <p className={cn("text-3xl font-bold", className)} {...props}>
      Lo<span className={cn("text-purple-500", letterGClassName)}>g</span>o
    </p>
  );
}
