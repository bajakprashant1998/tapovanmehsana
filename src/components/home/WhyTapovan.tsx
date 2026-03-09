import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/AnimatedSection";
import {
  BookOpen, Shield, Users, Building2, Bus, Microscope,
  Monitor, Trophy, ArrowRight, Sparkles
} from "lucide-react";

const WhyTapovan = () => (
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[180px]">
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

        <AnimatedSection delay={0.1}>
          <div className="h-full rounded-2xl bg-secondary p-6 flex flex-col justify-between text-secondary-foreground group hover:shadow-xl transition-shadow">
            <Monitor className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-display text-lg font-bold">Smart Classrooms</h3>
              <p className="text-secondary-foreground/60 text-xs mt-1">Interactive tech-enabled learning</p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="h-full rounded-2xl bg-muted p-6 flex flex-col justify-between group hover:shadow-xl transition-shadow border border-border">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">Safety & Security</h3>
              <p className="text-muted-foreground text-xs mt-1">24/7 CCTV, trained staff</p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="h-full rounded-2xl bg-muted p-6 flex flex-col justify-between group hover:shadow-xl transition-shadow border border-border">
            <Users className="h-8 w-8 text-accent" />
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">Expert Faculty</h3>
              <p className="text-muted-foreground text-xs mt-1">Qualified & experienced educators</p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.25}>
          <div className="h-full rounded-2xl bg-accent/15 p-6 flex flex-col justify-between group hover:shadow-xl transition-shadow border border-accent/20">
            <Building2 className="h-8 w-8 text-accent" />
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">Residential Life</h3>
              <p className="text-muted-foreground text-xs mt-1">Home-like hostel with care</p>
            </div>
          </div>
        </AnimatedSection>

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

        <AnimatedSection delay={0.35}>
          <div className="h-full rounded-2xl bg-primary/10 p-6 flex flex-col justify-between group hover:shadow-xl transition-shadow border border-primary/15">
            <Bus className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">Transport Fleet</h3>
              <p className="text-muted-foreground text-xs mt-1">GPS-tracked buses on highway</p>
            </div>
          </div>
        </AnimatedSection>

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
);

export default WhyTapovan;
