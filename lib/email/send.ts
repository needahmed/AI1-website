"use server";

import { resend, AGENCY_EMAIL, FROM_EMAIL } from "./resend";
import { getConfirmationEmailHtml, getNotificationEmailHtml } from "./templates";
import type { ContactSubmission } from "@prisma/client";
import { logger } from "@/lib/errors";

export interface SendContactEmailsResult {
  confirmationSent: boolean;
  notificationSent: boolean;
  errors: string[];
}

/**
 * Send confirmation email to the user and notification to the agency
 */
export async function sendContactEmails(
  submission: Omit<ContactSubmission, "status">
): Promise<SendContactEmailsResult> {
  const result: SendContactEmailsResult = {
    confirmationSent: false,
    notificationSent: false,
    errors: [],
  };

  if (!resend) {
    const error = "Email service is not configured. Please set RESEND_API_KEY.";
    logger.warn(error);
    result.errors.push(error);
    return result;
  }

  // Send confirmation email to user
  try {
    const confirmationHtml = getConfirmationEmailHtml(submission.name);

    await resend.emails.send({
      from: FROM_EMAIL,
      to: submission.email,
      subject: "Thank You for Contacting AI1 - We'll Respond Within 6 Hours!",
      html: confirmationHtml,
    });

    result.confirmationSent = true;
    logger.info("Confirmation email sent to user", { email: submission.email });
  } catch (error) {
    const errorMsg = `Failed to send confirmation email: ${error instanceof Error ? error.message : "Unknown error"}`;
    logger.error(errorMsg, error);
    result.errors.push(errorMsg);
  }

  // Send notification email to agency
  try {
    const notificationHtml = getNotificationEmailHtml(submission);

    await resend.emails.send({
      from: FROM_EMAIL,
      to: AGENCY_EMAIL,
      subject: `🎯 New Contact Form Submission from ${submission.name}`,
      html: notificationHtml,
      replyTo: submission.email,
    });

    result.notificationSent = true;
    logger.info("Notification email sent to agency", { agencyEmail: AGENCY_EMAIL });
  } catch (error) {
    const errorMsg = `Failed to send notification email: ${error instanceof Error ? error.message : "Unknown error"}`;
    logger.error(errorMsg, error);
    result.errors.push(errorMsg);
  }

  return result;
}
