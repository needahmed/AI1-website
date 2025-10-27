"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ImageLightbox } from "./image-lightbox";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  if (images.length === 0) return null;

  return (
    <>
      <div ref={galleryRef} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <GalleryImage
              key={index}
              image={image}
              index={index}
              title={`${title} - Image ${index + 1}`}
              onClick={() => handleImageClick(index)}
              scrollProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>

      <ImageLightbox
        images={images}
        initialIndex={selectedImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}

interface GalleryImageProps {
  image: string;
  index: number;
  title: string;
  onClick: () => void;
  scrollProgress: any;
}

function GalleryImage({
  image,
  index,
  title,
  onClick,
  scrollProgress,
}: GalleryImageProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  const scale = useTransform(
    scrollProgress,
    [index * 0.1, (index + 1) * 0.1],
    [0.9, 1]
  );

  return (
    <motion.div
      ref={imageRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ scale }}
      className={cn(
        "group relative aspect-video cursor-pointer overflow-hidden rounded-lg",
        "transition-all duration-300 hover:shadow-ai1-lg"
      )}
      onClick={onClick}
    >
      {!imageError ? (
        <>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-semibold text-white">
                Click to expand
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-electric-blue/10 to-purple/10">
          <ImageIcon className="w-12 h-12 text-muted-foreground" />
        </div>
      )}
    </motion.div>
  );
}
