"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MotionSection, MotionItem } from "@/components/animation";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Link from "next/link";

interface ServiceWithStringIcon {
  slug: string;
  title: string;
  description: string;
  iconName: string;
}

interface RelatedServicesProps {
  services: ServiceWithStringIcon[];
}

export function RelatedServices({ services }: RelatedServicesProps) {
  if (!services.length) return null;

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
            Related <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-0">
            Explore more ways we can help your business grow
          </p>
        </div>

        <MotionSection variant="slideUp" stagger={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => {
              const Icon = (LucideIcons as any)[service.iconName] || LucideIcons.Box;
              
              return (
                <MotionItem key={index}>
                  <Card className="h-full border-2 hover:border-electric-blue/50 transition-all duration-300 hover:shadow-ai1-lg group">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-electric-blue to-purple flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <CardTitle className="text-2xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
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
  );
}
