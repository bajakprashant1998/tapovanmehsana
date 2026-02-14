import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection, Counter } from "@/components/AnimatedSection";
import {
  GraduationCap, Shield, BookOpen, Users, Building2, Bus, Microscope,
  Monitor, Trophy, ChevronRight, Star, Calendar, ArrowRight
} from "lucide-react";
import heroBg from "@/assets/hero-campus.jpg";

const highlights = [
  { end: 25, suffix: "+", label: "Years of Excellence" },
  { end: 3000, suffix: "+", label: "Students" },
  { end: 15, suffix: "", label: "Acre Campus" },
  { end: 100, suffix: "%", label: "CBSE Results" },
];

const whyChooseUs = [
  { icon: BookOpen, title: "Holistic Education", desc: "Balanced curriculum nurturing academics, arts, sports, and life skills." },
  { icon: Monitor, title: "Modern Infrastructure", desc: "Smart classrooms, advanced labs, and digital learning resources." },
  { icon: Shield, title: "Safety & Security", desc: "24/7 CCTV surveillance, trained staff, and secure campus environment." },
  { icon: Users, title: "Expert Faculty", desc: "Qualified and experienced educators dedicated to student success." },
  { icon: Building2, title: "Residential Life", desc: "Home-like hostel with nutritious meals, supervision, and care." },
  { icon: Bus, title: "Transport Fleet", desc: "GPS-tracked buses covering major routes on the highway corridor." },
];

const facilities = [
  { icon: Monitor, label: "Smart Classrooms" },
  { icon: Microscope, label: "Science Labs" },
  { icon: Trophy, label: "Sports Complex" },
  { icon: Building2, label: "Hostel" },
  { icon: BookOpen, label: "Library" },
  { icon: Bus, label: "Transport" },
];

const testimonials = [
  { name: "Rajesh Patel", role: "Parent", text: "Tapovan has transformed our child's confidence. The teachers are incredibly supportive and the campus is world-class." },
  { name: "Anita Sharma", role: "Parent", text: "We're so grateful for the holistic education our daughter receives. The residential facility is like a second home." },
  { name: "Dr. Mehta", role: "Parent", text: "The CBSE results speak for themselves. Academic rigor combined with extracurricular excellence — that's Tapovan." },
];

const news = [
  { title: "Admissions Open 2025-26", date: "January 2025", desc: "Applications are now being accepted for Pre-Primary to Class XI." },
  { title: "Annual Sports Day", date: "December 2024", desc: "Students showcased athletic excellence in track, field, and team sports." },
  { title: "Science Exhibition Winners", date: "November 2024", desc: "Our students won top prizes at the state-level science exhibition." },
];

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 via-secondary/60 to-secondary/90" />
        <div className="relative z-10 container-custom text-center text-secondary-foreground pt-20">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-6 border border-primary/30">
              CBSE Affiliated • Day Boarding & Residential
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Shaping Tomorrow's{" "}
              <span className="text-primary">Leaders</span>{" "}
              Today
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-lg md:text-xl text-secondary-foreground/80 max-w-2xl mx-auto mb-8">
              A premier international school on the Ahmedabad–Mehsana Highway offering 
              world-class education, modern campus, and holistic development.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/admissions">
                <Button size="lg" className="bg-primary hover:bg-saffron-dark text-primary-foreground text-base px-8 py-6 font-semibold shadow-xl">
                  Admissions Open 2025-26 <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10 text-base px-8 py-6">
                  Explore Our School
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-card relative -mt-16 z-20">
        <div className="container-custom">
          <div className="bg-card rounded-2xl shadow-2xl border border-border p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {highlights.map((h, i) => (
              <Counter key={i} end={h.end} suffix={h.suffix} label={h.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Why Tapovan</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground">
                Why Choose Tapovan International?
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                We provide a nurturing environment where every child discovers their potential through academic excellence and holistic development.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <Card className="group hover:shadow-xl transition-all duration-300 border-border hover:border-primary/30 h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Academics Overview */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Academics</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground">
                Comprehensive CBSE Curriculum
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { level: "Pre-Primary", grades: "Nursery – KG", color: "bg-primary" },
              { level: "Primary", grades: "Classes I – V", color: "bg-accent" },
              { level: "Secondary", grades: "Classes VI – X", color: "bg-secondary" },
              { level: "Senior Secondary", grades: "Classes XI – XII", color: "bg-navy" },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <div className={`h-2 ${item.color}`} />
                  <CardContent className="p-6 text-center">
                    <GraduationCap className="h-10 w-10 text-primary mx-auto mb-3" />
                    <h3 className="font-display text-xl font-semibold text-foreground">{item.level}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{item.grades}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.3}>
            <div className="text-center mt-8">
              <Link to="/academics">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  View Full Curriculum <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Facilities Preview */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Campus</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground">
                World-Class Facilities
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {facilities.map((f, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="bg-muted rounded-xl p-6 text-center hover:bg-primary/10 hover:shadow-md transition-all group cursor-pointer">
                  <f.icon className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium text-foreground">{f.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.4}>
            <div className="text-center mt-8">
              <Link to="/facilities">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Explore Facilities <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Testimonials</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
                What Parents Say
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-secondary-foreground/5 rounded-xl p-6 border border-secondary-foreground/10">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-secondary-foreground/80 text-sm leading-relaxed mb-4 italic">
                    "{t.text}"
                  </p>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-secondary-foreground/60">{t.role}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* News & Events */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Updates</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground">
                News & Events
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((n, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">{n.date}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">{n.title}</h3>
                    <p className="text-sm text-muted-foreground">{n.desc}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Admission CTA */}
      <section className="section-padding bg-gradient-primary text-primary-foreground">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Begin Your Child's Journey Today
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
              Admissions are open for 2025-26. Secure your child's place at one of Gujarat's finest schools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/admissions">
                <Button size="lg" className="bg-secondary hover:bg-navy-dark text-secondary-foreground text-base px-8 py-6 font-semibold shadow-xl">
                  Apply for Admission
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 py-6">
                  Schedule a Campus Visit
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Index;
