import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Create demo admin user
  const { data: userData, error: createError } = await supabase.auth.admin.createUser({
    email: "demo@admin.com",
    password: "Demo@123",
    email_confirm: true,
    user_metadata: { full_name: "Demo Admin" },
  });

  if (createError) {
    return new Response(JSON.stringify({ error: createError.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Assign admin role
  const { error: roleError } = await supabase
    .from("user_roles")
    .insert({ user_id: userData.user.id, role: "admin" });

  if (roleError) {
    return new Response(JSON.stringify({ error: roleError.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({ success: true, user_id: userData.user.id }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
});
