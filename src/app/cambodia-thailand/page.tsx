import { StoryPreview } from "@/components/StoryPreview";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from '@/components/footer'

export default function cambodia_thai() {
  return (
    <div className="nunito-sans-regular min-h-screen relative">
      {/* Background Image with Blur and Overlay */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          filter: "blur(2px) grayscale(30%)"
        }}
      />
      
      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/60 z-10" />
      
      {/* Content */}
      <div className="relative z-20">
        
        {/* Hero Section */}
        <section className="relative py-20 min-h-[500px] flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 drop-shadow-lg">
              Humans of Thailand &amp; Cambodia
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-12 leading-relaxed drop-shadow-md">
              Behind every statistic is a human story. These are the voices of those who have lost everything, 
              yet continue to hope. Their resilience reminds us of our shared humanity.
            </p>
            <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-lg text-gray-300 italic">
                "We may have lost our homes, but we have not lost our dignity, our dreams, or our hope for peace."
              </p>
            </div>
          </div>
        </section>

        {/* Split Story Previews */}
        <section className="relative bg-black/50 backdrop-blur-sm">
          <div className="grid lg:grid-cols-2 min-h-[700px]">
            {/* Thai Refugee Story */}
            <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm border-r border-white/10">
              <StoryPreview
                country="thailand"
                title="Sunisa's Silent Tears"
                description="Forced to flee with only the clothes on her back, Sunisa now lives in uncertainty. Her children ask when they can go home, but she has no answer. Yet in her pain, she finds strength to help others who share her fate."
                imageUrl="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                videoUrl="#"
              />
            </div>
            
            {/* Cambodian Refugee Story */}
            <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm">
              <StoryPreview
                country="cambodia"
                title="Sophea's Lost Dreams"
                description="Once a teacher with dreams of educating the next generation, Sophea now struggles to survive each day. The classroom she loved is gone, but her determination to rebuild and teach again keeps her moving forward."
                imageUrl="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                videoUrl="#"
              />
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 bg-black/70 backdrop-blur-sm border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="text-white">
                <div className="text-4xl md:text-5xl font-bold text-red-400 mb-2">2.3M+</div>
                <p className="text-gray-300">Displaced People</p>
                <p className="text-sm text-gray-400 mt-1">Seeking safety and hope</p>
              </div>
              <div className="text-white">
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">847K</div>
                <p className="text-gray-300">Children Affected</p>
                <p className="text-sm text-gray-400 mt-1">Dreams put on hold</p>
              </div>
              <div className="text-white">
                <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">156</div>
                <p className="text-gray-300">Stories Shared</p>
                <p className="text-sm text-gray-400 mt-1">Voices finally heard</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="bg-black/80 backdrop-blur-sm">
          <CallToAction />
        </div>
       <Footer/>
        {/* Footer */}
        {/* <footer className="bg-gray-900/95 backdrop-blur-sm text-white py-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="col-span-2">
                <h3 className="text-xl font-semibold mb-4 text-gray-100">Voices for Peace</h3>
                <p className="text-gray-400 mb-4">
                  In the darkest moments of displacement and loss, human stories shine as beacons of hope. 
                  Every voice matters. Every story deserves to be heard.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
                    Facebook
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
                    Twitter
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
                    Instagram
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-gray-200">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-gray-200 transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-gray-200 transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-gray-200 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-gray-200 transition-colors">Terms of Service</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-gray-200">Help Now</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-gray-200 transition-colors">Emergency Donate</a></li>
                  <li><a href="#" className="hover:text-gray-200 transition-colors">Volunteer</a></li>
                  <li><a href="#" className="hover:text-gray-200 transition-colors">Spread Awareness</a></li>
                  <li><a href="#" className="hover:text-gray-200 transition-colors">Crisis Updates</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
              <p>&copy; 2025 Voices for Peace. Every donation helps rebuild lives.</p>
            </div>
          </div>
        </footer> */}
      </div>
    </div>
  );
}