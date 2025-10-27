import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminLayout } from "@/components/admin/admin-layout";
import { SessionProvider } from "@/components/admin/session-provider";

export default async function AuthenticatedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <SessionProvider>
      <AdminLayout
        user={{
          name: session.user.name || "Admin",
          email: session.user.email || "",
          role: session.user.role,
        }}
      >
        {children}
      </AdminLayout>
    </SessionProvider>
  );
}
