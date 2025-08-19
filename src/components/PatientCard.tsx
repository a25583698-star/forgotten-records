import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface Patient {
  id: number;
  name: string;
  record: string;
}

interface PatientCardProps {
  patient: Patient;
  onClick?: () => void;
  isRestricted?: boolean;
}

export const PatientCard = ({ patient, onClick, isRestricted = false }: PatientCardProps) => {
  return (
    <Card 
      className={cn(
        "paper-texture bg-card border-primary/30 p-6 cursor-crosshair relative",
        "transition-all duration-300 hover:shadow-dark hover:border-primary/60",
        "breathing-shadow fade-in-horror haunted-hover",
        isRestricted && "border-destructive/50 bg-destructive/5 pulse-red",
        patient.id === 66 && "shadow-creep evil-flicker"
      )}
      onClick={onClick}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className={cn(
            "font-creepster text-xl text-primary",
            isRestricted && "text-destructive flicker",
            patient.id === 66 && "glitch-text"
          )}>
            Patient #{patient.id}
          </h3>
          {isRestricted && (
            <span className="text-xs bg-destructive/20 text-destructive px-2 py-1 rounded font-special animate-pulse">
              ⚠️ CLASSIFIED ⚠️
            </span>
          )}
        </div>
        
        <div className="space-y-2">
          <p className="font-special text-foreground/90">
            <span className="text-primary">Name:</span> {patient.name}
          </p>
          
          <div className="space-y-1">
            <p className="text-primary font-special text-sm">Classification:</p>
            <p className={cn(
              "text-foreground/80 font-special text-sm leading-relaxed",
              isRestricted && "glitch-text"
            )}>
              {patient.record}
            </p>
          </div>
        </div>

        {patient.id === 66 && (
          <div className="absolute -top-1 -right-1 text-destructive animate-ping">💀</div>
        )}
      </div>
    </Card>
  );
};