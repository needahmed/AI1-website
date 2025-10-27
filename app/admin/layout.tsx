import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminLayout } from "@/components/admin/admin-layout";
import { SessionProvider } from "@/components/admin/session-provider";

export default async function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Simply return children without authentication check
  // Authentication will be handled by individual pages or route groups
  return <>{children}</>;
}
