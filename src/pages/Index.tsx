import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HorrorButton } from "@/components/HorrorButton";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a session already exists
    const token = localStorage.getItem('asylum_token');
    if (token) {
      navigate('/records');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fog and other horror-themed overlays */}
      <div className="fog-overlay" />
      <div className="ghostly-hand" style={{ top: '20%', left: '10%' }} />
      <div className="ghostly-hand" style={{ top: '60%', right: '15%', animationDelay: '7s' }} />

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="font-creepster text-6xl md:text-8xl text-primary flicker mb-4">
            The Forgotten Hospital Records
          </h1>

          {/* Subtitle & Introduction */}
          <div className="space-y-4">
            <p className="font-special text-xl md:text-2xl text-foreground/90 typewriter">
              Abandoned Asylum Patient Portal
            </p>
            <p className="font-special text-lg text-muted-foreground max-w-2xl mx-auto">
              You've trespassed into the condemned digital archives of Ravenshollow Asylum.
              After its closure in 1987, the system was left to decay... along with the secrets sealed within its records.
            </p>
          </div>

          {/* Warning Block */}
          <div className="bg-card/70 border-destructive/30 shadow-dark backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
             <h2 className="font-creepster text-3xl text-destructive mb-4">A Warning</h2>
             <p className="font-special text-foreground/80">
               This portal is unstable. The data is corrupted, and the memories of those who resided here still linger within the code.
               We cannot guarantee the integrity of what you find, nor your safety while you are here. Proceed at your own risk.
             </p>
          </div>


          {/* Action Button */}
          <div className="flex justify-center items-center">
            <HorrorButton
              variant="blood"
              onClick={() => navigate('/auth')}
              className="w-full sm:w-auto"
            >
              Enter the Asylum
            </HorrorButton>
          </div>

          {/* Footer */}
          <div className="mt-12 space-y-2">
            <p className="font-special text-xs text-muted-foreground">
              PROPERTY OF RAVENSHALLOW ASYLUM - EST. 1899
            </p>
            <p className="font-special text-xs text-muted-foreground">
              All unauthorized access is monitored by the groundskeeper.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;