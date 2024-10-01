"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { messageSchema } from "@/schemas/messageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

function page({ params }: { params: { username: string } }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });
  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/send-message", {
        username: params.username,
        content: data.content,
      });
      toast({
        title: "Message Send successfully",
        description: response.data.message.toString(),
      });
      setIsSubmitting(false);
    } catch (error) {
      console.log("Error while Sending message", error);
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error while Sending message",
        description:
          axiosError.response?.data.message ?? "Error while Sending message",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };
  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl ">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Public Profile link</h1>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">
          Send anonyms message to @{params.username}
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              name="content"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center">
                      <Textarea
                        placeholder="Write your anonyms message here."
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mb-10 text-center">
              <Button type="submit" className="" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Send It"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <hr />
      <div className="mt-10 mb-4 text-center">
        <h3 className="text-xl font-medium mb-2">Get Your Message Board </h3>
        <Button type="button">Create Your Account</Button>
      </div>
    </div>
  );
}

export default page;
