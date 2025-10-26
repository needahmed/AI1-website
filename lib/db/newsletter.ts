import { prisma } from "@/lib/prisma";

export async function subscribeToNewsletter(email: string, source?: string) {
  try {
    return await prisma.newsletterSubscriber.create({
      data: {
        email,
        source,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      throw new Error("Email is already subscribed");
    }
    throw error;
  }
}

export async function unsubscribeFromNewsletter(email: string) {
  return prisma.newsletterSubscriber.delete({
    where: {
      email,
    },
  });
}

export async function isEmailSubscribed(email: string) {
  const subscriber = await prisma.newsletterSubscriber.findUnique({
    where: {
      email,
    },
  });
  return subscriber !== null;
}

export async function getAllNewsletterSubscribers() {
  return prisma.newsletterSubscriber.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}
