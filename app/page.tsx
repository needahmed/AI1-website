"use client";

import {
  HeroSection,
  ServicesSection,
  PortfolioSection,
  TestimonialsSection,
  TechStackSection,
  TurnaroundCTASection,
  ClientLogosSection,
  ClosingCTASection,
} from "@/components/home";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Dual AI Meaning & Zoom Animation */}
      <HeroSection />

      {/* Services Overview Grid with GSAP Rotations */}
      <ServicesSection />

      {/* Featured Portfolio with Parallax Effects */}
      <PortfolioSection />

      {/* Testimonials Slider */}
      <TestimonialsSection />

      {/* Tech Stack Marquee */}
      <TechStackSection />

      {/* 6-Hour Turnaround CTA with Dramatic Zoom */}
      <TurnaroundCTASection />

      {/* Global Client Logos */}
      <ClientLogosSection />

      {/* Closing CTA */}
      <ClosingCTASection />
    </div>
  );
}
