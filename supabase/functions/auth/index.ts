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

    const { email, password, action } = await req.json();

    if (action === 'register') {
      // Register new user
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single();

      if (existingUser) {
        return new Response(JSON.stringify({ 
          error: "A soul with this email already haunts these halls..." 
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert({ email, password, role: 'user' })
        .select()
        .single();

      if (insertError) {
        return new Response(JSON.stringify({ 
          error: "Failed to register in the asylum records..." 
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Create unsigned JWT (VULNERABLE for CTF)
      const header = { alg: "none", typ: "JWT" };
      const payload = { 
        userId: newUser.id, 
        email: newUser.email, 
        role: newUser.role,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours
      };

      const token = btoa(JSON.stringify(header)) + "." + 
                   btoa(JSON.stringify(payload)) + ".";

      return new Response(JSON.stringify({ 
        token, 
        user: { id: newUser.id, email: newUser.email, role: newUser.role },
        message: "Welcome to the asylum... your record has been created."
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (action === 'login') {
      // Login user
      const { data: user, error: loginError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (loginError || !user) {
        return new Response(JSON.stringify({ 
          error: "Invalid credentials... the asylum gates remain closed." 
        }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Create unsigned JWT (VULNERABLE for CTF)
      const header = { alg: "none", typ: "JWT" };
      const payload = { 
        userId: user.id, 
        email: user.email, 
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours
      };

      const token = btoa(JSON.stringify(header)) + "." + 
                   btoa(JSON.stringify(payload)) + ".";

      return new Response(JSON.stringify({ 
        token, 
        user: { id: user.id, email: user.email, role: user.role },
        message: "The asylum gates creak open... you may enter."
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Auth error:", error);
    return new Response(JSON.stringify({ 
      error: "The asylum spirits are restless...",
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});