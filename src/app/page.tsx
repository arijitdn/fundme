import { Dashboard } from "@/components/Dashboard";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  const userData = await supabase
    .from("users")
    .select("*")
    .eq("email", data.user?.email);
  const campaigns = await supabase.from("campaigns").select("*");
  const stats = await supabase.from("stats").select("*");

  return (
    <Dashboard
      campaigns={campaigns!.data!}
      balance={userData!.data![0].balance.toString()}
      totalCampaigns={campaigns!.data!.length.toString()}
      totalInvested={stats!.data![0].total_invested.toString()}
      activeInvestors={stats!.data![0].investors.toString()}
      myInvestment={userData!.data![0].total_invested.toString()}
    />
  );
}
