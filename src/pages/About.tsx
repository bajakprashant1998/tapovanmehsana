import { AnimatedSection } from "@/components/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Award, CheckCircle, Users, BookOpen } from "lucide-react";

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
        <div className="container-custom text-center">
          <AnimatedSection>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">About Us</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">
              Nurturing Minds, Building Futures
            </h1>
            <p className="text-secondary-foreground/70 text-lg mt-4 max-w-2xl mx-auto">
              For over 25 years, Tapovan International School has been shaping young minds
              with a blend of tradition and modern education.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-background">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedSection>
            <Card className="h-full border-primary/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Eye className="h-7 w-7 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold mb-4 text-foreground">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To be a leading institution that empowers students with knowledge, values, and skills 
                  to become responsible global citizens and future leaders who contribute positively to society.
                </p>
              </CardContent>
            </Card>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <Card className="h-full border-accent/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Target className="h-7 w-7 text-accent" />
                </div>
                <h2 className="font-display text-2xl font-bold mb-4 text-foreground">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To provide a stimulating learning environment that fosters intellectual curiosity, 
                  creativity, and personal growth through an innovative curriculum, experienced faculty, 
                  and state-of-the-art infrastructure.
                </p>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Leadership</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground">Messages from Our Leaders</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { role: "Chairman", name: "Shri Ramesh Patel", message: "Education is the most powerful tool we can give to the next generation. At Tapovan, we are committed to providing an environment where every child can thrive, discover their strengths, and become a beacon of positive change." },
              { role: "Principal", name: "Dr. Sunita Mehta", message: "Our approach combines academic rigor with compassionate mentoring. We believe that true education goes beyond textbooks — it shapes character, builds resilience, and ignites a lifelong love for learning." },
            ].map((leader, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mb-4 mx-auto md:mx-0">
                      <Users className="h-10 w-10 text-secondary" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground">{leader.name}</h3>
                    <p className="text-primary text-sm font-medium mb-3">{leader.role}</p>
                    <p className="text-muted-foreground leading-relaxed italic">"{leader.message}"</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Our Values</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground">What We Stand For</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="text-center p-6 rounded-xl bg-muted hover:bg-primary/5 transition-colors">
                  <v.icon className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">{v.title}</h3>
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
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Our Journey</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground">Key Milestones</h2>
            </div>
          </AnimatedSection>
          <div className="max-w-2xl mx-auto space-y-0">
            {milestones.map((m, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="flex gap-6 pb-8 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-primary shrink-0" />
                    {i < milestones.length - 1 && <div className="w-0.5 flex-1 bg-primary/20 mt-1" />}
                  </div>
                  <div className="-mt-1">
                    <p className="text-primary font-bold text-sm">{m.year}</p>
                    <p className="text-foreground text-sm mt-1">{m.event}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
