"use server";

import { z } from "zod";
import { campaignSchema } from "@/lib/schema";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createCampaign({
  values,
}: {
  values: z.infer<typeof campaignSchema>;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!data.user) {
    redirect(`/error?message=${error?.message}`);
  }

  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("email", data.user.email);

  if (!userData) {
    redirect(`/error?message=Something went wrong`);
  }

  const newCampaign = await supabase
    .from("campaigns")
    .insert([
      {
        title: values.title,
        description: values.description,
        image: values.image,
        goal: parseFloat(values.goal),
        duration: parseInt(values.duration),
        category: values.category,
        creator_id: userData[0].id,
        creator: userData[0].username,
      },
    ])
    .select();

  if (newCampaign.data) {
    return {
      success: true,
    };
  } else {
    return {
      success: false,
      error: newCampaign.error.message,
    };
  }
}
