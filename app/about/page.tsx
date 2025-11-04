import { Metadata } from "next";
import {
  Sparkles,
  Award,
  Zap,
  Eye,
  Globe,
  Users,
  Brain,
  Package,
} from "lucide-react";
import {
  companyStory,
  mission,
  companyValues,
  timeline,
  ceoProfile,
  teamMembers,
  animatedStats,
  differentiators,
  ctaSection,
} from "@/lib/data/about-data";
import {
  TeamCarousel,
  TeamGrid,
  Timeline,
  AnimatedStats,
  LeadershipSpotlight,
} from "@/components/about";
import { SectionWrapper, Headline, GradientDivider } from "@/components/ai1";
import { CTABanner } from "@/components/ai1";
import { ParallaxContainer } from "@/components/animation";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About Us - AI-First All-in-One Solutions",
  description:
    "Learn about AI1's mission to empower businesses with AI-first solutions. Meet our team, explore our values, and discover what makes us different.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | AI1",
    description:
      "AI-first all-in-one platform built by a global team of experts.",
    type: "website",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | AI1",
    description:
      "AI-first all-in-one platform built by a global team of experts.",
  },
};

// Icon mapping for values
const iconMap = {
  Sparkles,
  Award,
  Zap,
  Eye,
  Globe,
  Users,
  Brain,
  Package,
};

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden">
      {/* Hero Section with Parallax Background */}
      <SectionWrapper variant="gradient" className="relative min-h-[70vh]">
        {/* Parallax Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <ParallaxContainer speed="slow">
            <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-brand-electric/20 blur-3xl" />
          </ParallaxContainer>
          <ParallaxContainer speed="medium">
            <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-brand-purple/20 blur-3xl" />
          </ParallaxContainer>
          <ParallaxContainer speed="fast">
            <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-cyan/10 blur-3xl" />
          </ParallaxContainer>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center">
          <Headline
            as="h1"
            variant="gradient"
            subtitle={companyStory.subheadline}
            className="mb-12"
          >
            {companyStory.headline}
          </Headline>

          <div className="mx-auto max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl space-y-6 text-left px-2 sm:px-0">
            {companyStory.story.map((paragraph, index) => (
              <p
                key={index}
                className="text-xl leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <GradientDivider />

      {/* Mission & Vision Section */}
      <SectionWrapper>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="glass-card">
            <CardContent className="p-8">
              <h2 className="mb-4 text-3xl font-bold text-foreground">
                Our Mission
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {mission.mission}
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-8">
              <h2 className="mb-4 text-3xl font-bold text-foreground">
                Our Vision
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {mission.vision}
              </p>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>

      <GradientDivider />

      {/* Values Section */}
      <SectionWrapper variant="glass">
        <div className="text-center">
          <Headline
            as="h2"
            subtitle="The principles that guide everything we do"
            className="mb-16"
          >
            Our Core Values
          </Headline>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {companyValues.map((value, index) => {
            const IconComponent = iconMap[value.icon as keyof typeof iconMap];
            return (
              <Card
                key={value.id}
                className="glass-card group transition-all hover:shadow-ai1-lg"
              >
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-brand-electric/20 to-brand-purple/20 p-4">
                    <IconComponent className="h-8 w-8 text-brand-electric" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-foreground">
                    {value.title}
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </SectionWrapper>

      <GradientDivider />

      {/* Animated Stats Section */}
      <SectionWrapper>
        <div className="text-center">
          <Headline
            as="h2"
            subtitle="Real results that speak for themselves"
            className="mb-16"
          >
            Our Impact in Numbers
          </Headline>
        </div>

        <AnimatedStats stats={animatedStats} />
      </SectionWrapper>

      <GradientDivider />

      {/* Differentiators Section */}
      <SectionWrapper variant="gradient">
        <div className="text-center">
          <Headline
            as="h2"
            subtitle="AI-first, all-in-one, and always exceptional"
            className="mb-16"
          >
            What Makes Us Different
          </Headline>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {differentiators.map((diff) => {
            const IconComponent = iconMap[diff.icon as keyof typeof iconMap];
            return (
              <Card
                key={diff.id}
                className="glass-dark group transition-all hover:shadow-ai1-lg"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 rounded-2xl bg-gradient-to-br from-brand-electric to-brand-cyan p-4 shadow-lg shadow-brand-electric/50">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="mb-3 text-2xl font-bold text-foreground">
                        {diff.title}
                      </h3>
                      <p className="text-lg leading-relaxed text-muted-foreground">
                        {diff.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </SectionWrapper>

      <GradientDivider />

      {/* Timeline Section */}
      <SectionWrapper>
        <div className="text-center">
          <Headline
            as="h2"
            subtitle="From startup to industry leader"
            className="mb-16"
          >
            Our Journey
          </Headline>
        </div>

        <Timeline milestones={timeline} />
      </SectionWrapper>

      <GradientDivider />

      {/* Leadership Section */}
      <SectionWrapper variant="glass">
        <div className="text-center">
          <Headline
            as="h2"
            subtitle="Meet the visionary leading our mission"
            className="mb-16"
          >
            Leadership Spotlight
          </Headline>
        </div>

        <LeadershipSpotlight leader={ceoProfile} />
      </SectionWrapper>

      <GradientDivider />

      {/* Team Carousel Section */}
      <SectionWrapper>
        <div className="text-center">
          <Headline
            as="h2"
            subtitle="Talented individuals driving innovation"
            className="mb-16"
          >
            Meet Our Team
          </Headline>
        </div>

        <TeamCarousel members={teamMembers} autoPlayInterval={4000} />
      </SectionWrapper>

      <GradientDivider />

      {/* Team Grid with Filter */}
      <SectionWrapper variant="glass">
        <div className="text-center">
          <Headline
            as="h2"
            subtitle="Explore our experts by expertise"
            className="mb-12"
          >
            The Full Team
          </Headline>
        </div>

        <TeamGrid members={teamMembers} />
      </SectionWrapper>

      <GradientDivider />

      {/* CTA Section */}
      <SectionWrapper>
        <CTABanner
          title={ctaSection.headline}
          description={ctaSection.description}
          primaryAction={{
            label: ctaSection.primaryCTA.label,
            href: ctaSection.primaryCTA.href,
          }}
          secondaryAction={{
            label: ctaSection.secondaryCTA.label,
            href: ctaSection.secondaryCTA.href,
          }}
        />
      </SectionWrapper>
    </main>
  );
}
