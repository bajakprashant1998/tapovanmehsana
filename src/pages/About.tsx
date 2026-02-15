import { AnimatedSection } from "@/components/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Award, CheckCircle, Users, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const milestones = [
  { year: "1999", event: "School founded with a vision for holistic education" },
  { year: "2005", event: "CBSE affiliation granted" },
  { year: "2010", event: "Residential wing inaugurated" },
  { year: "2015", event: "Campus expanded to 15 acres with modern facilities" },
  { year: "2020", event: "Digital learning infrastructure implemented" },
  { year: "2024", event: "25 years of academic excellence" },
];

const values = [
  { icon: BookOpen, title: "Academic Excellence", desc: "Rigorous CBSE curriculum with focus on conceptual learning." },
  { icon: Users, title: "Character Building", desc: "Instilling values of integrity, empathy, and responsibility." },
  { icon: Award, title: "Holistic Growth", desc: "Balanced development across academics, sports, arts, and life skills." },
  { icon: CheckCircle, title: "Discipline & Safety", desc: "Structured routines in a secure, caring environment." },
];

const About = () => {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-custom">
          <div className="max-w-3xl">
            <AnimatedSection>
              <span className="text-primary text-sm font-bold uppercase tracking-widest">About Us</span>
              <h1 className="font-display text-5xl md:text-6xl font-extrabold mt-3 leading-[1] tracking-tight">
                Nurturing Minds,<br />Building Futures
              </h1>
              <p className="text-secondary-foreground/70 text-lg mt-6 max-w-xl">
                For over 25 years, Tapovan International School has been shaping young minds
                with a blend of tradition and modern education.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Vision & Mission — Bento style */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <AnimatedSection className="md:col-span-2">
              <div className="h-full rounded-2xl bg-gradient-primary p-8 md:p-10 text-primary-foreground flex flex-col justify-between">
                <Eye className="h-10 w-10 mb-6 opacity-80" />
                <div>
                  <h2 className="font-display text-3xl font-extrabold mb-3">Our Vision</h2>
                  <p className="text-primary-foreground/80 text-base leading-relaxed max-w-lg">
                    To be a leading institution that empowers students with knowledge, values, and skills 
                    to become responsible global citizens and future leaders who contribute positively to society.
                  </p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="h-full rounded-2xl bg-accent/15 border border-accent/20 p-8 flex flex-col justify-between">
                <Target className="h-10 w-10 text-accent mb-6" />
                <div>
                  <h2 className="font-display text-2xl font-extrabold mb-3 text-foreground">Our Mission</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    To provide a stimulating learning environment that fosters intellectual curiosity, 
                    creativity, and personal growth through an innovative curriculum and state-of-the-art infrastructure.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Leadership</span>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-3 text-foreground tracking-tight">Messages from Our Leaders</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { role: "Chairman", name: "Shri Ramesh Patel", message: "Education is the most powerful tool we can give to the next generation. At Tapovan, we are committed to providing an environment where every child can thrive, discover their strengths, and become a beacon of positive change." },
              { role: "Principal", name: "Dr. Sunita Mehta", message: "Our approach combines academic rigor with compassionate mentoring. We believe that true education goes beyond textbooks — it shapes character, builds resilience, and ignites a lifelong love for learning." },
            ].map((leader, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="rounded-2xl bg-card border border-border p-8 hover:shadow-xl transition-shadow h-full">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center">
                      <Users className="h-8 w-8 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground">{leader.name}</h3>
                      <p className="text-primary text-sm font-semibold">{leader.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed italic">"{leader.message}"</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values — Bento */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Our Values</span>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-3 text-foreground tracking-tight">What We Stand For</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="text-center p-7 rounded-2xl bg-muted hover:bg-primary/5 transition-all border border-transparent hover:border-primary/20 group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <v.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Our Journey</span>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-3 text-foreground tracking-tight">Key Milestones</h2>
            </div>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {milestones.map((m, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="rounded-2xl bg-card border border-border p-6 hover:shadow-lg transition-shadow hover:border-primary/20">
                  <p className="text-primary font-extrabold text-2xl font-display">{m.year}</p>
                  <p className="text-foreground text-sm mt-2">{m.event}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-navy text-secondary-foreground">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Ready to Join the Tapovan Family?
            </h2>
            <p className="text-secondary-foreground/70 max-w-xl mx-auto mb-8 text-lg">
              Discover what makes us different. Schedule a campus visit today.
            </p>
            <Link to="/admissions">
              <Button size="lg" className="bg-primary hover:bg-saffron-dark text-primary-foreground px-8 py-6 font-semibold shadow-xl">
                Apply Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default About;
