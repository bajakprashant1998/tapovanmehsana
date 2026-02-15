import { AnimatedSection } from "@/components/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Lightbulb, Palette, Trophy, Music, Code, FlaskConical, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const grades = [
  { level: "Pre-Primary", range: "Nursery, LKG, UKG", desc: "Play-based learning with focus on foundational skills, creativity, and social development.", color: "from-primary to-saffron-light" },
  { level: "Primary School", range: "Classes I – V", desc: "Strong academic foundation with activity-based learning, language skills, and value education.", color: "from-accent to-gold-light" },
  { level: "Middle School", range: "Classes VI – VIII", desc: "Deeper subject exploration with project-based learning and critical thinking development.", color: "from-secondary to-navy-light" },
  { level: "Secondary School", range: "Classes IX – X", desc: "Board exam preparation with comprehensive subject coverage and exam strategies.", color: "from-primary to-saffron-light" },
  { level: "Senior Secondary", range: "Classes XI – XII", desc: "Specialized streams with career guidance and competitive exam preparation.", color: "from-accent to-gold-light" },
];

const streams = [
  { title: "Science", icon: FlaskConical, subjects: "Physics, Chemistry, Biology/Mathematics, Computer Science", bg: "bg-secondary text-secondary-foreground" },
  { title: "Commerce", icon: Globe, subjects: "Accountancy, Business Studies, Economics, Mathematics", bg: "bg-gradient-primary text-primary-foreground" },
  { title: "Humanities", icon: Lightbulb, subjects: "History, Geography, Political Science, Psychology, Sociology", bg: "bg-accent/15 text-foreground border border-accent/20" },
];

const activities = [
  { icon: Trophy, label: "Sports & Athletics" },
  { icon: Music, label: "Music & Dance" },
  { icon: Palette, label: "Art & Craft" },
  { icon: Code, label: "Robotics & Coding" },
  { icon: Globe, label: "Model United Nations" },
  { icon: Lightbulb, label: "Science Olympiads" },
];

const Academics = () => {
  return (
    <div className="pt-20">
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-custom">
          <div className="max-w-3xl">
            <AnimatedSection>
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Academics</span>
              <h1 className="font-display text-5xl md:text-6xl font-extrabold mt-3 leading-[1] tracking-tight">Academic Excellence</h1>
              <p className="text-secondary-foreground/70 text-lg mt-6 max-w-xl">
                Our CBSE-aligned curriculum blends rigorous academics with experiential learning 
                to prepare students for a rapidly evolving world.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Our Approach</span>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-3 text-foreground tracking-tight">Teaching Methodology</h2>
              <p className="text-muted-foreground mt-6 leading-relaxed text-lg">
                We employ a student-centered approach combining traditional classroom instruction with 
                modern pedagogical techniques — including project-based learning, collaborative work, 
                digital tools, and hands-on experiments.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Grade Levels */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Grade Levels</span>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-3 text-foreground tracking-tight">From Foundation to Future</h2>
            </div>
          </AnimatedSection>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {grades.map((g, i) => (
              <AnimatedSection key={i} delay={i * 0.08} className={i === grades.length - 1 ? "md:col-span-2 md:max-w-md md:mx-auto" : ""}>
                <div className="relative overflow-hidden rounded-2xl bg-card border border-border hover:shadow-xl transition-shadow h-full">
                  <div className={`h-1.5 bg-gradient-to-r ${g.color}`} />
                  <div className="p-6 flex items-start gap-4">
                    <GraduationCap className="h-8 w-8 text-primary shrink-0 mt-1" />
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground">{g.level}</h3>
                      <p className="text-primary text-sm font-semibold">{g.range}</p>
                      <p className="text-muted-foreground text-sm mt-2">{g.desc}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Streams — Bento */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Senior Secondary</span>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-3 text-foreground tracking-tight">Streams Offered</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {streams.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className={`rounded-2xl p-8 h-full flex flex-col justify-between min-h-[200px] ${s.bg} hover:shadow-xl transition-shadow`}>
                  <s.icon className="h-10 w-10 mb-4 opacity-80" />
                  <div>
                    <h3 className="font-display text-2xl font-extrabold mb-2">{s.title}</h3>
                    <p className="text-sm opacity-70">{s.subjects}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Co-curricular */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Beyond Academics</span>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-3 text-foreground tracking-tight">Co-curricular Activities</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {activities.map((a, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="bg-card rounded-2xl p-6 text-center hover:shadow-lg transition-all group border border-border hover:border-primary/20">
                  <a.icon className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-semibold text-foreground">{a.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.4}>
            <div className="text-center mt-12">
              <Link to="/admissions">
                <Button size="lg" className="bg-primary hover:bg-saffron-dark text-primary-foreground px-8 py-6 font-semibold shadow-xl">
                  Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Academics;
