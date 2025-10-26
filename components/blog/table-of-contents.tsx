"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Heading {
  level: number;
  text: string;
  id: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-24 hidden lg:block"
    >
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4">Table of Contents</h3>
        <nav>
          <ul className="space-y-2">
            {headings.map(({ level, text, id }) => (
              <li
                key={id}
                style={{ paddingLeft: `${(level - 2) * 0.75}rem` }}
              >
                <button
                  onClick={() => scrollToHeading(id)}
                  className={`text-sm text-left hover:text-ai1-electric transition-colors ${
                    activeId === id
                      ? "text-ai1-electric font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.div>
  );
}
