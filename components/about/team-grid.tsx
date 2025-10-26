"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Linkedin, Twitter } from "lucide-react";
import {
  TeamMember,
  ExpertiseCategory,
  expertiseCategories,
} from "@/lib/data/about-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface TeamGridProps {
  members: TeamMember[];
}

export function TeamGrid({ members }: TeamGridProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<ExpertiseCategory>("All");
  const shouldReduceMotion = useReducedMotion();

  const filteredMembers =
    selectedCategory === "All"
      ? members
      : members.filter((member) => member.expertise === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 30,
      scale: shouldReduceMotion ? 1 : 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.9,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.3,
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div
        className="flex flex-wrap justify-center gap-3"
        role="tablist"
        aria-label="Filter team members by expertise"
      >
        {expertiseCategories.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? "default" : "outline"}
            className="min-w-[120px]"
            role="tab"
            aria-selected={selectedCategory === category}
            aria-controls="team-grid"
          >
            {category}
            {category !== "All" && (
              <span className="ml-2 rounded-full bg-background/20 px-2 py-0.5 text-xs">
                {members.filter((m) => m.expertise === category).length}
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Team Grid */}
      <motion.div
        id="team-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        role="tabpanel"
        aria-label={`${selectedCategory} team members`}
      >
        {filteredMembers.map((member) => (
          <motion.div
            key={member.id}
            variants={itemVariants}
            layout
            whileHover={
              shouldReduceMotion
                ? {}
                : {
                    y: -8,
                    transition: { duration: 0.2 },
                  }
            }
          >
            <Card className="group glass-card h-full overflow-hidden transition-shadow hover:shadow-ai1-lg">
              <CardContent className="p-6">
                {/* Avatar */}
                <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-brand-electric/20 to-brand-purple/20">
                  <div className="flex h-full items-center justify-center text-4xl font-bold text-brand-electric">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  {/* Placeholder for actual image */}
                  {/* <Image 
                    src={member.image} 
                    alt={member.name}
                    fill
                    className="object-cover"
                  /> */}

                  {/* Social Links Overlay */}
                  {(member.linkedIn || member.twitter) && (
                    <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                      {member.linkedIn && (
                        <a
                          href={member.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-white p-2 transition-transform hover:scale-110"
                          aria-label={`${member.name}'s LinkedIn profile`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Linkedin className="h-5 w-5 text-brand-electric" />
                        </a>
                      )}
                      {member.twitter && (
                        <a
                          href={member.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-white p-2 transition-transform hover:scale-110"
                          aria-label={`${member.name}'s Twitter profile`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Twitter className="h-5 w-5 text-brand-cyan" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-brand-electric">
                    {member.role}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {member.bio}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredMembers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-12 text-center"
        >
          <p className="text-lg text-muted-foreground">
            No team members found in this category.
          </p>
        </motion.div>
      )}

      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Showing {filteredMembers.length} team member
        {filteredMembers.length !== 1 ? "s" : ""} in {selectedCategory}
      </div>
    </div>
  );
}
