"use client";

import { Project } from "@prisma/client";
import { motion } from "framer-motion";
import { SectionWrapper, Headline } from "@/components/ai1";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectGallery } from "@/components/portfolio/project-gallery";
import { ParallaxContainer } from "@/components/animation/parallax-container";
import { MotionSection } from "@/components/animation/motion-section";
import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2Icon,
  TargetIcon,
  LightbulbIcon,
  TrendingUpIcon,
  QuoteIcon,
} from "lucide-react";

interface ProjectCaseStudyProps {
  project: Project;
}

const categoryLabels: Record<string, string> = {
  WEB_DEVELOPMENT: "Web Development",
  MOBILE_APP: "Mobile Apps",
  ECOMMERCE: "E-Commerce",
  BRANDING: "Branding",
  UI_UX_DESIGN: "UI/UX Design",
  OTHER: "Other",
};

export function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  const metrics =
    (project.metrics as
      | Array<{ label: string; value: string; description?: string }>
      | null) || [];
  const testimonial = project.testimonial as
    | {
        text: string;
        author: string;
        role: string;
        company?: string;
      }
    | null;

  return (
    <div className="min-h-screen">
      <ParallaxContainer
        speed="fast"
        className="absolute inset-0 -z-10 h-screen overflow-hidden"
      >
        <div className="h-full w-full bg-gradient-to-br from-ai1-deep-blue via-ai1-purple/30 to-ai1-teal/20" />
      </ParallaxContainer>

      <SectionWrapper className="relative pt-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="text-base">
              {categoryLabels[project.category]}
            </Badge>
            {project.featured && (
              <Badge className="bg-gradient-electric text-base text-white">
                ⭐ Featured Project
              </Badge>
            )}
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
            {project.title}
          </h1>

          <p className="text-muted-foreground mb-8 max-w-3xl text-xl">
            {project.description}
          </p>

          {project.client && (
            <div className="mb-6">
              <span className="text-muted-foreground text-sm font-semibold uppercase tracking-wide">
                Client
              </span>
              <p className="mt-1 text-lg font-medium">{project.client}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-ai1-cyan rounded-md bg-ai1-cyan/10 px-3 py-2 text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {project.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-ai1-lg">
              <img
                src={project.images[0]}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        )}

        {project.overview && (
          <MotionSection className="mb-20">
            <Card className="glass-card">
              <CardContent className="p-8 md:p-12">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-ai1">
                    <TargetIcon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold">Project Overview</h2>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {project.overview}
                  </p>
                </div>
              </CardContent>
            </Card>
          </MotionSection>
        )}

        {project.challenges && (
          <MotionSection className="mb-20">
            <Card className="glass-card border-ai1-electric-blue/20">
              <CardContent className="p-8 md:p-12">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-electric">
                    <CheckCircle2Icon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold">Challenges</h2>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {project.challenges}
                  </p>
                </div>
              </CardContent>
            </Card>
          </MotionSection>
        )}

        {project.solutions && (
          <MotionSection className="mb-20">
            <Card className="glass-card border-ai1-purple/20">
              <CardContent className="p-8 md:p-12">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-purple">
                    <LightbulbIcon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold">Solutions</h2>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {project.solutions}
                  </p>
                </div>
              </CardContent>
            </Card>
          </MotionSection>
        )}

        {metrics && metrics.length > 0 && (
          <MotionSection className="mb-20">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-4xl font-bold">Results & Impact</h2>
              <p className="text-muted-foreground text-lg">
                Key metrics and outcomes from this project
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="glass-card h-full">
                    <CardContent className="flex h-full flex-col items-center p-8 text-center">
                      <TrendingUpIcon className="text-ai1-cyan mb-4 h-10 w-10" />
                      <h3 className="gradient-text mb-2 text-4xl font-bold">
                        {metric.value}
                      </h3>
                      <p className="mb-2 text-lg font-semibold">
                        {metric.label}
                      </p>
                      {metric.description && (
                        <p className="text-muted-foreground text-sm">
                          {metric.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </MotionSection>
        )}

        {project.results && (
          <MotionSection className="mb-20">
            <Card className="glass-card">
              <CardContent className="p-8 md:p-12">
                <h2 className="mb-6 text-3xl font-bold">Project Results</h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {project.results}
                  </p>
                </div>
              </CardContent>
            </Card>
          </MotionSection>
        )}

        {testimonial && (
          <MotionSection className="mb-20">
            <Card className="glass-card border-ai1-teal/20 bg-gradient-to-br from-ai1-teal/5 to-ai1-cyan/5">
              <CardContent className="p-8 md:p-12">
                <QuoteIcon className="text-ai1-teal mb-6 h-12 w-12 opacity-50" />
                <blockquote className="mb-6 text-2xl font-medium leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </blockquote>
                <div>
                  <p className="mb-1 font-bold">{testimonial.author}</p>
                  <p className="text-muted-foreground text-sm">
                    {testimonial.role}
                    {testimonial.company && ` at ${testimonial.company}`}
                  </p>
                </div>
              </CardContent>
            </Card>
          </MotionSection>
        )}

        {project.images.length > 1 && (
          <MotionSection className="mb-20">
            <div className="mb-8">
              <h2 className="mb-4 text-4xl font-bold">Project Gallery</h2>
              <p className="text-muted-foreground text-lg">
                Click any image to view in full screen
              </p>
            </div>
            <ProjectGallery images={project.images} title={project.title} />
          </MotionSection>
        )}
      </SectionWrapper>
    </div>
  );
}
