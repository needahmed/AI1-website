import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/animation";
import { ParallaxWrapper } from "@/components/animation";

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
  title: "AI1 Design System",
  description: "AI1 brand design system built with Next.js, Tailwind CSS, and shadcn/ui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${sora.variable} antialiased`}
      >
        <SmoothScrollProvider>
          <ParallaxWrapper>
            {children}
          </ParallaxWrapper>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
