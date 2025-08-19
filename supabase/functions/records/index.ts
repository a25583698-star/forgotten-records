import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const supabase = createClient(supabaseUrl!, supabaseKey!);

    const url = new URL(req.url);
    const pathParts = url.pathname.split("/");
    const id = pathParts[pathParts.length - 1];

    console.log(`Attempting to access record ID: ${id}`);

    // VULNERABILITY 1: JWT Manipulation - No signature verification!
    // This is intentionally vulnerable for the CTF challenge
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    
    if (!token) {
      return new Response(JSON.stringify({ error: "No authorization token provided" }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    try {
      // VULNERABLE: Decoding JWT without signature verification
      const payload = JSON.parse(atob(token.split(".")[1] || "{}"));
      console.log("JWT Payload:", payload);

      // VULNERABILITY 2: IDOR - Basic access control that can be bypassed
      // Normal users should only see their own record, but admin role bypasses this
      if (payload.role !== "admin" && id !== payload.userId?.toString()) {
        console.log(`Access denied: User role '${payload.role}' trying to access record ${id}`);
        return new Response(JSON.stringify({ 
          error: "Forbidden - You can only access your own records",
          hint: "Unless you have special privileges..." 
        }), {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Fetch patient record
      const { data: patient, error: patientError } = await supabase
        .from("patients")
        .select("*")
        .eq("id", parseInt(id))
        .single();

      if (patientError || !patient) {
        console.log("Patient not found or error:", patientError);
        return new Response(JSON.stringify({ 
          error: "Patient record not found",
          hint: "Try different record IDs... some are hidden deeper in the asylum..." 
        }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      console.log(`Successfully retrieved patient record for ID: ${id}`);

      // VULNERABILITY 3: Flag revelation for restricted file
      // If this is the restricted file (ID 66) and user has admin role, return the flag
      if (id === "66" && payload.role === "admin") {
        console.log("Accessing restricted asylum file - retrieving flag");
        const { data: flag } = await supabase
          .from("flags")
          .select("flag")
          .eq("id", 1)
          .single();

        if (flag) {
          patient.record += `\n\n🚩 CLASSIFIED INFORMATION REVEALED 🚩\n\nThe truth about this asylum has been buried for decades...\n\nFlag: ${flag.flag}\n\nYou have successfully exploited the JWT manipulation and IDOR vulnerabilities!\n\nVulnerabilities found:\n1. JWT tokens are not properly verified (no signature check)\n2. Insecure Direct Object Reference allows access to any patient record\n3. Privilege escalation through JWT role manipulation`;
        }
      }

      return new Response(JSON.stringify(patient), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (jwtError) {
      console.log("JWT decode error:", jwtError);
      return new Response(JSON.stringify({ 
        error: "Invalid token format",
        hint: "The JWT token seems malformed... or perhaps it needs modification?" 
      }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    console.error("Server error:", error);
    return new Response(JSON.stringify({ 
      error: "Internal server error",
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});