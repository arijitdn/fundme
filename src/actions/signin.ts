"use server";

import { z } from "zod";
import { authFormSchema } from "@/lib/schema";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function signin(values: z.infer<typeof authFormSchema>) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(values);

  if (error) {
    redirect(`/error?message=${error.message}`);
  }

  redirect("/");
}
