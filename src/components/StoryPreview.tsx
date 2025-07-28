"use client"
import { Button } from "./ui/button";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Play, Heart } from "lucide-react";

interface StoryPreviewProps {
  country: 'thailand' | 'cambodia';
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
}

export function StoryPreview({ country, title, description, imageUrl, videoUrl }: StoryPreviewProps) {
  const isThailand = country === 'thailand';
  
  const borderColor = isThailand ? 'border-l-red-700/70' : 'border-l-blue-700/70';
  const buttonStyle1 = isThailand 
    ? 'bg-red-700/80 hover:bg-red-600/90 border-red-600/50' 
    : 'bg-blue-700/80 hover:bg-blue-600/90 border-blue-600/50';
  const buttonStyle2 = isThailand 
    ? 'px-8 py-4 text-lg border-2 border-blue-400/60 text-blue-200 bg-blue-900/20 hover:bg-blue-800/30 hover:border-blue-300/80 hover:text-blue-100 transition-all duration-200 backdrop-blur-sm' 
    : 'px-8 py-4 text-lg border-2 border-red-400/60 text-red-200 bg-red-900/20 hover:bg-red-800/30 hover:border-red-300/80 hover:text-red-100 transition-all duration-200 backdrop-blur-sm';
  return (
    <div className="p-8 h-full flex flex-col justify-center relative">
      {/* Content */}
      <div className={`border-l-4 ${borderColor} pl-6 max-w-lg mx-auto relative z-10`}>
        <div className="relative mb-6">
          <div className="relative overflow-hidden rounded-lg">
            <ImageWithFallback 
              src={imageUrl}
              alt={`${country} refugee story`}
              className="w-full h-64 object-cover grayscale-[50%] sepia-[20%]"
            />
            {/* Dark overlay on image */}
            <div className="absolute inset-0 bg-black/40" />
          </div>
          
          {videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/70 backdrop-blur-sm p-4 rounded-full shadow-2xl border border-white/20">
                <Play className="w-6 h-6 text-white" />
              </div>
            </div>
          )}
          
          {/* Country indicator */}
          <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-white text-sm">
              {isThailand ? '🇹🇭 Thailand' : '🇰🇭 Cambodia'}
            </span>
          </div>
        </div>
        
        <h3 className="text-2xl font-semibold text-white mb-4 drop-shadow-lg">
          {title}
        </h3>
        
        <p className="text-gray-300 mb-6 leading-relaxed bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-white/10">
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            className={`${buttonStyle1} text-white border backdrop-blur-sm px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-lg`}
          >
            <Heart className="w-4 h-4 mr-2" />
            Read Their Story
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className = {`${buttonStyle2}` }
          >
            Share Story
          </Button>
        </div>
      </div>
    </div>
  );
}