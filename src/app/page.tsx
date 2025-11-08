"use client"
import { ConflictCard } from "@/components/ConflictCard";
import { CallToAction } from "@/components/CallToAction";
import { Clock, Globe, Users, Heart, Bird } from "lucide-react";
import { Footer } from '@/components/footer'
import { supabase } from "@/lib/supabaseClient";

export default function App() {
  const conflicts = [
    {
      region: "Ukraine & Russia",
      countries: ["Ukraine", "Russia"],
      description: "Millions displaced by ongoing conflict. Families torn apart, children traumatized, elderly abandoned. Winter approaches with no heating, no hope, yet resilience endures.",
      imageUrl: "https://images.unsplash.com/photo-1646985381310-79c04b0c3a6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      stats: {
        displaced: "6.2M+",
        duration: "2+ years",
        affected: "17M+"
      },
      flagEmojis: ["🇺🇦", "🇷🇺"],
      urgencyLevel: "critical" as const,
      url: "/russia-ukraine"
    },
    {
      region: "Thailand & Cambodia",
      countries: ["Thailand", "Cambodia"],
      description: "Border tensions create waves of displacement. Families flee seeking safety, carrying only memories and hope for eventual return to peaceful lands.",
      imageUrl: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      stats: {
        displaced: "240K+",
        duration: "Ongoing",
        affected: "1.2M+"
      },
      flagEmojis: ["🇹🇭", "🇰🇭"],
      urgencyLevel: "high" as const,
      url: "/cambodia-thailand"
    },
    {
      region: "Gaza & Israel",
      countries: ["Palestine", "Israel"],
      description: "Generations caught in cycles of violence. Children know no other reality than conflict, yet continue to dream of playgrounds instead of rubble.",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      stats: {
        displaced: "1.9M+",
        duration: "Decades",
        affected: "5M+"
      },
      flagEmojis: ["🇵🇸", "🇮🇱"],
      urgencyLevel: "critical" as const,
      url: "/gaza-isreal"
    },
    // {
    //   region: "Sudan",
    //   countries: ["Sudan"],
    //   description: "Internal strife displaces millions within their own homeland. Farmers become refugees, teachers become survival experts, hope becomes a daily choice.",
    //   imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    //   stats: {
    //     displaced: "7.7M+",
    //     duration: "8+ months",
    //     affected: "25M+"
    //   },
    //   flagEmojis: ["🇸🇩"],
    //   urgencyLevel: "critical" as const,
    //   url: "/"
    // },
    // {
    //   region: "Myanmar",
    //   countries: ["Myanmar"],
    //   description: "Military coups shatter lives overnight. Democracy activists become refugees, monks become protesters, silence becomes the only safety.",
    //   imageUrl: "https://images.unsplash.com/photo-1582821563155-02efcb943838?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    //   stats: {
    //     displaced: "1.5M+",
    //     duration: "3+ years",
    //     affected: "18M+"
    //   },
    //   flagEmojis: ["🇲🇲"],
    //   urgencyLevel: "high" as const,
    //   url: "/"
    // },
    // {
    //   region: "Syria",
    //   countries: ["Syria"],
    //   description: "A decade of war leaves cities in ruins and families scattered across continents. Children grow up as strangers to their homeland.",
    //   imageUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    //   stats: {
    //     displaced: "13.1M+",
    //     duration: "13+ years",
    //     affected: "15.3M+"
    //   },
    //   flagEmojis: ["🇸🇾"],
    //   urgencyLevel: "high" as const,
    //   url: "/"
    // }
  ];

  return (
    <div className="nunito-sans-regular min-h-screen relative">
      {/* Background Image with Blur and Overlay */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          filter: "blur(3px) grayscale(40%)"
        }}
      />
      
      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/70 z-10" />
      
      {/* Content */}
      <div className="relative z-20">
        
        {/* Hero Section */}
        <section className="relative py-20 min-h-[600px] flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                <Bird className="w-12 h-12 text-white/80" />
                <div className="h-12 w-px bg-white/30" />
                <Globe className="w-12 h-12 text-white/80" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 drop-shadow-lg">
              Crisis Stories
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-12 leading-relaxed drop-shadow-md">
              In a world torn by conflict, every story of survival is a testament to human resilience. 
              These are the voices from every corner of our broken world, calling for peace.
            </p>
            
            {/* Urgent Banner */}
            <div className="bg-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-lg p-6 max-w-3xl mx-auto mb-8">
              <div className="flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-red-400 mr-2" />
                <span className="text-red-300 font-semibold">BREAKING: Multiple Crisis Zones Need Immediate Help</span>
              </div>
              <p className="text-gray-300 italic">
                "Right now, as you read this, millions are fleeing their homes. Winter is coming. Food is running out. But hope remains alive in their stories."
              </p>
            </div>
          </div>
        </section>

        {/* Global Statistics */}
        <section className="py-16 bg-black/60 backdrop-blur-sm border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white text-center mb-12">The Global Crisis in Numbers</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="text-white">
                <div className="text-4xl md:text-5xl font-bold text-red-400 mb-2">100M+</div>
                <p className="text-gray-300">Forcibly Displaced</p>
                <p className="text-sm text-gray-400 mt-1">Highest on record</p>
              </div>
              <div className="text-white">
                <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">32M+</div>
                <p className="text-gray-300">Child Refugees</p>
                <p className="text-sm text-gray-400 mt-1">Lost childhoods</p>
              </div>
              <div className="text-white">
                <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">56</div>
                <p className="text-gray-300">Active Conflicts</p>
                <p className="text-sm text-gray-400 mt-1">Across the globe</p>
              </div>
              <div className="text-white">
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">1 in 77</div>
                <p className="text-gray-300">People Displaced</p>
                <p className="text-sm text-gray-400 mt-1">Worldwide ratio</p>
              </div>
            </div>
          </div>
        </section>

        {/* Conflict Regions Grid */}
        <section className="py-20 bg-black/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">Crisis Zones Around the World</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Each region tells a story of human suffering, but also of incredible strength. 
                Click on any region to hear the voices of those who refuse to give up.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {conflicts.map((conflict, index) => (
                <ConflictCard key={index} {...conflict} />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="bg-black/80 backdrop-blur-sm">
          <CallToAction />
        </div>
        <Footer/>

      </div>
    </div>
  );
}