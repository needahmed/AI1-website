import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, tag, secret } = body;

    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    if (path) {
      revalidatePath(path, "page");
      return NextResponse.json({
        revalidated: true,
        path,
        now: Date.now(),
      });
    }

    if (tag) {
      revalidateTag(tag, "default");
      return NextResponse.json({
        revalidated: true,
        tag,
        now: Date.now(),
      });
    }

    return NextResponse.json(
      { message: "Missing path or tag parameter" },
      { status: 400 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating", error: String(err) },
      { status: 500 }
    );
  }
}
