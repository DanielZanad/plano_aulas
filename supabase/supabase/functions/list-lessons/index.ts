import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
Deno.serve(async (req) => {
  // Headers CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers,
    });
  }
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL"),
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),
    );
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }
    const token = authHeader.replace("Bearer ", "");
    supabase.auth.setSession({
      access_token: token,
      refresh_token: "",
    });
    const { data: user, error: userError } = await supabase.auth.getUser(token);
    if (userError || !user) throw new Error("Falha ao autenticar usuário");
    const { data, error } = await supabase.from("lesson_plans").select("*").eq(
      "user_id",
      user.user.id,
    ).order("created_at", {
      ascending: false,
    });
    return new Response(JSON.stringify(data), {
      status: 200,
      headers,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err.message,
      }),
      {
        status: 400,
        headers,
      },
    );
  }
});
