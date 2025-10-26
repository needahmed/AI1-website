import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  ServiceHero,
  ServiceOverview,
  ProcessTimeline,
  TechnologiesGrid,
  UseCases,
  ServiceTestimonials,
  RelatedServices,
  ServiceCTA,
} from "@/components/services";
import type { Service } from "@/lib/data/services";

interface ServicePageLayoutProps {
  service: Service;
  relatedServices: Service[];
}

export function ServicePageLayout({
  service,
  relatedServices,
}: ServicePageLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-8 py-6">
        <Breadcrumb
          items={[
            { label: "Services", href: "/services" },
            { label: service.title },
          ]}
        />
      </div>

      {/* Hero Section */}
      <ServiceHero
        title={service.heroTitle}
        subtitle={service.heroSubtitle}
        ctaText={service.ctaText}
      />

      {/* Overview Section */}
      <ServiceOverview
        title={service.overview.title}
        description={service.overview.description}
        highlights={service.overview.highlights}
      />

      {/* Process Timeline */}
      <ProcessTimeline steps={service.process} />

      {/* Technologies */}
      <TechnologiesGrid 
        technologies={service.technologies.map(tech => ({
          name: tech.name,
          iconName: tech.icon.displayName || tech.icon.name,
          category: tech.category,
        }))} 
      />

      {/* Use Cases */}
      <UseCases useCases={service.useCases} />

      {/* Testimonials */}
      <ServiceTestimonials testimonials={service.testimonials} />

      {/* Related Services */}
      <RelatedServices 
        services={relatedServices.map(s => ({
          slug: s.slug,
          title: s.title,
          description: s.description,
          iconName: s.icon.displayName || s.icon.name,
        }))} 
      />

      {/* CTA */}
      <ServiceCTA title={service.title} ctaText={service.ctaText} />
    </div>
  );
}
