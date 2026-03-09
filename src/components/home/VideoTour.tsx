import { useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Play } from "lucide-react";
import heroBg from "@/assets/hero-campus.jpg";

const VideoTour = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-bold uppercase tracking-widest">Virtual Tour</span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-3 text-foreground tracking-tight">
              Take a Campus Tour
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              Experience our world-class campus, smart classrooms, sports facilities, and residential life through this virtual walkthrough.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video max-w-5xl mx-auto border border-border">
            {!playing ? (
              <div className="relative w-full h-full group cursor-pointer" onClick={() => setPlaying(true)}>
                <img src={heroBg} alt="Campus tour" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-secondary/50 group-hover:bg-secondary/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="h-8 w-8 md:h-10 md:w-10 text-primary-foreground ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="font-display text-xl md:text-2xl font-bold">Campus Walkthrough</p>
                  <p className="text-sm text-white/70 mt-1">Watch our 3-minute virtual tour</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-secondary flex items-center justify-center">
                <div className="text-center text-secondary-foreground">
                  <p className="font-display text-2xl font-bold mb-2">Video Coming Soon</p>
                  <p className="text-secondary-foreground/60 text-sm">Campus walkthrough video will be available here</p>
                  <button
                    onClick={() => setPlaying(false)}
                    className="mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-saffron-dark transition-colors"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default VideoTour;
