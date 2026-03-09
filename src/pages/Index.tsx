import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedSection, Counter } from "@/components/AnimatedSection";
import HeroSlider from "@/components/home/HeroSlider";
import WhyTapovan from "@/components/home/WhyTapovan";
import AcademicsOverview from "@/components/home/AcademicsOverview";
import PrincipalMessage from "@/components/home/PrincipalMessage";
import VideoTour from "@/components/home/VideoTour";
import {
  Star, Calendar, ArrowRight
} from "lucide-react";

const highlights = [
  { end: 25, suffix: "+", label: "Years of Excellence" },
  { end: 3000, suffix: "+", label: "Students" },
  { end: 15, suffix: "", label: "Acre Campus" },
  { end: 100, suffix: "%", label: "CBSE Results" },
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
      {/* Hero Slider */}
      <HeroSlider />

      {/* Stats with Parallax Effect */}
      <section className="relative -mt-20 z-20 pb-8">
        <div className="container-custom">
          <div className="bg-card rounded-2xl shadow-2xl border border-border p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {highlights.map((h, i) => (
              <Counter key={i} end={h.end} suffix={h.suffix} label={h.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Tapovan Bento Grid */}
      <WhyTapovan />

      {/* Principal's Message */}
      <PrincipalMessage />

      {/* Academics Overview */}
      <AcademicsOverview />

      {/* Video Tour */}
      <VideoTour />

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
            {testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-secondary-foreground/5 rounded-2xl p-7 border border-secondary-foreground/10 hover:border-primary/30 transition-colors h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                    ))}
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
            ))}
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
            {news.map((n, i) => (
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
            ))}
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
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 py-6">
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
