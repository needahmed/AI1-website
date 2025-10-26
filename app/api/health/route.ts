import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await prisma.$connect();

    return NextResponse.json({
      status: "ok",
      message: "Database connection successful",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Database connection failed",
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
