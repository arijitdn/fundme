"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { formatINR } from "@/lib/formatINR";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { InvestDialog } from "./InvestDialog";

export function CampaignCard({ campaign }: any) {
  const [showInvestDialog, setShowInvestDialog] = useState(false);

  const getStatusColor = (status: any) => {
    switch (status) {
      case "active":
        return "bg-green-500 text-green-50";
      case "completed":
        return "bg-blue-500 text-blue-50";
      case "draft":
        return "bg-slate-500 text-slate-50";
      default:
        return "bg-slate-500 text-slate-50";
    }
  };

  return (
    <>
      <Card className="bg-slate-800 border-slate-700 overflow-hidden">
        <div className="h-40 bg-slate-700 relative">
          <img
            src={campaign.image || "/placeholder.svg?height=160&width=320"}
            alt={campaign.title}
            className="w-full h-full object-cover"
          />
          <Badge
            className={`absolute top-2 right-2 ${getStatusColor(
              campaign.status
            )} hover:bg-${getStatusColor(campaign.status)}`}
          >
            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
          </Badge>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-slate-200">{campaign.title}</CardTitle>
          <CardDescription className="text-slate-400">
            by {campaign.creator}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Raised</span>
              <span className="text-white font-medium">
                {formatINR(parseFloat(campaign.raised))} of{" "}
                {formatINR(parseFloat(campaign.goal))}
              </span>
            </div>
            <Progress
              value={(campaign.raised / campaign.goal) * 100}
              className="h-2 bg-slate-700"
            />
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-slate-400">Investors</p>
              <p className="text-white font-medium">{campaign.investors}</p>
            </div>
            <div>
              <p className="text-slate-400">Days</p>
              <p className="text-white font-medium">{campaign.duration}</p>
            </div>
            <div>
              <p className="text-slate-400">Category</p>
              <p className="text-white font-medium">{campaign.category}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            onClick={() => setShowInvestDialog(true)}
          >
            Invest Now
          </Button>
          <Button
            variant="outline"
            className="bg-slate-600 border-none hover:bg-slate-700 text-white hover:text-white/95"
          >
            Details
          </Button>
        </CardFooter>
      </Card>

      <InvestDialog
        open={showInvestDialog}
        onOpenChange={setShowInvestDialog}
        campaign={campaign}
      />
    </>
  );
}
