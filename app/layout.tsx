import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/animation";
import { ParallaxWrapper } from "@/components/animation";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header, Footer, FloatingCTA, PageTransition } from "@/components/layout";
import { Toaster } from "@/components/ui/sonner";
import { ChatbotWidget, ChatConsentBanner } from "@/components/chat";
import { GoogleAnalytics, ConsentBanner } from "@/components/analytics";
import { OrganizationSchema, WebSiteSchema } from "@/components/seo";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI1 - AI-Powered Solutions",
    template: "%s | AI1",
  },
  description:
    "Leading the future of AI-powered solutions. We help businesses transform through cutting-edge technology and innovative strategies.",
  keywords: [
    "AI",
    "Artificial Intelligence",
    "Machine Learning",
    "Web Development",
    "Mobile Apps",
    "Cloud Solutions",
    "SEO Services",
    "Game Development",
    "UI/UX Design",
    "Branding",
  ],
  authors: [{ name: "AI1" }],
  creator: "AI1",
  publisher: "AI1",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "AI1 - AI-Powered Solutions",
    description:
      "Leading the future of AI-powered solutions. We help businesses transform through cutting-edge technology and innovative strategies.",
    siteName: "AI1",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI1 - AI-Powered Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI1 - AI-Powered Solutions",
    description:
      "Leading the future of AI-powered solutions. We help businesses transform through cutting-edge technology and innovative strategies.",
    creator: "@ai1",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <head>
        <OrganizationSchema
          name="AI1"
          url={siteUrl}
          logo={`${siteUrl}/logo.png`}
          description="Leading the future of AI-powered solutions. We help businesses transform through cutting-edge technology and innovative strategies."
          sameAs={[
            "https://twitter.com/ai1",
            "https://linkedin.com/company/ai1",
            "https://github.com/ai1",
          ]}
          contactPoint={{
            contactType: "Customer Service",
            email: "contact@ai1.com",
          }}
        />
        <WebSiteSchema
          name="AI1"
          url={siteUrl}
          description="Leading the future of AI-powered solutions."
          searchAction={{
            target: `${siteUrl}/blog?search={search_term_string}`,
            queryInput: "required name=search_term_string",
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${sora.variable} antialiased overflow-x-hidden ai1-app`}
      >
        <a
          href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:z-9999 focus:top-4 focus:left-4 focus:p-4 focus:bg-background focus:border-2 focus:border-foreground focus:rounded"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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
          <Toaster />
          <ChatbotWidget />
          <ChatConsentBanner />
          <ConsentBanner />
          <GoogleAnalytics />
        </ThemeProvider>
      
      {/* WUUNU SNIPPET - DON'T CHANGE THIS (START) */}
      {process.env.NODE_ENV !== "production" && (
        <>
          <Script id="wuunu-ws" strategy="afterInteractive">
            { `window.__WUUNU_WS__ = "http://127.0.0.1:60738/";` }
          </Script>
          <Script
            id="wuunu-widget"
            src="https://cdn.jsdelivr.net/npm/@wuunu/widget@0.1?cacheParam=27"
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        </>
      )}
      {/* WUUNU SNIPPET - DON'T CHANGE THIS (END) */}
</body>
    </html>
  );
}
