"use client";

import { Project } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
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

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const featuredImage = project.images[0] || "/placeholder-project.jpg";

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      className="group h-full"
    >
      <Link href={`/portfolio/${project.slug}`} className="block h-full">
        <Card className="glass-card h-full overflow-hidden transition-all duration-300 hover:shadow-ai1-lg">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={featuredImage}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {project.featured && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-gradient-electric text-white shadow-lg">
                  ⭐ Featured
                </Badge>
              </div>
            )}
          </div>
          <CardContent className="p-6">
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="outline">{categoryLabels[project.category]}</Badge>
            </div>
            <h3 className="mb-2 text-xl font-bold leading-tight">
              {project.title}
            </h3>
            <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className={cn(
                    "text-ai1-cyan text-xs font-medium",
                    "rounded-sm bg-ai1-cyan/10 px-2 py-1"
                  )}
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-muted-foreground text-xs">
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
