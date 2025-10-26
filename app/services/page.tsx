import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MotionSection, MotionItem } from "@/components/animation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getAllServices } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Comprehensive digital solutions including web & app development, game development, AI solutions, SEO services, and branding & UI/UX design.",
  keywords: [
    "services",
    "web development",
    "app development",
    "game development",
    "AI solutions",
    "SEO services",
    "branding",
    "UI/UX design",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Our Services | AI1",
    description:
      "Comprehensive digital solutions including web & app development, game development, AI solutions, SEO services, and branding & UI/UX design.",
    type: "website",
    url: "/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services | AI1",
    description:
      "Comprehensive digital solutions including web & app development, game development, AI solutions, SEO services, and branding & UI/UX design.",
  },
};

// Generate structured data for services page
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": getAllServices().map((service, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Service",
      "name": service.title,
      "description": service.description,
      "url": `https://ai1.com/services/${service.slug}`,
      "provider": {
        "@type": "Organization",
        "name": "AI1",
      },
    },
  })),
};

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 md:px-8 py-6">
          <Breadcrumb items={[{ label: "Services" }]} />
        </div>

        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-background via-muted/30 to-background">
          <div className="container mx-auto px-4 md:px-8">
            <MotionSection variant="slideUp" className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                Our <span className="gradient-text">Services</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Comprehensive digital solutions tailored to your business needs.
                From concept to deployment, we deliver excellence at every step.
              </p>
            </MotionSection>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-8">
            <MotionSection variant="fade" stagger={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  
                  return (
                    <MotionItem key={index}>
                      <Card className="h-full border-2 hover:border-electric-blue/50 transition-all duration-300 hover:shadow-ai1-lg group">
                        <CardHeader>
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-electric-blue to-purple flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <CardTitle className="text-2xl mb-2">
                            {service.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-muted-foreground leading-relaxed">
                            {service.description}
                          </p>
                          <Link href={`/services/${service.slug}`}>
                            <Button
                              variant="ghost"
                              className="w-full group-hover:bg-electric-blue/10"
                            >
                              Learn More
                              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </MotionItem>
                  );
                })}
              </div>
            </MotionSection>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-deep-blue via-electric-blue to-purple">
          <div className="container mx-auto px-4 md:px-8">
            <MotionSection variant="scale">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  Let's discuss how our services can help you achieve your goals.
                  Get a free consultation today.
                </p>
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white text-deep-blue hover:bg-white/90 font-semibold text-lg px-8"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </MotionSection>
          </div>
        </section>
      </div>
    </>
  );
}
