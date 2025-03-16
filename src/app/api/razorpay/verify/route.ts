import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      campaign_id,
      campaign_creator_id,
      amount,
    } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error) {
      return Response.json({
        success: false,
        error: "Unauthenticated",
      });
    }

    if (!data.user) {
      return Response.json({
        success: false,
        error: "Unauthenticated",
      });
    }

    // Create HMAC SHA256 signature
    const generatedSignature = crypto
      .createHmac("sha256", keySecret!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      const { data: campaignData } = await supabase
        .from("campaigns")
        .select("*")
        .eq("id", campaign_id);

      const { data: statsData } = await supabase
        .from("stats")
        .select("*")
        .eq("id", 1);

      const { data: userData } = await supabase
        .from("users")
        .select("*")
        .eq("email", data.user.email);

      await supabase
        .from("campaigns")
        .update({
          investors: parseInt(campaignData![0].investors) + 1,
          raised: parseFloat(campaignData![0].raised) + parseFloat(amount),
        })
        .eq("id", campaign_id);

      await supabase
        .from("stats")
        .update({
          investors: parseInt(statsData![0].investors) + 1,
          total_invested:
            parseFloat(statsData![0].total_invested) + parseFloat(amount),
        })
        .eq("id", 1);

      await supabase
        .from("users")
        .update({
          total_invested:
            parseFloat(userData![0].total_invested) + parseFloat(amount),
        })
        .eq("email", data.user.email);

      const amountToBeDeducted = (parseFloat(amount) * 2) / 100;
      const creditAmount = parseInt(amount) - amountToBeDeducted;

      const creditUser = await supabase
        .from("users")
        .select("*")
        .eq("id", campaign_creator_id);

      if (creditUser.data) {
        await supabase
          .from("users")
          .update({
            balance: parseFloat(creditUser.data[0].balance) + creditAmount,
          })
          .eq("id", campaign_creator_id);
      }

      return Response.json(
        { success: true, message: "Payment Verified" },
        { status: 200 }
      );
    } else {
      return Response.json(
        { success: false, message: "Invalid Signature" },
        { status: 400 }
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return Response.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
