"use server";

import {
  subscribeToNewsletter,
  isEmailSubscribed,
} from "@/lib/repositories/newsletter";
import { logger, ValidationError, ConflictError, formatZodError } from "@/lib/errors";
import type { ApiResponse } from "@/lib/types";
import type { CreateNewsletterSubscriberInput } from "@/lib/schemas";
import { ZodError } from "zod";

/**
 * Server action to subscribe to newsletter
 */
export async function subscribeToNewsletterAction(
  input: CreateNewsletterSubscriberInput,
): Promise<ApiResponse<Awaited<ReturnType<typeof subscribeToNewsletter>>>> {
  try {
    const subscriber = await subscribeToNewsletter(input);
    
    logger.info("Newsletter subscription successful", {
      id: subscriber.id,
      email: subscriber.email,
    });
    
    return {
      success: true,
      data: subscriber,
    };
  } catch (error) {
    logger.error("Error in subscribeToNewsletterAction", error);
    
    if (error instanceof ZodError) {
      const validationErrors = formatZodError(error);
      return {
        success: false,
        error: "Validation failed",
        details: { validationErrors },
      };
    }
    
    if (error instanceof ValidationError) {
      return {
        success: false,
        error: error.message,
        details: { validationErrors: error.errors },
      };
    }
    
    if (error instanceof ConflictError) {
      return {
        success: false,
        error: error.message,
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to subscribe to newsletter",
    };
  }
}

/**
 * Server action to check if email is subscribed
 */
export async function checkEmailSubscriptionAction(
  email: string,
): Promise<ApiResponse<boolean>> {
  try {
    const isSubscribed = await isEmailSubscribed(email);
    return {
      success: true,
      data: isSubscribed,
    };
  } catch (error) {
    logger.error("Error in checkEmailSubscriptionAction", error, { email });
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to check subscription status",
    };
  }
}
