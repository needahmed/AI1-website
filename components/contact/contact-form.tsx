"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContactSubmissionSchema, type CreateContactSubmissionInput } from "@/lib/schemas";
import { submitContactFormAction } from "@/lib/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Loader2, CheckCircle2, Send } from "lucide-react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<CreateContactSubmissionInput>({
    resolver: zodResolver(createContactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      projectType: "WEB_DEVELOPMENT",
      budgetRange: "RANGE_10K_25K",
      message: "",
    },
  });

  const onSubmit = async (data: CreateContactSubmissionInput) => {
    setIsSubmitting(true);

    try {
      const result = await submitContactFormAction(data);

      if (result.success) {
        setIsSuccess(true);
        toast.success("Thank you for reaching out!", {
          description: "We'll get back to you within 6 hours.",
          duration: 5000,
        });
        form.reset();
      } else {
        toast.error("Failed to submit form", {
          description: result.error || "Please try again.",
        });
      }
    } catch (error) {
      toast.error("An error occurred", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-border bg-muted/50 p-12 text-center">
        <CheckCircle2 className="h-16 w-16 text-green-500" />
        <h3 className="text-2xl font-bold">Thank You!</h3>
        <p className="max-w-md text-muted-foreground">
          We've received your inquiry and our team will get back to you within 6 hours during
          business hours.
        </p>
        <Button
          onClick={() => setIsSuccess(false)}
          variant="outline"
          className="mt-4"
        >
          Submit Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name *</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Company */}
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Project Type */}
          <FormField
            control={form.control}
            name="projectType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Type *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a project type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="WEB_DEVELOPMENT">Web Development</SelectItem>
                    <SelectItem value="MOBILE_APP">Mobile App</SelectItem>
                    <SelectItem value="ECOMMERCE">E-commerce</SelectItem>
                    <SelectItem value="BRANDING">Branding</SelectItem>
                    <SelectItem value="CONSULTATION">Consultation</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Budget Range */}
          <FormField
            control={form.control}
            name="budgetRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget Range *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a budget range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="UNDER_5K">Under $5,000</SelectItem>
                    <SelectItem value="RANGE_5K_10K">$5,000 - $10,000</SelectItem>
                    <SelectItem value="RANGE_10K_25K">$10,000 - $25,000</SelectItem>
                    <SelectItem value="RANGE_25K_50K">$25,000 - $50,000</SelectItem>
                    <SelectItem value="ABOVE_50K">Above $50,000</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your project..."
                  className="min-h-[150px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Please provide as much detail as possible about your project (minimum 10 characters).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="flex items-center justify-between rounded-lg border border-border bg-muted/50 p-6">
          <div className="flex-1">
            <p className="text-sm font-medium">⚡ 6-Hour Response Guarantee</p>
            <p className="text-xs text-muted-foreground">
              We'll get back to you within 6 hours during business hours
            </p>
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="ml-4"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
