"use client";

import { Button } from "@/components/ui/button";
import { MotionSection } from "@/components/animation";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

interface ServiceCTAProps {
  title: string;
  ctaText: string;
}

export function ServiceCTA({ title, ctaText }: ServiceCTAProps) {
  return (
    <section className="py-24 bg-gradient-to-br from-deep-blue via-electric-blue to-purple relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <MotionSection variant="scale">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Let's discuss how our {title.toLowerCase()} can transform your
              business. Get a custom quote tailored to your needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-deep-blue hover:bg-white/90 font-semibold text-lg px-8"
                >
                  {ctaText}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 font-semibold text-lg px-8"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Schedule a Call
                </Button>
              </Link>
            </div>
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
