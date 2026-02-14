import { AnimatedSection } from "@/components/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import {
  Monitor, Microscope, BookOpen, Music, Trophy, Building2,
  Bus, Shield, Utensils, Wifi, Camera
} from "lucide-react";

const facilities = [
  { icon: Monitor, title: "Smart Classrooms", desc: "Interactive whiteboards, projectors, and digital learning tools to make lessons engaging and effective." },
  { icon: Microscope, title: "Science Laboratories", desc: "Well-equipped Physics, Chemistry, and Biology labs for hands-on experiments and scientific inquiry." },
  { icon: Wifi, title: "Computer Lab", desc: "Modern computer lab with high-speed internet and latest software for digital literacy and coding." },
  { icon: BookOpen, title: "Library", desc: "Extensive collection of books, journals, and digital resources fostering a love for reading and research." },
  { icon: Music, title: "Auditorium", desc: "State-of-the-art auditorium for cultural events, assemblies, performances, and guest lectures." },
  { icon: Trophy, title: "Sports Complex", desc: "Cricket ground, football field, basketball court, athletics track, and indoor games facilities." },
  { icon: Building2, title: "Hostel & Dining", desc: "Comfortable residential facilities with nutritious meals, supervision, and a home-like atmosphere." },
  { icon: Utensils, title: "Cafeteria", desc: "Hygienic cafeteria serving balanced, nutritious meals prepared under strict quality standards." },
  { icon: Bus, title: "Transport Fleet", desc: "GPS-tracked fleet of buses covering major routes with trained drivers and attendants." },
  { icon: Shield, title: "Safety & Security", desc: "24/7 CCTV surveillance, fire safety systems, trained security staff, and visitor management." },
  { icon: Camera, title: "Activity Rooms", desc: "Dedicated spaces for art, music, dance, yoga, and other extracurricular activities." },
  { icon: Wifi, title: "Wi-Fi Campus", desc: "Fully connected campus with high-speed internet for digital learning and research." },
];

const Facilities = () => {
  return (
    <div className="pt-20">
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-custom text-center">
          <AnimatedSection>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Our Campus</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">World-Class Facilities</h1>
            <p className="text-secondary-foreground/70 text-lg mt-4 max-w-2xl mx-auto">
              Our 15-acre campus is designed to provide the best environment for learning, 
              sports, and overall development.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((f, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <Card className="h-full group hover:shadow-xl transition-all duration-300 hover:border-primary/30">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <f.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-2 text-foreground">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Facilities;
