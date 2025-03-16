"use client";

import axios from "axios";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { formatINR } from "@/lib/formatINR";
import { useRouter } from "next/navigation";

export function InvestDialog({ open, onOpenChange, campaign }: any) {
  const [customAmount, setCustomAmount] = useState<any>("");
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 text-white border-slate-700 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">
            Invest in {campaign.title}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Choose an investment amount you want to contribute.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <div
              className={`p-4 border rounded-lg border-blue-500 bg-blue-500/10`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-white">Enter Amount</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white">₹</span>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                  }}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-none bg-slate-700 hover:bg-slate-700 text-white hover:text-white/75"
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              const response = await axios.post("/api/razorpay", {
                amount: customAmount,
              });
              const options = {
                key: process.env.RAZORPAY_KEY_ID,
                amount: response.data.amount,
                currency: "INR",
                name: "FundMe",
                description: `Funding for ${campaign.title}`,
                order_id: response.data.id,
                handler: async function (res: any) {
                  const verifyRes = await axios.post(`/api/razorpay/verify`, {
                    razorpay_order_id: res.razorpay_order_id,
                    razorpay_payment_id: res.razorpay_payment_id,
                    razorpay_signature: res.razorpay_signature,
                    campaign_id: campaign.id,
                    amount: customAmount,
                    campaign_creator_id: campaign.creator_id,
                  });

                  if (verifyRes.data.success) {
                    alert(
                      `Payment for ${formatINR(
                        customAmount
                      )} has been successfully made`
                    );
                    router.refresh();
                  } else {
                    alert("Payment failed!");
                  }
                },
              };

              const razorpay = new (window as any).Razorpay(options);
              razorpay.open();
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Confirm Investment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
