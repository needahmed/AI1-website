"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { logger } from "@/lib/errors";
import type { ApiResponse } from "@/lib/types";

export async function revalidatePortfolioAction(
  slug?: string
): Promise<ApiResponse<{ revalidated: boolean }>> {
  try {
    revalidatePath("/portfolio", "page");

    if (slug) {
      revalidatePath(`/portfolio/${slug}`, "page");
      logger.info("Revalidated portfolio page", { slug });
    } else {
      logger.info("Revalidated portfolio index");
    }

    return {
      success: true,
      data: { revalidated: true },
    };
  } catch (error) {
    logger.error("Error revalidating portfolio", error, { slug });
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to revalidate portfolio",
    };
  }
}

export async function revalidateAllPortfolioAction(): Promise<
  ApiResponse<{ revalidated: boolean }>
> {
  try {
    revalidateTag("projects", "default");
    revalidateTag("projects:featured", "default");
    revalidatePath("/portfolio", "page");

    logger.info("Revalidated all portfolio pages");

    return {
      success: true,
      data: { revalidated: true },
    };
  } catch (error) {
    logger.error("Error revalidating all portfolio pages", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to revalidate portfolio",
    };
  }
}
