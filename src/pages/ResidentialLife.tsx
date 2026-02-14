import { AnimatedSection } from "@/components/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Heart, Utensils, Shield, Users, Sun, Moon, BookOpen } from "lucide-react";

const routine = [
  { time: "5:30 AM", activity: "Wake up & Morning Yoga", icon: Sun },
  { time: "6:30 AM", activity: "Breakfast", icon: Utensils },
  { time: "7:30 AM", activity: "School Assembly & Classes", icon: BookOpen },
  { time: "1:00 PM", activity: "Lunch Break", icon: Utensils },
  { time: "1:45 PM", activity: "Afternoon Classes", icon: BookOpen },
  { time: "3:30 PM", activity: "Sports & Activities", icon: Heart },
  { time: "5:00 PM", activity: "Evening Snacks & Free Time", icon: Utensils },
  { time: "6:00 PM", activity: "Supervised Study Hour", icon: BookOpen },
  { time: "8:00 PM", activity: "Dinner", icon: Utensils },
  { time: "9:30 PM", activity: "Lights Out", icon: Moon },
];

const features = [
  { icon: Shield, title: "24/7 Supervision", desc: "Experienced wardens and house parents ensure round-the-clock care and safety." },
  { icon: Heart, title: "Pastoral Care", desc: "Counselors and mentors available for emotional wellbeing and guidance." },
  { icon: Utensils, title: "Nutritious Meals", desc: "4 balanced meals daily prepared under strict hygiene and dietary standards." },
  { icon: Users, title: "Community Living", desc: "Students develop teamwork, empathy, and lifelong friendships." },
];

const ResidentialLife = () => {
  return (
    <div className="pt-20">
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-custom text-center">
          <AnimatedSection>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Residential Life</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">A Home Away from Home</h1>
            <p className="text-secondary-foreground/70 text-lg mt-4 max-w-2xl mx-auto">
              Our residential program offers a nurturing, structured environment where students 
              grow academically, socially, and personally.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <f.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Routine */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Daily Schedule</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground">A Day at the Hostel</h2>
            </div>
          </AnimatedSection>
          <div className="max-w-2xl mx-auto">
            <div className="space-y-0">
              {routine.map((r, i) => (
                <AnimatedSection key={i} delay={i * 0.05}>
                  <div className="flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-card transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <r.icon className="h-5 w-5 text-primary" />
                    </div>
                    <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-sm font-semibold text-primary w-20 shrink-0">{r.time}</span>
                    <span className="text-sm text-foreground">{r.activity}</span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Wellbeing */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Wellbeing</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground mb-6">Care & Nutrition</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our residential students receive four nutritious meals daily, regular health check-ups, 
                access to counselors, and a structured daily routine that balances academics, recreation, 
                and rest. Experienced wardens and house parents create a family-like atmosphere, ensuring 
                every child feels safe, valued, and supported.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default ResidentialLife;
