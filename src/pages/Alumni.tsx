import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Users, Award, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const alumniStories = [
  {
    name: "Dr. Priya Sharma",
    batch: "Batch of 2010",
    role: "Cardiologist, AIIMS Delhi",
    quote: "Tapovan gave me the discipline and curiosity that shaped my medical career. The teachers here truly believed in me.",
    image: "/placeholder.svg",
  },
  {
    name: "Rahul Patel",
    batch: "Batch of 2012",
    role: "Software Engineer, Google",
    quote: "The strong science and math foundation I got at Tapovan helped me crack IIT and eventually land my dream job.",
    image: "/placeholder.svg",
  },
  {
    name: "Ananya Desai",
    batch: "Batch of 2015",
    role: "Civil Services (IAS), Gujarat Cadre",
    quote: "From morning assemblies to competitive exams — Tapovan prepared me for every challenge life threw at me.",
    image: "/placeholder.svg",
  },
  {
    name: "Vikram Singh",
    batch: "Batch of 2008",
    role: "Entrepreneur & Founder, TechNova",
    quote: "The holistic education approach at Tapovan helped me think beyond textbooks and build something of my own.",
    image: "/placeholder.svg",
  },
  {
    name: "Meera Joshi",
    batch: "Batch of 2018",
    role: "National Level Athlete, Athletics",
    quote: "The sports infrastructure and coaching at Tapovan were world-class. I owe my national medal to this school.",
    image: "/placeholder.svg",
  },
  {
    name: "Arjun Mehta",
    batch: "Batch of 2014",
    role: "Research Scientist, ISRO",
    quote: "My passion for space science was ignited in the Tapovan science lab. The teachers encouraged us to dream big.",
    image: "/placeholder.svg",
  },
];

const stats = [
  { icon: Users, value: "5,000+", label: "Alumni Worldwide" },
  { icon: GraduationCap, value: "25+", label: "Years of Alumni" },
  { icon: Briefcase, value: "200+", label: "Companies Represented" },
  { icon: Award, value: "50+", label: "Notable Achievers" },
];

const Alumni = () => {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-navy text-white section-padding">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold mb-4">
              Alumni Network
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Our alumni are our pride — excelling in medicine, technology, civil services, sports, and entrepreneurship across the globe.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="text-center p-6 rounded-2xl bg-muted">
                  <s.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="font-display text-3xl font-extrabold text-foreground">{s.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Stories */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-2">
              Alumni Stories
            </h2>
            <p className="text-muted-foreground mb-10">Hear from those who walked the corridors of Tapovan and went on to change the world.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alumniStories.map((alumni, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-all h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground">{alumni.name}</h3>
                      <p className="text-xs text-primary font-semibold">{alumni.batch}</p>
                    </div>
                  </div>
                  <p className="text-sm text-secondary font-medium mb-2">{alumni.role}</p>
                  <p className="text-muted-foreground text-sm italic flex-1">"{alumni.quote}"</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Connect CTA */}
      <section className="section-padding bg-gradient-primary text-white text-center">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold mb-4">Are You a Tapovan Alumnus?</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              We'd love to hear from you! Connect with us, share your journey, and inspire the next generation.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Alumni;
