import { useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { X } from "lucide-react";

const categories = ["All", "Campus", "Events", "Sports", "Academics"];

const photos = [
  { src: "/placeholder.svg", alt: "School Building", category: "Campus" },
  { src: "/placeholder.svg", alt: "Sports Day", category: "Events" },
  { src: "/placeholder.svg", alt: "Cricket Ground", category: "Sports" },
  { src: "/placeholder.svg", alt: "Science Lab", category: "Academics" },
  { src: "/placeholder.svg", alt: "Library", category: "Campus" },
  { src: "/placeholder.svg", alt: "Annual Function", category: "Events" },
  { src: "/placeholder.svg", alt: "Basketball Court", category: "Sports" },
  { src: "/placeholder.svg", alt: "Smart Classroom", category: "Academics" },
  { src: "/placeholder.svg", alt: "Hostel", category: "Campus" },
  { src: "/placeholder.svg", alt: "Art Exhibition", category: "Events" },
  { src: "/placeholder.svg", alt: "Swimming Pool", category: "Sports" },
  { src: "/placeholder.svg", alt: "Computer Lab", category: "Academics" },
];

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = filter === "All" ? photos : photos.filter((p) => p.category === filter);

  return (
    <div className="pt-20">
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-custom text-center">
          <AnimatedSection>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Gallery</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">Campus Life in Pictures</h1>
            <p className="text-secondary-foreground/70 text-lg mt-4 max-w-2xl mx-auto">
              Explore our vibrant campus through photos and videos.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          {/* Filters */}
          <AnimatedSection>
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === c
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((p, i) => (
              <AnimatedSection key={`${p.alt}-${i}`} delay={i * 0.05}>
                <div
                  onClick={() => setLightbox(p.src)}
                  className="aspect-square bg-muted rounded-xl overflow-hidden cursor-pointer group"
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Videos */}
          <AnimatedSection>
            <div className="mt-16">
              <h2 className="font-display text-2xl font-bold text-center text-foreground mb-8">Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="aspect-video bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
                  YouTube Video Placeholder
                </div>
                <div className="aspect-video bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
                  YouTube Video Placeholder
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-foreground/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-background" onClick={() => setLightbox(null)}>
            <X className="h-8 w-8" />
          </button>
          <img src={lightbox} alt="Gallery" className="max-w-full max-h-[80vh] rounded-lg" />
        </div>
      )}
    </div>
  );
};

export default Gallery;
