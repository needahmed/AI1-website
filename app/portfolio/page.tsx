"use client";

import { useState, useEffect } from "react";
import { Project, ProjectCategory } from "@prisma/client";
import { PortfolioFilters, PortfolioGrid } from "@/components/portfolio";
import { SectionWrapper, Headline } from "@/components/ai1";
import { getProjectsAction } from "@/lib/actions/projects";
import { motion } from "framer-motion";
import { ParallaxContainer } from "@/components/animation/parallax-container";

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    ProjectCategory | "ALL"
  >("ALL");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      const response = await getProjectsAction();
      if (response.success && response.data) {
        setProjects(response.data);
        setFilteredProjects(response.data);
      }
      setIsLoading(false);
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    let filtered = [...projects];

    if (selectedCategory !== "ALL") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (showFeaturedOnly) {
      filtered = filtered.filter((p) => p.featured);
    }

    setFilteredProjects(filtered);
  }, [projects, selectedCategory, showFeaturedOnly]);

  const featuredProject = projects.find((p) => p.featured);

  return (
    <div className="min-h-screen">
      <ParallaxContainer
        speed="medium"
        className="absolute inset-0 -z-10 h-[60vh] overflow-hidden"
      >
        <div className="h-full w-full bg-gradient-to-br from-ai1-deep-blue via-ai1-electric-blue/20 to-ai1-purple/20" />
      </ParallaxContainer>

      <SectionWrapper className="relative py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Headline
            subtitle="Explore our latest projects and success stories"
            className="text-center"
          >
            Our Portfolio
          </Headline>
        </motion.div>

        {featuredProject && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card mb-12 mt-8 overflow-hidden rounded-xl"
          >
            <div className="grid gap-8 md:grid-cols-2">
              <div className="relative aspect-video md:aspect-auto">
                <img
                  src={featuredProject.images[0] || "/placeholder.jpg"}
                  alt={featuredProject.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-8">
                <div className="mb-4">
                  <span className="gradient-text text-sm font-semibold uppercase tracking-wide">
                    Featured Project
                  </span>
                </div>
                <h2 className="mb-4 text-4xl font-bold">
                  {featuredProject.title}
                </h2>
                <p className="text-muted-foreground mb-6 text-lg">
                  {featuredProject.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {featuredProject.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="text-ai1-cyan rounded-sm bg-ai1-cyan/10 px-3 py-1 text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={`/portfolio/${featuredProject.slug}`}
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-md bg-gradient-electric px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-105"
                >
                  View Case Study →
                </a>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <PortfolioFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            showFeaturedOnly={showFeaturedOnly}
            onFeaturedToggle={() => setShowFeaturedOnly(!showFeaturedOnly)}
          />
        </motion.div>

        {isLoading ? (
          <div className="py-20 text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-ai1-cyan border-t-transparent" />
          </div>
        ) : (
          <PortfolioGrid projects={filteredProjects} />
        )}
      </SectionWrapper>
    </div>
  );
}
