import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface HorrorButtonProps {
  children: ReactNode;
  variant?: "blood" | "ghost" | "asylum";
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const HorrorButton = ({ 
  children, 
  variant = "blood", 
  onClick, 
  disabled = false,
  type = "button",
  className 
}: HorrorButtonProps) => {
  const variants = {
    blood: "bg-gradient-blood border-primary text-primary-foreground hover:shadow-blood hover:shadow-lg transition-all duration-300 hover:scale-105",
    ghost: "bg-transparent border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300",
    asylum: "bg-secondary border-primary/30 text-foreground hover:bg-primary/20 hover:text-primary-foreground transition-all duration-300"
  };

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "font-special text-lg px-6 py-3 border-2 relative overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-blood before:opacity-0 before:transition-opacity before:duration-300",
        "hover:before:opacity-20",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
    >
      <span className="relative z-10 glitch-hover">{children}</span>
    </Button>
  );
};