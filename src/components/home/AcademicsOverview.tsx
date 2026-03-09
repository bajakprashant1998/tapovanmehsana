import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { GraduationCap, ChevronRight } from "lucide-react";

const levels = [
  { level: "Pre-Primary", grades: "Nursery – KG", color: "from-primary to-saffron-light" },
  { level: "Primary", grades: "Classes I – V", color: "from-accent to-gold-light" },
  { level: "Secondary", grades: "Classes VI – X", color: "from-secondary to-navy-light" },
  { level: "Sr. Secondary", grades: "Classes XI – XII", color: "from-navy-dark to-secondary" },
];

const AcademicsOverview = () => (
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
        {levels.map((item, i) => (
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
        ))}
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
);

export default AcademicsOverview;
