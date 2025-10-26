import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
  isEmailSubscribed,
  getAllNewsletterSubscribers,
  getNewsletterSubscriberByEmail,
  getSubscriberCount,
} from "../newsletter";
import { ConflictError, NotFoundError } from "@/lib/errors";

// Mock Prisma
vi.mock("@/lib/prisma", () => ({
  prisma: {
    newsletterSubscriber: {
      create: vi.fn(),
      delete: vi.fn(),
      findUnique: vi.fn(),
      findMany: vi.fn(),
      count: vi.fn(),
    },
  },
}));

import { prisma } from "@/lib/prisma";

describe("Newsletter Repository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("subscribeToNewsletter", () => {
    it("should subscribe a new email", async () => {
      const input = {
        email: "test@example.com",
        source: "homepage",
      };

      const mockSubscriber = {
        id: "1",
        email: "test@example.com",
        source: "homepage",
        createdAt: new Date(),
      };

      vi.mocked(prisma.newsletterSubscriber.create).mockResolvedValue(mockSubscriber);

      const result = await subscribeToNewsletter(input);

      expect(result).toEqual(mockSubscriber);
      expect(prisma.newsletterSubscriber.create).toHaveBeenCalledWith({
        data: input,
      });
    });

    it("should reject invalid email", async () => {
      const input = {
        email: "invalid-email",
      };

      await expect(subscribeToNewsletter(input)).rejects.toThrow();
    });

    it("should throw ConflictError if email already exists", async () => {
      const input = {
        email: "existing@example.com",
      };

      const error = new Error("Unique constraint failed on the fields: (`email`)");
      vi.mocked(prisma.newsletterSubscriber.create).mockRejectedValue(error);

      await expect(subscribeToNewsletter(input)).rejects.toThrow(ConflictError);
    });
  });

  describe("isEmailSubscribed", () => {
    it("should return true if email is subscribed", async () => {
      const mockSubscriber = {
        id: "1",
        email: "subscribed@example.com",
        source: null,
        createdAt: new Date(),
      };

      vi.mocked(prisma.newsletterSubscriber.findUnique).mockResolvedValue(mockSubscriber);

      const result = await isEmailSubscribed("subscribed@example.com");

      expect(result).toBe(true);
    });

    it("should return false if email is not subscribed", async () => {
      vi.mocked(prisma.newsletterSubscriber.findUnique).mockResolvedValue(null);

      const result = await isEmailSubscribed("notsubscribed@example.com");

      expect(result).toBe(false);
    });
  });

  describe("unsubscribeFromNewsletter", () => {
    it("should unsubscribe an email", async () => {
      const mockSubscriber = {
        id: "1",
        email: "test@example.com",
        source: null,
        createdAt: new Date(),
      };

      vi.mocked(prisma.newsletterSubscriber.delete).mockResolvedValue(mockSubscriber);

      const result = await unsubscribeFromNewsletter("test@example.com");

      expect(result).toEqual(mockSubscriber);
      expect(prisma.newsletterSubscriber.delete).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
    });
  });

  describe("getAllNewsletterSubscribers", () => {
    it("should fetch all subscribers", async () => {
      const mockSubscribers = [
        {
          id: "1",
          email: "subscriber1@example.com",
          source: "homepage",
          createdAt: new Date(),
        },
        {
          id: "2",
          email: "subscriber2@example.com",
          source: "blog",
          createdAt: new Date(),
        },
      ];

      vi.mocked(prisma.newsletterSubscriber.findMany).mockResolvedValue(mockSubscribers);

      const result = await getAllNewsletterSubscribers();

      expect(result).toEqual(mockSubscribers);
      expect(prisma.newsletterSubscriber.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: "desc" },
      });
    });
  });

  describe("getNewsletterSubscriberByEmail", () => {
    it("should fetch a subscriber by email", async () => {
      const mockSubscriber = {
        id: "1",
        email: "test@example.com",
        source: "homepage",
        createdAt: new Date(),
      };

      vi.mocked(prisma.newsletterSubscriber.findUnique).mockResolvedValue(mockSubscriber);

      const result = await getNewsletterSubscriberByEmail("test@example.com");

      expect(result).toEqual(mockSubscriber);
    });

    it("should throw NotFoundError if subscriber does not exist", async () => {
      vi.mocked(prisma.newsletterSubscriber.findUnique).mockResolvedValue(null);

      await expect(getNewsletterSubscriberByEmail("notfound@example.com")).rejects.toThrow(NotFoundError);
    });
  });

  describe("getSubscriberCount", () => {
    it("should return the count of subscribers", async () => {
      vi.mocked(prisma.newsletterSubscriber.count).mockResolvedValue(42);

      const result = await getSubscriberCount();

      expect(result).toBe(42);
      expect(prisma.newsletterSubscriber.count).toHaveBeenCalled();
    });
  });
});
