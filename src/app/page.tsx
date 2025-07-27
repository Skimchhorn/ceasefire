
import { ModeToggle } from "@/components/ModeToggle";
export default function Home() {
  return (
      <div className="grid min-h-screen grid-rows-[auto_1fr_auto] items-center justify-items-center gap-16 p-8 pb-20 sm:p-20">
      <section className="container mx-auto flex flex-col-reverse items-center justify-between px-6 py-16 md:flex-row md:px-12 lg:px-20">
        {/* Left Side - Text and Buttons */}
        <div className="text-center md:w-1/2 md:text-left">
          <h1 className="text-4xl leading-tight font-bold text-pretty md:text-5xl">
            Protect Yourself from Phishing Attacks
          </h1>
          <p className="mt-4 text-lg text-pretty">
            Deep Phishing provides essential security tools and AI-powered
            educational resources to help you identify and prevent phishing
            attempts.
          </p>
          <ModeToggle/>
          </div>
       </section>
      </div>

  );
}


