import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  console.warn("RESEND_API_KEY is not set. Email functionality will be disabled.");
}

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export const AGENCY_EMAIL = process.env.AGENCY_EMAIL || "agency@ai1.com";
export const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@ai1.com";
