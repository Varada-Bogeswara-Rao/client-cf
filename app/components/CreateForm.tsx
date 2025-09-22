"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./UI/form";
import { Input } from "./UI/input";
import { Textarea } from "./UI/textarea";
import { toast } from "sonner";
import { sendTransaction, prepareContractCall, } from "thirdweb";
import { crowdfundContract } from "@/lib/contract";
import { useActiveAccount } from "thirdweb/react";
import { uploadCampaignMetadata } from "@/lib/uploadCampaign";

// Zod validation schema
const createCampaignSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  goal: z.coerce.number().positive("Goal must be positive"),
  duration: z.coerce.number().positive("Duration must be positive"),
  image: z.string().url("Must be a valid image URL").min(1, "Image is required"),
});

type CreateCampaignFormValues = z.infer<typeof createCampaignSchema>;

export default function CreateForm() {
  const account = useActiveAccount();

  const form = useForm<CreateCampaignFormValues>({
    resolver: zodResolver(createCampaignSchema),
    defaultValues: {
      name: "",
      title: "",
      description: "",
      goal: undefined,
      duration: undefined,
      image: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = async (values: CreateCampaignFormValues) => {
    if (!account) {
      console.log("Wallet not connected, toast should appear.");
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      // Upload metadata
      const metadata = {
        name: values.name,
        title: values.title,
        description: values.description,
        image: values.image,
        createdAt: new Date().toISOString(),
      };

      const metadataURI = await uploadCampaignMetadata(metadata);
      console.log(metadataURI);

      toast.success("Campaign metadata uploaded!", {
        description: metadataURI,
      });

      // Convert duration to seconds and goal to wei
      const durationSeconds = BigInt(values.duration * 86400);
      const goalInWei = BigInt(Math.floor(values.goal * 1e18));

      console.log("Ready to send tx:", { metadataURI, goalInWei, durationSeconds });

      // Prepare contract call
      const tx = prepareContractCall({
        contract: crowdfundContract,
        method: `function createCampaign(string,uint256,uint256)`,
        params: [metadataURI, goalInWei, durationSeconds],
      });

      // Send transaction
      const { transactionHash } = await sendTransaction({
        transaction: tx,
        account,
      });

      toast("Transaction submitted!", {
        description: `Tx hash: ${transactionHash}`,
      });

      // Wait for confirmation
      // const receipt = await crowdfundContract.contractWrapper.readContract.provider.waitForTransaction(transactionHash);
      // need to ad reciept to get the blocknumber(reciept.blocknumber)

      toast.success("Campaign created successfully!", {
        description: ` Tx: ${transactionHash}`,
      });
    } catch (error: any) {
      if (error.name === "UserRejectedRequestError") {
        toast.error("Transaction cancelled by user.");
      } else if (error.message) {
        toast.error("Failed to create campaign", {
          description: error.message,
        });
      } else {
        toast.error("Failed to create campaign", {
          description: "Unknown error",
        });
      }
      console.error(error); // Always log the full error for debugging
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-6 border border-gray-700 rounded-xl bg-black/40"
        suppressHydrationWarning
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campaign Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter campaign title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter campaign description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Goal */}
        <FormField
          control={form.control}
          name="goal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal (in ETH)</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="Enter campaign goal" min={0} step={0.01} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Duration */}
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (in Days)</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="Enter duration in days" min={1} step={1} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campaign Image</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://..." type="url" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded-lg"
          suppressHydrationWarning
        >
          Create Campaign
        </button>
      </form>
    </Form>
  );
}
