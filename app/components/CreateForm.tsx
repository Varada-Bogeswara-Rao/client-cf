"use client";

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "./UI/form"
import { Input } from "./UI/input"
import { Button } from "./UI/button"
import { Textarea } from "./UI/textarea";
import { HoverBorderGradient } from "./UI/hover-border-gradient";
import { title } from "process";
import { uploadCampaignMetadata } from "@/lib/uploadCampaign";
import { toast } from "sonner";



// ZOD schema

const createCampaignSchema = z.object({
  name: z.string().min(1, "name is required "),
  title: z.string().min(5, "title must be atleast 5 characters"),
  description: z.string().min(10, "Description must be atleast 10 characters"),
  goal: z.coerce.number().positive("Goal must be positive"),
  duration: z.coerce.number().positive("Duration must be positive"),
  image: z.string().url("Must be a valid image URL").min(1, "Image is required")
  ,
})
type createCampaignFormValues = z.infer<typeof createCampaignSchema>;

export default function CreateForm() {
  const form = useForm<createCampaignFormValues>({
    resolver: zodResolver(createCampaignSchema),
    defaultValues: {
      name: "",
      title: "",
      description: "",
      goal: undefined,
      duration: undefined,
      image: ""
    },
    mode: "onSubmit",        // only validate on submit
    reValidateMode: "onChange" // revalidate after a failed submit
  })
  const onSubmit = async (values: createCampaignFormValues) => {
    try {
      const metadata = {
        name: values.name,
        title: values.title,
        description: values.description,
        image: values.image,
        createdAt: new Date().toISOString(),
      };

      const metadataURI = await uploadCampaignMetadata(metadata);
      toast.success("Campaign metadata uploaded!", {
        description: metadataURI,
      });
      const deadline = Math.floor(Date.now() / 1000) + values.duration * 86400;

      console.log("Ready to send tx with:", {
        metadataURI,
        goal: values.goal,
        deadline,
      });
      // TODO: call smart contract with goal, deadline, metadataURI
    } catch (error: any) {
      toast.error("Failed to create campaign", {
        description: error.message ?? "Unknown error",
      });
    }
  };
  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6 border border-gray-700 rounded-xl bg-black/40">
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
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter campaign goal"
                  min={0}
                  step={0.01}
                />
              </FormControl>
              <FormMessage className="text-sm text-red-500 min-h-[1.25rem]" />
            </FormItem>
          )}
        />
        {/* Duration*/}
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (in Days)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter campaign duration in Day's"
                  min={1}
                  step={1}
                />
              </FormControl>
              <FormMessage className="text-sm text-red-500 min-h-[1.25rem]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campaign Image</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="https://..."
                  type="url"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          className="px-4 py-1 bg-black text-white rounded-lg"
        >
          Create Campaign
        </button>




      </form>
    </Form >
  )
}