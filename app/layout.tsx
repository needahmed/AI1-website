import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/animation";
import { ParallaxWrapper } from "@/components/animation";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header, Footer, FloatingCTA, PageTransition } from "@/components/layout";

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

export const metadata: Metadata = {
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
  ],
  authors: [{ name: "AI1" }],
  creator: "AI1",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ai1.com",
    title: "AI1 - AI-Powered Solutions",
    description:
      "Leading the future of AI-powered solutions. We help businesses transform through cutting-edge technology and innovative strategies.",
    siteName: "AI1",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI1 - AI-Powered Solutions",
    description:
      "Leading the future of AI-powered solutions. We help businesses transform through cutting-edge technology and innovative strategies.",
    creator: "@ai1",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} antialiased`}>
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
                <main className="pt-16">{children}</main>
              </PageTransition>
              <Footer />
              <FloatingCTA />
            </ParallaxWrapper>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
