import { prisma } from "@/lib/prisma";
import {
  handlePrismaError,
  ConflictError,
  NotFoundError,
  logger,
} from "@/lib/errors";
import {
  createNewsletterSubscriberSchema,
  type CreateNewsletterSubscriberInput,
} from "@/lib/schemas";

/**
 * Subscribe to newsletter with validation
 */
export async function subscribeToNewsletter(
  input: CreateNewsletterSubscriberInput,
) {
  try {
    logger.debug("Subscribing to newsletter", { email: input.email });
    
    // Validate input
    const validatedData = createNewsletterSubscriberSchema.parse(input);
    
    const subscriber = await prisma.newsletterSubscriber.create({
      data: validatedData,
    });
    
    logger.info("Subscribed to newsletter", {
      id: subscriber.id,
      email: subscriber.email,
    });
    
    return subscriber;
  } catch (error) {
    // Handle unique constraint violation
    if (
      error instanceof Error &&
      error.message.includes("Unique constraint")
    ) {
      throw new ConflictError("Email is already subscribed");
    }
    
    logger.error("Error subscribing to newsletter", error, {
      email: input.email,
    });
    throw handlePrismaError(error);
  }
}

/**
 * Unsubscribe from newsletter
 */
export async function unsubscribeFromNewsletter(email: string) {
  try {
    logger.debug("Unsubscribing from newsletter", { email });
    
    const subscriber = await prisma.newsletterSubscriber.delete({
      where: { email },
    });
    
    logger.info("Unsubscribed from newsletter", { email });
    return subscriber;
  } catch (error) {
    logger.error("Error unsubscribing from newsletter", error, { email });
    throw handlePrismaError(error);
  }
}

/**
 * Check if email is subscribed
 */
export async function isEmailSubscribed(email: string) {
  try {
    logger.debug("Checking if email is subscribed", { email });
    
    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });
    
    const isSubscribed = subscriber !== null;
    logger.debug("Email subscription status", { email, isSubscribed });
    
    return isSubscribed;
  } catch (error) {
    logger.error("Error checking email subscription", error, { email });
    throw handlePrismaError(error);
  }
}

/**
 * Get all newsletter subscribers
 */
export async function getAllNewsletterSubscribers() {
  try {
    logger.debug("Fetching all newsletter subscribers");
    
    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    
    logger.info(`Fetched ${subscribers.length} newsletter subscribers`);
    return subscribers;
  } catch (error) {
    logger.error("Error fetching newsletter subscribers", error);
    throw handlePrismaError(error);
  }
}

/**
 * Get newsletter subscriber by email
 */
export async function getNewsletterSubscriberByEmail(email: string) {
  try {
    logger.debug("Fetching newsletter subscriber by email", { email });
    
    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });
    
    if (!subscriber) {
      throw new NotFoundError("Newsletter subscriber");
    }
    
    logger.info("Fetched newsletter subscriber", { email });
    return subscriber;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    logger.error("Error fetching newsletter subscriber", error, { email });
    throw handlePrismaError(error);
  }
}

/**
 * Get subscriber count
 */
export async function getSubscriberCount() {
  try {
    logger.debug("Fetching subscriber count");
    
    const count = await prisma.newsletterSubscriber.count();
    
    logger.info(`Total subscribers: ${count}`);
    return count;
  } catch (error) {
    logger.error("Error fetching subscriber count", error);
    throw handlePrismaError(error);
  }
}
