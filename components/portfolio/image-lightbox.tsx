"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageLightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageLightbox({
  images,
  initialIndex,
  isOpen,
  onClose,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowLeft":
          handlePrevious();
          break;
        case "ArrowRight":
          handleNext();
          break;
        case "Escape":
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[95vw] border-none bg-black/95 p-0 sm:max-w-[90vw]"
        showCloseButton={false}
      >
        <div className="relative flex h-[90vh] flex-col">
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <div className="rounded-sm bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-sm">
              {currentIndex + 1} / {images.length}
            </div>
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-sm bg-white/10 text-white hover:bg-white/20"
                aria-label="Close lightbox"
              >
                <XIcon className="h-5 w-5" />
              </Button>
            </DialogClose>
          </div>

          <div className="relative flex flex-1 items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative h-full w-full"
              >
                <Image
                  src={images[currentIndex]}
                  alt={`Gallery image ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                  sizes="90vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevious}
                className="absolute top-1/2 left-4 h-12 w-12 -translate-y-1/2 rounded-sm bg-white/10 text-white hover:bg-white/20"
                aria-label="Previous image"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="absolute top-1/2 right-4 h-12 w-12 -translate-y-1/2 rounded-sm bg-white/10 text-white hover:bg-white/20"
                aria-label="Next image"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </Button>
            </>
          )}

          <div className="flex gap-2 overflow-x-auto p-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-sm border-2 border-transparent transition-all hover:border-ai1-cyan"
                style={{
                  borderColor: index === currentIndex ? "#00D9FF" : "transparent",
                }}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
