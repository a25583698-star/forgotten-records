import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface HorrorInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export const HorrorInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error
}: HorrorInputProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="space-y-2">
      <Label 
        htmlFor={id} 
        className={cn(
          "font-special text-foreground transition-all duration-300",
          focused && "text-primary flicker"
        )}
      >
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className={cn(
          "bg-input border-border text-foreground placeholder:text-muted-foreground",
          "focus:border-primary focus:ring-primary/20 focus:shadow-glow",
          "transition-all duration-300 font-special",
          error && "border-destructive focus:border-destructive",
          focused && "shadow-glow"
        )}
      />
      {error && (
        <p className="text-destructive text-sm font-special flicker">
          {error}
        </p>
      )}
    </div>
  );
};