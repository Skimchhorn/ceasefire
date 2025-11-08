"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Heart } from "lucide-react";

interface StoryPreviewProps {
  color: boolean;              // true = red theme, false = blue theme
  country: string;
  title: string;
  description: string;
  images: string[];            // multiple images for carousel
}

export function StoryPreview({
  color,
  country,
  title,
  description,
  images,
}: StoryPreviewProps) {
  const [current, setCurrent] = useState(0);

  // Theme styles based on boolean
  const borderColor = color ? "border-l-red-700/70" : "border-l-blue-700/70";
  const buttonStyle1 = color
    ? "bg-red-700/80 hover:bg-red-600/90 border-red-600/50"
    : "bg-blue-700/80 hover:bg-blue-600/90 border-blue-600/50";
  const buttonStyle2 = color
    ? "px-8 py-4 text-lg border-2 border-blue-400/60 text-blue-200 bg-blue-900/20 hover:bg-blue-800/30 hover:border-blue-300/80 hover:text-blue-100 transition-all duration-200 backdrop-blur-sm"
    : "px-8 py-4 text-lg border-2 border-red-400/60 text-red-200 bg-red-900/20 hover:bg-red-800/30 hover:border-red-300/80 hover:text-red-100 transition-all duration-200 backdrop-blur-sm";

  // Handle carousel navigation
  const prevImage = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="p-8 h-full flex flex-col justify-center relative">
      <div
        className={`border-l-4 ${borderColor} pl-6 max-w-lg mx-auto relative z-10`}
      >
        {/* Image Carousel */}
        <div className="relative mb-6">
          <div className="relative overflow-hidden rounded-lg">
            <ImageWithFallback
              src={images[current]}
              alt={`${country} refugee story`}
              className="w-full h-64 object-cover grayscale-[50%] sepia-[20%]"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Carousel controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/60 text-white px-2 py-1 rounded-full"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/60 text-white px-2 py-1 rounded-full"
              >
                ›
              </button>
            </>
          )}

          {/* Country indicator */}
          <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-white text-sm">{country}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-semibold text-white mb-4 drop-shadow-lg">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 mb-6 leading-relaxed bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-white/10">
          {description}
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            className={`${buttonStyle1} text-white border backdrop-blur-sm px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-lg`}
          >
            <Heart className="w-4 h-4 mr-2" />
            Read Their Story
          </Button>

          <Button variant="outline" size="lg" className={`${buttonStyle2}`}>
            Share Story
          </Button>
        </div>
      </div>
    </div>
  );
}
