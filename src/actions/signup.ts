"use server";

import { z } from "zod";
import { authFormSchema } from "@/lib/schema";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function signup(values: z.infer<typeof authFormSchema>) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp(values);

  if (error) {
    redirect("/error");
  }

  const newUser = await supabase
    .from("users")
    .insert([
      {
        username: values.username,
        email: values.email,
      },
    ])
    .select();

  redirect("/");
}
