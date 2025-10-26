"use server";

import { createContactSubmission } from "@/lib/repositories/contact";
import { logger, ValidationError, formatZodError } from "@/lib/errors";
import type { ApiResponse } from "@/lib/types";
import type { CreateContactSubmissionInput } from "@/lib/schemas";
import { ZodError } from "zod";

/**
 * Server action to submit a contact form
 */
export async function submitContactFormAction(
  input: CreateContactSubmissionInput,
): Promise<ApiResponse<Awaited<ReturnType<typeof createContactSubmission>>>> {
  try {
    const submission = await createContactSubmission(input);
    
    logger.info("Contact form submitted successfully", {
      id: submission.id,
      email: submission.email,
    });
    
    return {
      success: true,
      data: submission,
    };
  } catch (error) {
    logger.error("Error in submitContactFormAction", error);
    
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
    
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to submit contact form",
    };
  }
}
