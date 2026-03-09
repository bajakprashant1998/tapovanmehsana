import { AnimatedSection } from "@/components/AnimatedSection";
import { Quote } from "lucide-react";

const PrincipalMessage = () => (
  <section className="section-padding bg-card overflow-hidden">
    <div className="container-custom">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Image Side */}
        <AnimatedSection>
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl bg-gradient-navy overflow-hidden shadow-2xl">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 rounded-full bg-primary/20 mx-auto mb-6 flex items-center justify-center">
                    <span className="font-display text-5xl font-bold text-primary">P</span>
                  </div>
                  <p className="text-secondary-foreground/80 font-display text-xl font-bold">Principal</p>
                  <p className="text-secondary-foreground/50 text-sm mt-1">Tapovan International School</p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-primary/20 -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-xl bg-accent/20 -z-10" />
          </div>
        </AnimatedSection>

        {/* Content Side */}
        <AnimatedSection delay={0.2}>
          <div>
            <span className="text-primary text-sm font-bold uppercase tracking-widest">From the Principal's Desk</span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-3 text-foreground tracking-tight leading-tight">
              A Warm Welcome to Our School Family
            </h2>

            <div className="relative mt-8">
              <Quote className="absolute -top-2 -left-2 h-10 w-10 text-primary/15" />
              <div className="space-y-4 pl-6 border-l-4 border-primary/30">
                <p className="text-muted-foreground leading-relaxed text-base">
                  At Tapovan International School, we believe that education is not just about academic excellence—it's about nurturing compassionate, curious, and confident individuals who can make a positive impact on the world.
                </p>
                <p className="text-muted-foreground leading-relaxed text-base">
                  Our 15-acre campus on the Ahmedabad–Mehsana Highway provides the perfect environment for learning and growth. With state-of-the-art facilities, dedicated faculty, and a curriculum that balances academics with sports, arts, and life skills, we ensure every child thrives.
                </p>
                <p className="text-muted-foreground leading-relaxed text-base">
                  I invite you to visit our campus and experience the Tapovan difference. Together, let us build a brighter future for your child.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="font-display text-lg font-bold text-foreground">The Principal</p>
              <p className="text-sm text-muted-foreground">Tapovan International School, Mehsana</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default PrincipalMessage;
