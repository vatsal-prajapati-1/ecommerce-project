"use client";

import type React from "react";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  const baseClasses =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    default:
      "border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "border-transparent bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
    destructive:
      "border-transparent bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    outline:
      "text-gray-900 border-gray-300 hover:bg-gray-100 focus:ring-gray-500",
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return <div className={combinedClasses} {...props} />;
}

export { Badge };
