import { NextResponse } from "next/server";
import { projectRepository } from "@/lib/repositories";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured") === "true";
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const projects = await projectRepository.findAll({
      featured,
      limit,
    });

    return NextResponse.json({ projects, count: projects.length });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
