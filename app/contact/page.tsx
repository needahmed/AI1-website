import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactDetails } from "@/components/contact/contact-details";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactCTA } from "@/components/contact/contact-cta";
import { ContactFAQ } from "@/components/contact/contact-faq";
import { SectionWrapper, Headline } from "@/components/ai1";

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch with AI1",
  description:
    "Ready to start your project? Contact AI1 today and get a response within 6 hours. We specialize in web development, mobile apps, AI solutions, and more.",
  keywords: [
    "contact AI1",
    "web development inquiry",
    "project consultation",
    "AI solutions contact",
    "get a quote",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us - Get in Touch with AI1",
    description:
      "Ready to start your project? Contact AI1 today and get a response within 6 hours.",
    type: "website",
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Get in Touch with AI1",
    description:
      "Ready to start your project? Contact AI1 today and get a response within 6 hours.",
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <ContactHero />

      {/* Contact Details */}
      <SectionWrapper>
        <ContactDetails />
      </SectionWrapper>

      {/* 6-Hour Turnaround CTA with Scroll Zoom */}
      <ContactCTA />

      {/* Contact Form */}
      <SectionWrapper>
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <Headline
              subtitle="Fill out the form below and we'll get back to you within 6 hours during business hours."
              className="mb-12"
            >
              Send Us a Message
            </Headline>
          </div>
          <ContactForm />
        </div>
      </SectionWrapper>

      {/* FAQ Section */}
      <SectionWrapper className="bg-muted/30">
        <div className="mb-12 text-center">
          <Headline
            subtitle="Find answers to common questions about working with us"
            className="mb-12"
          >
            Frequently Asked Questions
          </Headline>
        </div>
        <ContactFAQ />
      </SectionWrapper>
    </>
  );
}
