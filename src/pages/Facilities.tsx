import { AnimatedSection } from "@/components/AnimatedSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Monitor, Microscope, BookOpen, Music, Trophy, Building2,
  Bus, Shield, Utensils, Wifi, Camera, ArrowRight
} from "lucide-react";

const facilities = [
  { icon: Monitor, title: "Smart Classrooms", desc: "Interactive whiteboards, projectors, and digital learning tools.", size: "md:col-span-2", bg: "bg-gradient-primary text-primary-foreground" },
  { icon: Microscope, title: "Science Labs", desc: "Well-equipped Physics, Chemistry, and Biology labs.", size: "", bg: "bg-secondary text-secondary-foreground" },
  { icon: Wifi, title: "Computer Lab", desc: "Modern lab with high-speed internet and latest software.", size: "", bg: "bg-muted text-foreground border border-border" },
  { icon: BookOpen, title: "Library", desc: "Extensive collection of books, journals, and digital resources.", size: "", bg: "bg-accent/15 text-foreground border border-accent/20" },
  { icon: Music, title: "Auditorium", desc: "State-of-the-art for cultural events and performances.", size: "", bg: "bg-muted text-foreground border border-border" },
  { icon: Trophy, title: "Sports Complex", desc: "Cricket ground, football field, basketball, athletics track.", size: "md:col-span-2", bg: "bg-gradient-navy text-secondary-foreground" },
  { icon: Building2, title: "Hostel & Dining", desc: "Comfortable residential facilities with nutritious meals.", size: "", bg: "bg-primary/10 text-foreground border border-primary/15" },
  { icon: Utensils, title: "Cafeteria", desc: "Hygienic serving of balanced, nutritious meals daily.", size: "", bg: "bg-muted text-foreground border border-border" },
  { icon: Bus, title: "Transport Fleet", desc: "GPS-tracked buses covering major highway routes.", size: "", bg: "bg-muted text-foreground border border-border" },
  { icon: Shield, title: "Safety & Security", desc: "24/7 CCTV surveillance, fire safety, and trained staff.", size: "", bg: "bg-secondary text-secondary-foreground" },
  { icon: Camera, title: "Activity Rooms", desc: "Dedicated spaces for art, music, dance, and yoga.", size: "", bg: "bg-accent/15 text-foreground border border-accent/20" },
  { icon: Wifi, title: "Wi-Fi Campus", desc: "Fully connected campus with high-speed internet.", size: "", bg: "bg-primary/10 text-foreground border border-primary/15" },
];

const Facilities = () => {
  return (
    <div className="pt-20">
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-custom">
          <div className="max-w-3xl">
            <AnimatedSection>
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Our Campus</span>
              <h1 className="font-display text-5xl md:text-6xl font-extrabold mt-3 leading-[1] tracking-tight">
                World-Class<br />Facilities
              </h1>
              <p className="text-secondary-foreground/70 text-lg mt-6 max-w-xl">
                Our 15-acre campus is designed to provide the best environment for learning, 
                sports, and overall development.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {facilities.map((f, i) => (
              <AnimatedSection key={i} delay={i * 0.04} className={f.size}>
                <div className={`h-full rounded-2xl p-6 ${f.bg} hover:shadow-xl transition-shadow group min-h-[160px] flex flex-col justify-between`}>
                  <f.icon className="h-8 w-8 mb-4 opacity-80 group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="font-display text-lg font-bold">{f.title}</h3>
                    <p className="text-sm mt-1 opacity-70">{f.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.5}>
            <div className="text-center mt-14">
              <Link to="/contact">
                <Button size="lg" className="bg-primary hover:bg-saffron-dark text-primary-foreground px-8 py-6 font-semibold shadow-xl">
                  Schedule a Campus Visit <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Facilities;
