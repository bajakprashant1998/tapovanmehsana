import { AnimatedSection } from "@/components/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Lightbulb, Palette, Trophy, Music, Code, FlaskConical, Globe } from "lucide-react";

const grades = [
  { level: "Pre-Primary", range: "Nursery, LKG, UKG", desc: "Play-based learning with focus on foundational skills, creativity, and social development.", color: "border-l-primary" },
  { level: "Primary School", range: "Classes I – V", desc: "Strong academic foundation with activity-based learning, language skills, and value education.", color: "border-l-accent" },
  { level: "Middle School", range: "Classes VI – VIII", desc: "Deeper subject exploration with project-based learning and critical thinking development.", color: "border-l-secondary" },
  { level: "Secondary School", range: "Classes IX – X", desc: "Board exam preparation with comprehensive subject coverage and exam strategies.", color: "border-l-primary" },
  { level: "Senior Secondary", range: "Classes XI – XII", desc: "Specialized streams with career guidance and competitive exam preparation.", color: "border-l-accent" },
];

const streams = [
  { title: "Science", icon: FlaskConical, subjects: "Physics, Chemistry, Biology/Mathematics, Computer Science" },
  { title: "Commerce", icon: Globe, subjects: "Accountancy, Business Studies, Economics, Mathematics" },
  { title: "Humanities", icon: Lightbulb, subjects: "History, Geography, Political Science, Psychology, Sociology" },
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
        <div className="container-custom text-center">
          <AnimatedSection>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Academics</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">Academic Excellence</h1>
            <p className="text-secondary-foreground/70 text-lg mt-4 max-w-2xl mx-auto">
              Our CBSE-aligned curriculum blends rigorous academics with experiential learning 
              to prepare students for a rapidly evolving world.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Approach */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Our Approach</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground">Teaching Methodology</h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                We employ a student-centered approach combining traditional classroom instruction with 
                modern pedagogical techniques — including project-based learning, collaborative work, 
                digital tools, and hands-on experiments. Our goal is to foster curiosity, critical thinking, 
                and a deep understanding of concepts rather than rote memorization.
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
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Grade Levels</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground">From Foundation to Future</h2>
            </div>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto space-y-4">
            {grades.map((g, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <Card className={`border-l-4 ${g.color} hover:shadow-lg transition-shadow`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <GraduationCap className="h-8 w-8 text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="font-display text-xl font-semibold text-foreground">{g.level}</h3>
                        <p className="text-primary text-sm font-medium">{g.range}</p>
                        <p className="text-muted-foreground text-sm mt-2">{g.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Streams */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Senior Secondary</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground">Streams Offered</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {streams.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <Card className="h-full hover:shadow-lg transition-shadow text-center">
                  <CardContent className="p-8">
                    <s.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.subjects}</p>
                  </CardContent>
                </Card>
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
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Beyond Academics</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground">Co-curricular Activities</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {activities.map((a, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="bg-card rounded-xl p-6 text-center hover:shadow-md transition-all group">
                  <a.icon className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium text-foreground">{a.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academics;
