"use client";

import { Project } from "@prisma/client";
import { ProjectCard } from "./project-card";
import { motion, AnimatePresence } from "framer-motion";

interface PortfolioGridProps {
  projects: Project[];
}

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  if (projects.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground text-lg">
          No projects found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={item}
            layout
            transition={{
              layout: { duration: 0.3 },
              opacity: { duration: 0.2 },
            }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
