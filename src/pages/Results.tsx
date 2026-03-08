import { AnimatedSection } from "@/components/AnimatedSection";
import { Trophy, Star, TrendingUp, Medal, Award } from "lucide-react";

const boardResults = [
  {
    year: "2025–26",
    classX: { passRate: "100%", distinction: "85%", topScore: "498/500" },
    classXII: { passRate: "100%", distinction: "78%", topScore: "495/500" },
  },
  {
    year: "2024–25",
    classX: { passRate: "100%", distinction: "82%", topScore: "496/500" },
    classXII: { passRate: "99.5%", distinction: "75%", topScore: "490/500" },
  },
  {
    year: "2023–24",
    classX: { passRate: "100%", distinction: "80%", topScore: "492/500" },
    classXII: { passRate: "100%", distinction: "72%", topScore: "488/500" },
  },
];

const toppers = [
  { name: "Aanya Patel", class: "Class XII Science", score: "99.2%", year: "2025–26" },
  { name: "Rohan Sharma", class: "Class XII Commerce", score: "98.8%", year: "2025–26" },
  { name: "Kavya Desai", class: "Class X", score: "99.6%", year: "2025–26" },
  { name: "Arjun Mehta", class: "Class XII Humanities", score: "98.4%", year: "2025–26" },
  { name: "Ishita Joshi", class: "Class X", score: "99.4%", year: "2025–26" },
  { name: "Dhruv Patel", class: "Class XII Science", score: "98.6%", year: "2025–26" },
];

const achievements = [
  {
    icon: Trophy,
    title: "State-Level Science Olympiad Winners",
    description: "5 students secured top positions in Gujarat State Science Olympiad 2025.",
  },
  {
    icon: Medal,
    title: "National Sports Champions",
    description: "3 students represented Gujarat in CBSE National Athletics Meet.",
  },
  {
    icon: Star,
    title: "NTSE Scholarship Holders",
    description: "8 students qualified for National Talent Search Examination scholarships.",
  },
  {
    icon: Award,
    title: "Best School Award — Gujarat",
    description: "Recognized as one of the Top 10 CBSE Schools in Gujarat by Education Today.",
  },
  {
    icon: TrendingUp,
    title: "100% Board Pass Rate",
    description: "Consistent 100% pass rate in Class X and XII CBSE board exams for 10+ years.",
  },
  {
    icon: Trophy,
    title: "Inter-School Debate Champions",
    description: "Won the All-Gujarat Inter-School Debate Championship for 3 consecutive years.",
  },
];

const Results = () => {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-navy text-white section-padding">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold mb-4">
              Results & Achievements
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              A legacy of academic excellence — celebrating outstanding board results, toppers, and awards.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Board Results */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-2">
              CBSE Board Results
            </h2>
            <p className="text-muted-foreground mb-10">Consistently outstanding performance year after year.</p>
          </AnimatedSection>

          <div className="space-y-6">
            {boardResults.map((result, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-display text-xl font-bold text-primary mb-4">{result.year}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Class X */}
                    <div className="bg-muted/50 rounded-xl p-5">
                      <h4 className="font-display text-lg font-bold text-foreground mb-3">Class X</h4>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="font-display text-2xl font-extrabold text-primary">{result.classX.passRate}</p>
                          <p className="text-xs text-muted-foreground">Pass Rate</p>
                        </div>
                        <div>
                          <p className="font-display text-2xl font-extrabold text-secondary">{result.classX.distinction}</p>
                          <p className="text-xs text-muted-foreground">Distinction</p>
                        </div>
                        <div>
                          <p className="font-display text-2xl font-extrabold text-accent-foreground">{result.classX.topScore}</p>
                          <p className="text-xs text-muted-foreground">Top Score</p>
                        </div>
                      </div>
                    </div>
                    {/* Class XII */}
                    <div className="bg-muted/50 rounded-xl p-5">
                      <h4 className="font-display text-lg font-bold text-foreground mb-3">Class XII</h4>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="font-display text-2xl font-extrabold text-primary">{result.classXII.passRate}</p>
                          <p className="text-xs text-muted-foreground">Pass Rate</p>
                        </div>
                        <div>
                          <p className="font-display text-2xl font-extrabold text-secondary">{result.classXII.distinction}</p>
                          <p className="text-xs text-muted-foreground">Distinction</p>
                        </div>
                        <div>
                          <p className="font-display text-2xl font-extrabold text-accent-foreground">{result.classXII.topScore}</p>
                          <p className="text-xs text-muted-foreground">Top Score</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Toppers */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-2">
              Our Toppers
            </h2>
            <p className="text-muted-foreground mb-10">Students who made us proud with their exceptional performance.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {toppers.map((topper, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-card rounded-2xl border border-border p-6 text-center hover:shadow-lg transition-all">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Trophy className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground">{topper.name}</h3>
                  <p className="text-sm text-primary font-semibold mb-1">{topper.class}</p>
                  <p className="font-display text-3xl font-extrabold text-secondary">{topper.score}</p>
                  <p className="text-xs text-muted-foreground mt-1">{topper.year}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-2">
              Awards & Achievements
            </h2>
            <p className="text-muted-foreground mb-10">Recognition that reflects our commitment to excellence.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Results;
