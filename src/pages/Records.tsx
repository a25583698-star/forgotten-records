import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PatientCard } from "@/components/PatientCard";
import { HorrorButton } from "@/components/HorrorButton";
import { HorrorInput } from "@/components/HorrorInput";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

interface Patient {
  id: number;
  name: string;
  record: string;
}

interface User {
  id: string;
  email: string;
  role: string;
}

const Records = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [recordId, setRecordId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('asylum_token');
    const userData = localStorage.getItem('asylum_user');
    
    if (!token || !userData) {
      navigate('/auth');
      return;
    }

    setUser(JSON.parse(userData));
    loadDefaultPatients();
  }, [navigate]);

  const loadDefaultPatients = async () => {
    // Load visible patient records from asylum archives
    const asylumPatients = [
      { id: 1, name: "John Doe", record: "CLASSIFICATION: SEVERE PSYCHOTIC BREAK" },
      { id: 2, name: "Mary Black", record: "CLASSIFICATION: HOMICIDAL IDEATION" },
      { id: 3, name: "Michael Cross", record: "CLASSIFICATION: DISSOCIATIVE IDENTITY DISORDER" },
      { id: 4, name: "Sarah Thompson", record: "CLASSIFICATION: PARANOID DELUSIONS" },
      { id: 5, name: "David Wilson", record: "CLASSIFICATION: CATATONIC SCHIZOPHRENIA" },
      { id: 7, name: "Jack Torrance", record: "CLASSIFICATION: VIOLENT PSYCHOTIC BREAK" },
      { id: 8, name: "Annie Wilkes", record: "CLASSIFICATION: OBSESSIVE COMPULSIVE DISORDER" },
      { id: 9, name: "Regan MacNeil", record: "CLASSIFICATION: UNKNOWN SYNDROME" },
      { id: 10, name: "Norman Bates", record: "CLASSIFICATION: DISSOCIATIVE IDENTITY DISORDER" },
    ];
    setPatients(asylumPatients);
  };

  const fetchPatientRecord = async (id: number) => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem('asylum_token');
      const response = await fetch(`https://kbqwpddzpjuwksfvyxsh.supabase.co/functions/v1/records/${id}`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Record is sealed or missing.');
      setSelectedPatient(data);
      toast({
        title: "Archive Unsealed",
        description: `Case File #${id} has been accessed.`,
      });

    } catch (err: any) {
      setError(err.message);
      setSelectedPatient(null);
      toast({
        title: "Access Forbidden",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDirectAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (recordId) {
      fetchPatientRecord(parseInt(recordId));
    }
  };

  const logout = () => {
    localStorage.removeItem('asylum_token');
    localStorage.removeItem('asylum_user');
    navigate('/auth');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fog-overlay" />
      <div className="ghostly-hand" style={{ top: '30%', left: '5%', animationDelay: '3s' }} />
      <div className="ghostly-hand" style={{ top: '70%', right: '10%', animationDelay: '8s' }} />

      <div className="min-h-screen p-4 relative z-10">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="font-creepster text-5xl text-primary flicker mb-2">
                Ravenshollow Archives
              </h1>
              <p className="font-special text-muted-foreground">
                Session Active: {user?.email} 
                {isAdmin && <span className="text-destructive ml-2 animate-pulse flicker">[SYSTEM ADMINISTRATOR]</span>}
              </p>
            </div>
            <HorrorButton variant="ghost" onClick={logout}>
              Sever Connection
            </HorrorButton>
          </div>

          {/* Direct Record Access Terminal */}
          <Card className="bg-card/90 border-primary/30 shadow-dark backdrop-blur-sm p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-pulse"></div>
            <h3 className="font-creepster text-xl text-primary mb-4 flicker relative z-10">
              📁 Archival Access Node 📁
            </h3>
            <form onSubmit={handleDirectAccess} className="flex gap-4 items-end relative z-10">
              <div className="flex-1">
                <HorrorInput id="recordId" label="Case File Identifier" value={recordId} onChange={setRecordId} placeholder="Enter designation..." error={error} />
              </div>
              <HorrorButton type="submit" variant="blood" disabled={loading} className="animate-pulse">
                {loading ? 'QUERYING...' : 'QUERY ARCHIVE'}
              </HorrorButton>
            </form>
            <div className="mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded">
              <p className="font-special text-xs text-destructive typewriter">
                // SYSTEM LOG: ALL QUERIES ARE PERMANENTLY RECORDED. //
              </p>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Patient List */}
            <div className="space-y-4">
              <h2 className="font-special text-2xl text-primary">Inmate Census</h2>
              <div className="space-y-3">
                {patients.map((patient) => (<PatientCard key={patient.id} patient={patient} onClick={() => fetchPatientRecord(patient.id)} />))}
                <PatientCard patient={{ id: 66, name: "Subject X", record: "FILE SEALED - REQUIRES WARDEN-LEVEL CLEARANCE" }} onClick={() => fetchPatientRecord(66)} isRestricted={true} />
              </div>
            </div>

            {/* Selected Patient Details */}
            <div className="space-y-4">
              <h2 className="font-special text-2xl text-primary">Subject Dossier</h2>
              {selectedPatient ? (
                <Card className="paper-texture bg-card/90 border-primary/30 shadow-dark backdrop-blur-sm p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-creepster text-2xl text-primary">Case File #{selectedPatient.id}</h3>
                      {selectedPatient.id === 66 && (<span className="text-xs bg-destructive/20 text-destructive px-2 py-1 rounded font-special animate-pulse flicker">⚠️ WARDEN EYES ONLY ⚠️</span>)}
                    </div>
                    <div className="space-y-3">
                      <p className="font-special text-foreground"><span className="text-primary">Designation:</span> {selectedPatient.name}</p>
                      <div className="space-y-2">
                        <p className="text-primary font-special">Psychiatric Evaluation:</p>
                        <div className="bg-background/50 p-4 rounded border border-primary/20"><p className="text-foreground font-special text-sm leading-relaxed whitespace-pre-wrap">{selectedPatient.record}</p></div>
                      </div>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="bg-card/90 border-primary/30 shadow-dark backdrop-blur-sm p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-pulse"></div>
                  <div className="text-center space-y-4 relative z-10">
                    <p className="font-creepster text-lg text-primary flicker">...Awaiting Inquiry...</p>
                    <p className="font-special text-muted-foreground typewriter">The empty screens stare back into the dark.</p>
                    <div className="flex justify-center space-x-4 text-destructive animate-pulse"><span>--</span><span>--</span><span>--</span></div>
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Asylum Warning Notice */}
          <Card className="bg-destructive/5 border-destructive/20 p-6 relative overflow-hidden animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-destructive/10 via-transparent to-destructive/10 animate-pulse"></div>
            <h3 className="font-creepster text-xl text-destructive mb-4 flicker relative z-10">
              MEMORANDUM FOR THE NEW ARCHIVIST
            </h3>
            <div className="space-y-3 font-special text-sm relative z-10">
              <div className="p-3 bg-background/50 border border-destructive/30 rounded"><p className="text-destructive typewriter"> This system is a relic. Do not trust its locks.</p></div>
              <div className="p-3 bg-background/50 border border-destructive/30 rounded"><p className="text-muted-foreground"> Some records have a way of... rewriting themselves.</p></div>
              <div className="p-3 bg-background/50 border border-destructive/30 rounded"><p className="text-primary glitch-text"> Do not investigate Patient #66. Some doors are best left sealed.</p></div>
              <div className="text-center mt-4"><p className="text-destructive font-creepster animate-pulse">- The Warden</p></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Records;