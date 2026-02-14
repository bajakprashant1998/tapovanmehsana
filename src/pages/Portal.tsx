import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Monitor, BookOpen, MessageSquare, CreditCard, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: Monitor, label: "Live Dashboard" },
  { icon: BookOpen, label: "Homework & Grades" },
  { icon: MessageSquare, label: "Teacher Communication" },
  { icon: CreditCard, label: "Fee Payment" },
  { icon: Bell, label: "Announcements" },
];

const Portal = () => {
  return (
    <div className="pt-20">
      <section className="min-h-[80vh] flex items-center section-padding bg-muted">
        <div className="container-custom text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Coming Soon
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Student & Parent Portal
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
              A dedicated online portal for students and parents to track academics, 
              communicate with teachers, and stay updated — launching soon.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="flex flex-wrap gap-4 justify-center mb-10">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 bg-card rounded-lg px-4 py-3 shadow-sm">
                  <f.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">{f.label}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <Link to="/contact">
              <Button className="bg-primary hover:bg-saffron-dark text-primary-foreground px-8 py-6 text-base font-semibold">
                Get Notified When It Launches
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Portal;
