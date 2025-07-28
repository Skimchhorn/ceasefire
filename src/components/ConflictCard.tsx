import { useRouter } from 'next/navigation' 
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight, Users, Calendar, MapPin } from "lucide-react";

interface ConflictCardProps {
  region: string;
  countries: string[];
  description: string;
  imageUrl: string;
  stats: {
    displaced: string;
    duration: string;
    affected: string;
  };
  flagEmojis: string[];
  urgencyLevel: 'critical' | 'high' | 'moderate';
  url: string;
}

export function ConflictCard({ 
  region, 
  countries, 
  description, 
  imageUrl, 
  stats, 
  flagEmojis, 
  urgencyLevel,
  url
}: ConflictCardProps) {
  const urgencyColors = {
    critical: 'border-red-500/50 bg-red-600/10',
    high: 'border-orange-500/50 bg-orange-600/10',
    moderate: 'border-yellow-500/50 bg-yellow-600/10'
  };
  const router = useRouter()
  const urgencyTextColors = {
    critical: 'text-red-400',
    high: 'text-orange-400',
    moderate: 'text-yellow-400'
  };

  return (
    <div className={`bg-gray-900/90 backdrop-blur-sm border ${urgencyColors[urgencyLevel]} rounded-lg overflow-hidden hover:border-white/30 transition-all duration-300 group`}>
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback 
          src={imageUrl}
          alt={`${region} conflict`}
          className="w-full h-full object-cover grayscale-[60%] sepia-[20%] group-hover:grayscale-[30%] transition-all duration-500"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Urgency indicator */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-semibold ${urgencyTextColors[urgencyLevel]} bg-black/70 backdrop-blur-sm rounded-full border border-current/30`}>
            {urgencyLevel.toUpperCase()}
          </span>
        </div>
        
        {/* Flags */}
        <div className="absolute top-3 right-3 flex space-x-1">
          {flagEmojis.map((flag, index) => (
            <span key={index} className="text-lg bg-black/70 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center">
              {flag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold text-white">{region}</h3>
          <MapPin className="w-4 h-4 text-gray-400" />
        </div>
        
        <p className="text-sm text-gray-400 mb-4">
          {countries.join(' • ')}
        </p>
        
        <p className="text-gray-300 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-black/30 backdrop-blur-sm p-3 rounded border border-white/10 text-center">
            <Users className="w-4 h-4 text-blue-400 mx-auto mb-1" />
            <div className="text-sm font-semibold text-blue-400">{stats.displaced}</div>
            <div className="text-xs text-gray-500">Displaced</div>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-3 rounded border border-white/10 text-center">
            <Calendar className="w-4 h-4 text-orange-400 mx-auto mb-1" />
            <div className="text-sm font-semibold text-orange-400">{stats.duration}</div>
            <div className="text-xs text-gray-500">Duration</div>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-3 rounded border border-white/10 text-center">
            <Users className="w-4 h-4 text-red-400 mx-auto mb-1" />
            <div className="text-sm font-semibold text-red-400">{stats.affected}</div>
            <div className="text-xs text-gray-500">Affected</div>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          onClick={() => router.push(url)}
          className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-200 group"
        >
          View Stories
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>

      </div>
    </div>
  );
}