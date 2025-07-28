import { Button } from "./ui/button";
import { Heart, Users, HandHeart, Clock, Bird } from "lucide-react";

export function CallToAction() {
  return (
    <section className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Urgency indicator */}
        <div className="flex items-center justify-center mb-6">
          <div className="bg-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-full px-4 py-2 flex items-center space-x-2">
            <Clock className="w-4 h-4 text-red-400" />
            <span className="text-red-300 text-sm font-semibold">URGENT: Crisis Continues</span>
          </div>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-6">
            <div className="p-3 bg-red-600/20 backdrop-blur-sm rounded-full border border-red-500/30">
              <Heart className="w-8 h-8 text-red-400" />
            </div>
            <div className="p-3 bg-blue-600/20 backdrop-blur-sm rounded-full border border-blue-500/30">
              <Users className="w-8 h-8 text-blue-400" />
            </div>
            <div className="p-3 bg-yellow-600/20 backdrop-blur-sm rounded-full border border-yellow-500/30">
              <HandHeart className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
          They Need Us Now
        </h2>
        
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/10">
          While we sleep safely in our homes tonight, millions remain displaced, uncertain if tomorrow will bring shelter, food, or safety. Your compassion can be their lifeline.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border border-red-500/50 backdrop-blur-sm"
          >
            <Heart className="w-5 h-5 mr-2" />
            Donate Now - Save Lives
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-4 text-lg border-2 border-blue-400/60 text-blue-200 bg-blue-900/20 hover:bg-blue-800/30 hover:border-blue-300/80 hover:text-blue-100 transition-all duration-200 backdrop-blur-sm"
          >
            <Bird className="w-5 h-5 mr-2" />
            Support Peace Efforts
          </Button>
        </div>
        
        {/* <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-white/10">
            <div className="text-2xl font-bold text-yellow-400 mb-1">$25</div>
            <p className="text-gray-300 text-sm">Provides food for a family for 3 days</p>
          </div>
          <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-white/10">
            <div className="text-2xl font-bold text-blue-400 mb-1">$50</div>
            <p className="text-gray-300 text-sm">Emergency shelter materials</p>
          </div>
          <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-white/10">
            <div className="text-2xl font-bold text-green-400 mb-1">$100</div>
            <p className="text-gray-300 text-sm">Medical care and supplies</p>
          </div>
        </div> */}
        
        <p className="text-sm text-gray-500 mt-6 bg-black/20 backdrop-blur-sm p-3 rounded border border-white/10">
          Every dollar goes directly to those who need it most. No administrative fees. Just human to human compassion.
        </p>
      </div>
    </section>
  );
}