import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string,
    public errors?: Record<string, string[]>,
  ) {
    super(message, 400, "VALIDATION_ERROR");
    this.name = "ValidationError";
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, "CONFLICT");
    this.name = "ConflictError";
  }
}

export class DatabaseError extends AppError {
  constructor(message: string) {
    super(message, 500, "DATABASE_ERROR");
    this.name = "DatabaseError";
  }
}

// Helper to format Zod errors
export function formatZodError(error: ZodError): Record<string, string[]> {
  const formatted: Record<string, string[]> = {};
  
  error.issues.forEach((err) => {
    const path = err.path.join(".");
    if (!formatted[path]) {
      formatted[path] = [];
    }
    formatted[path].push(err.message);
  });
  
  return formatted;
}

// Helper to handle Prisma errors
export function handlePrismaError(error: unknown): AppError {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        // Unique constraint violation
        const field = (error.meta?.target as string[])?.join(", ") || "field";
        return new ConflictError(
          `A record with this ${field} already exists`,
        );
      case "P2025":
        // Record not found
        return new NotFoundError("Record");
      case "P2003":
        // Foreign key constraint violation
        return new ValidationError("Invalid reference in data");
      default:
        return new DatabaseError(`Database error: ${error.message}`);
    }
  }
  
  if (error instanceof Error) {
    return new AppError(error.message);
  }
  
  return new AppError("An unknown error occurred");
}

// Logger utility
export const logger = {
  error: (message: string, error?: unknown, context?: Record<string, unknown>) => {
    console.error("[ERROR]", message, {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      context,
      timestamp: new Date().toISOString(),
    });
  },
  warn: (message: string, context?: Record<string, unknown>) => {
    console.warn("[WARN]", message, {
      context,
      timestamp: new Date().toISOString(),
    });
  },
  info: (message: string, context?: Record<string, unknown>) => {
    console.log("[INFO]", message, {
      context,
      timestamp: new Date().toISOString(),
    });
  },
  debug: (message: string, context?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === "development") {
      console.debug("[DEBUG]", message, {
        context,
        timestamp: new Date().toISOString(),
      });
    }
  },
};
