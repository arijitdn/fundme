"use client";

import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { z } from "zod";
import { campaignSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { createCampaign } from "@/actions/createCampaign";
import { useRouter } from "next/navigation";

export function NewCampaignDialog({ open, onOpenChange }: any) {
  const [category, setCategory] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof campaignSchema>>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
    },
  });

  const formSubmit = async (values: z.infer<typeof campaignSchema>) => {
    if (!category) {
      alert("Please select a category.");
      return;
    }

    const data = await createCampaign({
      values: {
        title: values.title,
        description: values.description,
        image: values.image,
        category,
        duration: values.duration,
        goal: values.goal,
      },
    });

    if (data.success) {
      router.refresh();
    } else {
      alert(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-slate-800 text-white border-slate-700 sm:max-w-[600px] max-h-[95vh] overflow-scroll no-scrollbar">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">
              Create New Campaign
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Fill in the details to create your new crowdfunding campaign.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-white">
                Campaign Title
              </Label>
              <Input
                id="title"
                placeholder="Enter campaign title"
                className="bg-slate-700 border-slate-600 text-white"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-red-600">{errors.title.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-white">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe your campaign"
                className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-600">{errors.description.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image" className="text-white">
                Campaign Image
              </Label>
              <Input
                id="image"
                placeholder="Enter campaign image url"
                className="bg-slate-700 border-slate-600 text-white"
                {...register("image")}
              />
              {errors.image && (
                <p className="text-red-600">{errors.image.message}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="goal" className="text-white">
                  Funding Goal (₹)
                </Label>
                <Input
                  id="goal"
                  type="number"
                  placeholder="10000"
                  className="bg-slate-700 border-slate-600 text-white"
                  {...register("goal")}
                />
                {errors.goal && (
                  <p className="text-red-600">{errors.goal.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration" className="text-white">
                  Duration (days)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="30"
                  className="bg-slate-700 border-slate-600 text-white"
                  {...register("duration")}
                />
                {errors.duration && (
                  <p className="text-red-600">{errors.duration.message}</p>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category" className="text-white">
                Category
              </Label>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value)}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600 text-white">
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-red-600">{errors.category.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="bg-slate-600 border-none hover:bg-slate-700 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(formSubmit)}
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? "Creating..." : "Create Campaign"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
