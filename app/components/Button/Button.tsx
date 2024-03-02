import React from "react";
import { Button as ShadButton } from "../ui/button";

interface ButtonProps {
  /**
   * Background color to use
   */
  variant: "primary" | "secondary" | "dark" | "outline" | "ghost" | "link";
  /**
   * Button size
   */
  size: "sm" | "md" | "lg";
  /**
   * Button label
   */
  children: string;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ variant, size, children, ...props }: ButtonProps) => {
  return (
    <ShadButton variant={variant} size={size} {...props}>
      {children}
    </ShadButton>
  );
};
