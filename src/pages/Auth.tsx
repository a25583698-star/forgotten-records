import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HorrorButton } from "@/components/HorrorButton";
import { HorrorInput } from "@/components/HorrorInput";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [screenShake, setScreenShake] = useState(false);
  
  // New state for the hidden hint button
  const [titleClickCount, setTitleClickCount] = useState(0);
  const [isHintVisible, setIsHintVisible] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('asylum_token');
    if (token) {
      navigate('/records');
    }
  }, [navigate]);

  // Handler for the title click to reveal the hidden button
  const handleTitleClick = () => {
    const newCount = titleClickCount + 1;
    setTitleClickCount(newCount);
    if (newCount >= 5) {
      setIsHintVisible(true);
    }
  };

  // Fills credentials when the hidden button is clicked
  const revealPatientCredentials = () => {
    setEmail("patient@asylum.com");
    setPassword("patient123");
    toast({
      title: "A memory surfaces...",
      description: "The patient's details echo in your mind.",
    });
    // Hide the button again after it has been used
    setIsHintVisible(false);
  };

  const playScreamSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, audio.currentTime + 0.3);
      oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.6);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
      oscillator.type = 'sawtooth';
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.6);
    } catch (e) {
      console.log("Audio context not available");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`https://kbqwpddzpjuwksfvyxsh.supabase.co/functions/v1/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, action: isLogin ? 'login' : 'register' }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      localStorage.setItem('asylum_token', data.token);
      localStorage.setItem('asylum_user', JSON.stringify(data.user));

      toast({
        title: isLogin ? "Access Granted" : "Identity Logged",
        description: isLogin ? "The records are now open to you..." : "You are now part of the archive.",
      });

      navigate('/records');

    } catch (err: any) {
      setError("Credentials Rejected");
      setScreenShake(true);
      playScreamSound();
      
      setTimeout(() => setScreenShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fog-overlay" />
      <div className="ghostly-hand" style={{ top: '20%', left: '10%' }} />
      <div className="ghostly-hand" style={{ top: '60%', right: '15%', animationDelay: '5s' }} />
      
      <div className={`min-h-screen flex items-center justify-center p-4 relative z-10 ${screenShake ? 'screen-shake' : ''}`}>
        <div className="w-full max-w-md">
          <Card className="bg-card/90 border-primary/30 shadow-dark backdrop-blur-sm">
            <div className="p-8 space-y-6">
              <div className="text-center space-y-4">
                <h1 
                  className="font-creepster text-4xl text-primary flicker cursor-pointer"
                  onClick={handleTitleClick} // Title is now clickable
                  title="Something feels odd here..." // A subtle hint on hover
                >
                  {isLogin ? 'Asylum Records Sign-In' : 'New Admission'}
                </h1>
                <p className="font-special text-muted-foreground typewriter">
                  {isLogin ? 'Your identity is required for access...' : 'Register your presence in our logs...'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <HorrorInput
                  id="email"
                  label="Registered Identification"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="identity.log@asylum.net"
                  error={error ? "Access Denied: Invalid Credentials" : ""}
                />
                <HorrorInput
                  id="password"
                  label="Access Key"
                  type="password"
                  value={password}
                  onChange={setPassword}
                  placeholder="The secret you keep..."
                />

                {/* The conditionally rendered hint button */}
                {isHintVisible && (
                   <HorrorButton
                      type="button"
                      variant="ghost"
                      onClick={revealPatientCredentials}
                      className="w-full animate-pulse-slow"
                   >
                     Whisper the Patient's Name...
                   </HorrorButton>
                )}
                
                <HorrorButton
                  type="submit"
                  variant="blood"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? 'Verifying...' : (isLogin ? 'Access Records' : 'Commit Identity')}
                </HorrorButton>
              </form>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-special text-primary hover:text-primary-glow transition-colors glitch-hover"
                >
                  {isLogin ? 'Is this your first time? Register here...' : 'Already a resident? Sign in...'}
                </button>
              </div>

              <div className="mt-6 pt-4 border-t border-destructive/20 text-center">
                  <p className="font-special text-xs text-destructive">
                      Notice: By entering, you consent to have your digital essence recorded. 
                      What is seen cannot be unseen. What is logged cannot be erased.
                  </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;