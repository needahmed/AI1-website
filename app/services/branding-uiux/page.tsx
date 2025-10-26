import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageLayout } from "@/components/services/service-page-layout";
import { getServiceBySlug, getRelatedServices } from "@/lib/data/services";

const SERVICE_SLUG = "branding-uiux";

export async function generateMetadata(): Promise<Metadata> {
  const service = getServiceBySlug(SERVICE_SLUG);
  
  if (!service) return {};

  return {
    title: service.seo.title,
    description: service.seo.description,
    keywords: service.seo.keywords,
    alternates: {
      canonical: `/services/${SERVICE_SLUG}`,
    },
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      type: "website",
      url: `/services/${SERVICE_SLUG}`,
    },
    twitter: {
      card: "summary_large_image",
      title: service.seo.title,
      description: service.seo.description,
    },
  };
}

// Generate structured data for SEO
function generateStructuredData(service: ReturnType<typeof getServiceBySlug>) {
  if (!service) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "AI1",
      "url": "https://ai1.com",
    },
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": service.title,
      "itemListElement": service.useCases.map((useCase, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": useCase.title,
          "description": useCase.description,
        },
        "position": index + 1,
      })),
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": service.testimonials.length.toString(),
    },
  };
}

export default function BrandingUIUXPage() {
  const service = getServiceBySlug(SERVICE_SLUG);
  
  if (!service) {
    notFound();
  }

  const relatedServices = getRelatedServices(SERVICE_SLUG);
  const structuredData = generateStructuredData(service);

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      <ServicePageLayout service={service} relatedServices={relatedServices} />
    </>
  );
}
