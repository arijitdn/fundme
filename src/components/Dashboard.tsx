"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatINR } from "@/lib/formatINR";
import { CampaignCard } from "./CampaignCard";
import { NewCampaignDialog } from "./NewCampaignDialog";

export const Dashboard = ({
  campaigns,
  totalCampaigns,
  totalInvested,
  activeInvestors,
  myInvestment,
  balance,
}: {
  campaigns: any[];
  totalCampaigns: string;
  totalInvested: string;
  activeInvestors: string;
  myInvestment: string;
  balance: string;
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const [showNewCampaignDialog, setShowNewCampaignDialog] = useState(false);

  return (
    <div>
      <div className="flex min-h-screen bg-[#1a2035] w-full text-white">
        <div className="flex-1">
          <header className="border-b border-slate-800 bg-[#1a2035] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold">Dashboard</h1>
              </div>
              <div className="flex items-center gap-4">
                <h2 className="font-semibold">
                  Balance: {formatINR(parseFloat(balance))}
                </h2>
                <h2 className="font-semibold">
                  My Investment: {formatINR(parseFloat(myInvestment))}
                </h2>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    type="search"
                    placeholder="Search campaigns..."
                    className="w-[250px] bg-slate-800 pl-8 text-white border-slate-700 focus-visible:ring-blue-500"
                  />
                </div>
                <Button
                  onClick={() => setShowNewCampaignDialog(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="mr-2 h-4 w-4" /> New Campaign
                </Button>
              </div>
            </div>
          </header>

          <main className="p-6">
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-200">
                    Total Campaigns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">
                    {totalCampaigns}
                  </div>
                  <p className="text-sm text-slate-400">
                    +{totalCampaigns} from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-200">
                    Total Invested
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">
                    {formatINR(parseFloat(totalInvested))}
                  </div>
                  <p className="text-sm text-slate-400">
                    +{formatINR(parseFloat(totalInvested))} from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-200">
                    Total Investments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">
                    {activeInvestors}
                  </div>
                  <p className="text-sm text-slate-400">
                    +{activeInvestors} from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs
              defaultValue="all"
              className="mb-8"
              onValueChange={setActiveTab}
            >
              <div className="flex items-center justify-between mb-4">
                <TabsList className="bg-slate-800">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-blue-600"
                  >
                    All Campaigns
                  </TabsTrigger>
                  <TabsTrigger
                    value="active"
                    className="data-[state=active]:bg-blue-600"
                  >
                    Active
                  </TabsTrigger>
                  <TabsTrigger
                    value="completed"
                    className="data-[state=active]:bg-blue-600"
                  >
                    Completed
                  </TabsTrigger>
                  <TabsTrigger
                    value="draft"
                    className="data-[state=active]:bg-blue-600"
                  >
                    Drafts
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {campaigns.map((campaign) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="active" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {campaigns
                    .filter((campaign) => campaign.status === "active")
                    .map((campaign) => (
                      <CampaignCard key={campaign.id} campaign={campaign} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {campaigns
                    .filter((campaign) => campaign.status === "completed")
                    .map((campaign) => (
                      <CampaignCard key={campaign.id} campaign={campaign} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="draft" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {campaigns
                    .filter((campaign) => campaign.status === "draft")
                    .map((campaign) => (
                      <CampaignCard key={campaign.id} campaign={campaign} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>

      <NewCampaignDialog
        open={showNewCampaignDialog}
        onOpenChange={setShowNewCampaignDialog}
      />
    </div>
  );
};
