import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  AppError,
  ValidationError,
  NotFoundError,
  ConflictError,
  DatabaseError,
  formatZodError,
  handlePrismaError,
  logger,
} from "../index";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

describe("Error Classes", () => {
  describe("AppError", () => {
    it("should create an error with message and status code", () => {
      const error = new AppError("Test error", 500);
      expect(error.message).toBe("Test error");
      expect(error.statusCode).toBe(500);
      expect(error.name).toBe("AppError");
    });

    it("should default to status code 500", () => {
      const error = new AppError("Test error");
      expect(error.statusCode).toBe(500);
    });
  });

  describe("ValidationError", () => {
    it("should create a validation error with errors object", () => {
      const errors = { email: ["Invalid email"] };
      const error = new ValidationError("Validation failed", errors);
      expect(error.message).toBe("Validation failed");
      expect(error.statusCode).toBe(400);
      expect(error.code).toBe("VALIDATION_ERROR");
      expect(error.errors).toEqual(errors);
    });
  });

  describe("NotFoundError", () => {
    it("should create a not found error", () => {
      const error = new NotFoundError("User");
      expect(error.message).toBe("User not found");
      expect(error.statusCode).toBe(404);
      expect(error.code).toBe("NOT_FOUND");
    });
  });

  describe("ConflictError", () => {
    it("should create a conflict error", () => {
      const error = new ConflictError("Resource already exists");
      expect(error.message).toBe("Resource already exists");
      expect(error.statusCode).toBe(409);
      expect(error.code).toBe("CONFLICT");
    });
  });

  describe("DatabaseError", () => {
    it("should create a database error", () => {
      const error = new DatabaseError("Connection failed");
      expect(error.message).toBe("Connection failed");
      expect(error.statusCode).toBe(500);
      expect(error.code).toBe("DATABASE_ERROR");
    });
  });
});

describe("formatZodError", () => {
  it("should format Zod errors into a structured object", () => {
    // Create a simple Zod schema and parse invalid data to get a real ZodError
    const { z } = require("zod");
    const schema = z.object({
      email: z.string().min(1).email(),
    });
    
    try {
      schema.parse({ email: "" });
    } catch (error) {
      if (error instanceof ZodError) {
        const formatted = formatZodError(error);
        expect(formatted).toHaveProperty("email");
        expect(formatted.email.length).toBeGreaterThan(0);
      }
    }
  });

  it("should handle nested paths", () => {
    const { z } = require("zod");
    const schema = z.object({
      user: z.object({
        profile: z.object({
          name: z.string(),
        }),
      }),
    });
    
    try {
      schema.parse({ user: { profile: {} } });
    } catch (error) {
      if (error instanceof ZodError) {
        const formatted = formatZodError(error);
        expect(formatted).toHaveProperty("user.profile.name");
      }
    }
  });
});

describe("handlePrismaError", () => {
  it("should handle P2002 (unique constraint) error", () => {
    const prismaError = new Prisma.PrismaClientKnownRequestError(
      "Unique constraint failed",
      {
        code: "P2002",
        clientVersion: "5.0.0",
        meta: { target: ["email"] },
      },
    );

    const error = handlePrismaError(prismaError);
    expect(error).toBeInstanceOf(ConflictError);
    expect(error.message).toContain("email");
  });

  it("should handle P2025 (record not found) error", () => {
    const prismaError = new Prisma.PrismaClientKnownRequestError(
      "Record not found",
      {
        code: "P2025",
        clientVersion: "5.0.0",
      },
    );

    const error = handlePrismaError(prismaError);
    expect(error).toBeInstanceOf(NotFoundError);
  });

  it("should handle P2003 (foreign key constraint) error", () => {
    const prismaError = new Prisma.PrismaClientKnownRequestError(
      "Foreign key constraint failed",
      {
        code: "P2003",
        clientVersion: "5.0.0",
      },
    );

    const error = handlePrismaError(prismaError);
    expect(error).toBeInstanceOf(ValidationError);
  });

  it("should handle unknown Prisma errors", () => {
    const prismaError = new Prisma.PrismaClientKnownRequestError(
      "Unknown error",
      {
        code: "P9999",
        clientVersion: "5.0.0",
      },
    );

    const error = handlePrismaError(prismaError);
    expect(error).toBeInstanceOf(DatabaseError);
  });

  it("should handle generic errors", () => {
    const genericError = new Error("Generic error");
    const error = handlePrismaError(genericError);
    expect(error).toBeInstanceOf(AppError);
    expect(error.message).toBe("Generic error");
  });

  it("should handle unknown error types", () => {
    const error = handlePrismaError("string error");
    expect(error).toBeInstanceOf(AppError);
    expect(error.message).toBe("An unknown error occurred");
  });
});

describe("Logger", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should log errors with context", () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const error = new Error("Test error");
    
    logger.error("Error occurred", error, { userId: "123" });
    
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "[ERROR]",
      "Error occurred",
      expect.objectContaining({
        error: "Test error",
        context: { userId: "123" },
      }),
    );
    
    consoleErrorSpy.mockRestore();
  });

  it("should log warnings", () => {
    const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    
    logger.warn("Warning message", { key: "value" });
    
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "[WARN]",
      "Warning message",
      expect.objectContaining({
        context: { key: "value" },
      }),
    );
    
    consoleWarnSpy.mockRestore();
  });

  it("should log info messages", () => {
    const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    
    logger.info("Info message");
    
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "[INFO]",
      "Info message",
      expect.any(Object),
    );
    
    consoleLogSpy.mockRestore();
  });

  it("should only log debug in development", () => {
    const originalEnv = process.env.NODE_ENV;
    const consoleDebugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    
    process.env.NODE_ENV = "development";
    logger.debug("Debug message");
    expect(consoleDebugSpy).toHaveBeenCalled();
    
    consoleDebugSpy.mockClear();
    process.env.NODE_ENV = "production";
    logger.debug("Debug message");
    expect(consoleDebugSpy).not.toHaveBeenCalled();
    
    process.env.NODE_ENV = originalEnv;
    consoleDebugSpy.mockRestore();
  });
});
