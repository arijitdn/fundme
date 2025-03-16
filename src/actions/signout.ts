"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function signout() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  redirect("/auth/login");
}
