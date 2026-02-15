import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedSection, Counter } from "@/components/AnimatedSection";
import {
  GraduationCap, Shield, BookOpen, Users, Building2, Bus, Microscope,
  Monitor, Trophy, ChevronRight, Star, Calendar, ArrowRight, Sparkles } from
"lucide-react";
import heroBg from "@/assets/hero-campus.jpg";

const highlights = [
{ end: 25, suffix: "+", label: "Years of Excellence" },
{ end: 3000, suffix: "+", label: "Students" },
{ end: 15, suffix: "", label: "Acre Campus" },
{ end: 100, suffix: "%", label: "CBSE Results" }];


const testimonials = [
{ name: "Rajesh Patel", role: "Parent", text: "Tapovan has transformed our child's confidence. The teachers are incredibly supportive and the campus is world-class." },
{ name: "Anita Sharma", role: "Parent", text: "We're so grateful for the holistic education our daughter receives. The residential facility is like a second home." },
{ name: "Dr. Mehta", role: "Parent", text: "The CBSE results speak for themselves. Academic rigor combined with extracurricular excellence — that's Tapovan." }];


const news = [
{ title: "Admissions Open 2025-26", date: "January 2025", desc: "Applications are now being accepted for Pre-Primary to Class XI." },
{ title: "Annual Sports Day", date: "December 2024", desc: "Students showcased athletic excellence in track, field, and team sports." },
{ title: "Science Exhibition Winners", date: "November 2024", desc: "Our students won top prizes at the state-level science exhibition." }];


const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }} />

        <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 via-secondary/60 to-secondary/90" />
        <div className="relative z-10 container-custom text-center text-secondary-foreground pt-20">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-sm font-semibold mb-6 border border-primary/30 text-primary-foreground">
              CBSE Affiliated • Day Boarding & Residential
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] mb-6 tracking-tight">
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
            {highlights.map((h, i) =>
            <Counter key={i} end={h.end} suffix={h.suffix} label={h.label} />
            )}
          </div>
        </div>
      </section>

      {/* Bento Grid — Why Choose Us + Facilities */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-14">
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Why Tapovan</span>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-3 text-foreground tracking-tight">
                Everything Your Child Needs
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
                A nurturing environment where every child discovers their potential through academic excellence and holistic development.
              </p>
            </div>
          </AnimatedSection>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[180px]">
            {/* Large card — Holistic Education */}
            <AnimatedSection delay={0} className="md:col-span-2 md:row-span-2">
              <div className="h-full rounded-2xl bg-gradient-primary p-8 flex flex-col justify-between text-primary-foreground group hover:shadow-2xl transition-shadow">
                <div>
                  <BookOpen className="h-10 w-10 mb-4 opacity-90" />
                  <h3 className="font-display text-2xl md:text-3xl font-extrabold mb-2">Holistic Education</h3>
                  <p className="text-primary-foreground/80 text-sm md:text-base leading-relaxed max-w-md">
                    Balanced curriculum nurturing academics, arts, sports, and essential life skills for a complete education experience.
                  </p>
                </div>
                <Link to="/academics" className="inline-flex items-center gap-1 text-sm font-semibold mt-4 hover:gap-2 transition-all">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </AnimatedSection>

            {/* Modern Infrastructure */}
            <AnimatedSection delay={0.1}>
              <div className="h-full rounded-2xl bg-secondary p-6 flex flex-col justify-between text-secondary-foreground group hover:shadow-xl transition-shadow">
                <Monitor className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-display text-lg font-bold">Smart Classrooms</h3>
                  <p className="text-secondary-foreground/60 text-xs mt-1">Interactive tech-enabled learning</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Safety */}
            <AnimatedSection delay={0.15}>
              <div className="h-full rounded-2xl bg-muted p-6 flex flex-col justify-between group hover:shadow-xl transition-shadow border border-border">
                <Shield className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">Safety & Security</h3>
                  <p className="text-muted-foreground text-xs mt-1">24/7 CCTV, trained staff</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Expert Faculty */}
            <AnimatedSection delay={0.2}>
              <div className="h-full rounded-2xl bg-muted p-6 flex flex-col justify-between group hover:shadow-xl transition-shadow border border-border">
                <Users className="h-8 w-8 text-accent" />
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">Expert Faculty</h3>
                  <p className="text-muted-foreground text-xs mt-1">Qualified & experienced educators</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Residential */}
            <AnimatedSection delay={0.25}>
              <div className="h-full rounded-2xl bg-accent/15 p-6 flex flex-col justify-between group hover:shadow-xl transition-shadow border border-accent/20">
                <Building2 className="h-8 w-8 text-accent" />
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">Residential Life</h3>
                  <p className="text-muted-foreground text-xs mt-1">Home-like hostel with care</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Wide card — Sports & Labs */}
            <AnimatedSection delay={0.3} className="md:col-span-2">
              <div className="h-full rounded-2xl bg-gradient-navy p-6 flex items-center gap-6 text-secondary-foreground group hover:shadow-xl transition-shadow">
                <div className="flex gap-4 shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Microscope className="h-7 w-7 text-primary" />
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Trophy className="h-7 w-7 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">Labs & Sports Complex</h3>
                  <p className="text-secondary-foreground/60 text-sm mt-1">Advanced labs, cricket ground, athletics track, indoor games, and more.</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Transport */}
            <AnimatedSection delay={0.35}>
              <div className="h-full rounded-2xl bg-primary/10 p-6 flex flex-col justify-between group hover:shadow-xl transition-shadow border border-primary/15">
                <Bus className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">Transport Fleet</h3>
                  <p className="text-muted-foreground text-xs mt-1">GPS-tracked buses on highway</p>
                </div>
              </div>
            </AnimatedSection>

            {/* CTA card */}
            <AnimatedSection delay={0.4}>
              <Link to="/facilities" className="block h-full">
                <div className="h-full rounded-2xl bg-primary p-6 flex flex-col justify-between text-primary-foreground group hover:bg-saffron-dark transition-colors cursor-pointer">
                  <Sparkles className="h-8 w-8" />
                  <div>
                    <h3 className="font-display text-lg font-bold">View All Facilities</h3>
                    <ArrowRight className="h-5 w-5 mt-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Academics Overview */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Academics</span>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-3 text-foreground tracking-tight">
                Comprehensive CBSE Curriculum
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
            { level: "Pre-Primary", grades: "Nursery – KG", color: "from-primary to-saffron-light" },
            { level: "Primary", grades: "Classes I – V", color: "from-accent to-gold-light" },
            { level: "Secondary", grades: "Classes VI – X", color: "from-secondary to-navy-light" },
            { level: "Sr. Secondary", grades: "Classes XI – XII", color: "from-navy-dark to-secondary" }].
            map((item, i) =>
            <AnimatedSection key={i} delay={i * 0.1}>
                <div className="relative overflow-hidden rounded-2xl bg-card border border-border hover:shadow-xl transition-all group h-full">
                  <div className={`h-1.5 bg-gradient-to-r ${item.color}`} />
                  <div className="p-6 text-center">
                    <GraduationCap className="h-10 w-10 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-display text-xl font-bold text-foreground">{item.level}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{item.grades}</p>
                  </div>
                </div>
              </AnimatedSection>
            )}
          </div>
          <AnimatedSection delay={0.3}>
            <div className="text-center mt-10">
              <Link to="/academics">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
                  View Full Curriculum <ChevronRight className="ml-1 h-4 w-4" />
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
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Testimonials</span>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-3 tracking-tight">
                What Parents Say
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) =>
            <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-secondary-foreground/5 rounded-2xl p-7 border border-secondary-foreground/10 hover:border-primary/30 transition-colors h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) =>
                  <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  )}
                  </div>
                  <p className="text-secondary-foreground/80 text-sm leading-relaxed mb-auto italic flex-1">
                    "{t.text}"
                  </p>
                  <div className="mt-5 pt-4 border-t border-secondary-foreground/10">
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-secondary-foreground/60">{t.role}</p>
                  </div>
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </section>

      {/* News & Events */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Updates</span>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-3 text-foreground tracking-tight">
                News & Events
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((n, i) =>
            <AnimatedSection key={i} delay={i * 0.1}>
                <div className="rounded-2xl border border-border bg-card p-6 hover:shadow-xl transition-shadow h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-xs text-muted-foreground font-medium">{n.date}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{n.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{n.desc}</p>
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </section>

      {/* Admission CTA */}
      <section className="section-padding bg-gradient-primary text-primary-foreground">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
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
    </div>);

};

export default Index;