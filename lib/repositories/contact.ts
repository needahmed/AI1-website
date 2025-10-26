import { prisma } from "@/lib/prisma";
import { SubmissionStatus } from "@prisma/client";
import {
  handlePrismaError,
  NotFoundError,
  logger,
} from "@/lib/errors";
import {
  createContactSubmissionSchema,
  type CreateContactSubmissionInput,
} from "@/lib/schemas";

/**
 * Create a new contact submission with validation
 */
export async function createContactSubmission(
  input: CreateContactSubmissionInput,
) {
  try {
    logger.debug("Creating contact submission", { email: input.email });
    
    // Validate input
    const validatedData = createContactSubmissionSchema.parse(input);
    
    const submission = await prisma.contactSubmission.create({
      data: {
        ...validatedData,
        status: "PENDING",
      },
    });
    
    logger.info("Created contact submission", {
      id: submission.id,
      email: submission.email,
    });
    
    return submission;
  } catch (error) {
    logger.error("Error creating contact submission", error, {
      email: input.email,
    });
    throw handlePrismaError(error);
  }
}

/**
 * Get contact submissions by status
 */
export async function getContactSubmissionsByStatus(status: SubmissionStatus) {
  try {
    logger.debug("Fetching contact submissions by status", { status });
    
    const submissions = await prisma.contactSubmission.findMany({
      where: {
        status,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    
    logger.info(`Fetched ${submissions.length} submissions with status ${status}`);
    return submissions;
  } catch (error) {
    logger.error("Error fetching contact submissions by status", error, {
      status,
    });
    throw handlePrismaError(error);
  }
}

/**
 * Get all contact submissions
 */
export async function getAllContactSubmissions() {
  try {
    logger.debug("Fetching all contact submissions");
    
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    
    logger.info(`Fetched ${submissions.length} contact submissions`);
    return submissions;
  } catch (error) {
    logger.error("Error fetching all contact submissions", error);
    throw handlePrismaError(error);
  }
}

/**
 * Get contact submission by ID
 */
export async function getContactSubmissionById(id: string) {
  try {
    logger.debug("Fetching contact submission by ID", { id });
    
    const submission = await prisma.contactSubmission.findUnique({
      where: { id },
    });
    
    if (!submission) {
      throw new NotFoundError("Contact submission");
    }
    
    logger.info("Fetched contact submission", { id });
    return submission;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    logger.error("Error fetching contact submission by ID", error, { id });
    throw handlePrismaError(error);
  }
}

/**
 * Update contact submission status
 */
export async function updateContactSubmissionStatus(
  id: string,
  status: SubmissionStatus,
) {
  try {
    logger.debug("Updating contact submission status", { id, status });
    
    const submission = await prisma.contactSubmission.update({
      where: { id },
      data: { status },
    });
    
    logger.info("Updated contact submission status", { id, status });
    return submission;
  } catch (error) {
    logger.error("Error updating contact submission status", error, {
      id,
      status,
    });
    throw handlePrismaError(error);
  }
}

/**
 * Delete contact submission
 */
export async function deleteContactSubmission(id: string) {
  try {
    logger.debug("Deleting contact submission", { id });
    
    const submission = await prisma.contactSubmission.delete({
      where: { id },
    });
    
    logger.info("Deleted contact submission", { id });
    return submission;
  } catch (error) {
    logger.error("Error deleting contact submission", error, { id });
    throw handlePrismaError(error);
  }
}
