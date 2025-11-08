import { StoryPreview } from "@/components/StoryPreview";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from '@/components/footer'
import { supabase } from "@/lib/supabaseClient";

export default async function App() {
const { data: articles, error } = await supabase
  .from("war_articles")
  .select(`
    id,
    country,
    title,
    description,
    created_at,
    article_images (image_url)
  `)
  .order("created_at", { ascending: false });


  if (error) {
    console.error(error);
    return <div>Error loading articles</div>;
  }
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
              Humans of Russia &amp; Ukraine
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
            {articles?.map((article) => (
              <div
                key={article.id}
                className="bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm border-r border-white/10"
              >
                <StoryPreview
                  color={true} // example boolean
                  country={article.country}
                  title={article.title}
                  description={article.description}
                  images={article.article_images?.map((img) => img.image_url) || []}
                />
              </div>
            ))}
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
      </div>
    </div>
  );
}