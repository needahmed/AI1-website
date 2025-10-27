"use client";

import { usePathname } from "next/navigation";
import { SmoothScrollProvider } from "@/components/animation";
import { ParallaxWrapper } from "@/components/animation";
import { Header, Footer, FloatingCTA, PageTransition } from "@/components/layout";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    // For admin routes, render children directly without header/footer
    return <>{children}</>;
  }

  // For public routes, render with header, footer, and other components
  return (
    <SmoothScrollProvider>
      <ParallaxWrapper>
        <Header />
        <PageTransition>
          <main id="main-content" className="pt-16">
            {children}
          </main>
        </PageTransition>
        <Footer />
        <FloatingCTA />
      </ParallaxWrapper>
    </SmoothScrollProvider>
  );
}
