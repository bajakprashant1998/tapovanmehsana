import { AnimatedSection } from "@/components/AnimatedSection";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const upcomingEvents = [
  {
    title: "Annual Sports Day",
    date: "March 15, 2026",
    time: "8:00 AM – 4:00 PM",
    location: "School Sports Ground",
    description: "A day filled with athletic competitions, team sports, and fun activities for all grade levels.",
    category: "Sports",
    featured: true,
  },
  {
    title: "Science Exhibition",
    date: "April 5, 2026",
    time: "9:00 AM – 2:00 PM",
    location: "School Auditorium",
    description: "Students showcase innovative science projects and experiments across all disciplines.",
    category: "Academics",
    featured: false,
  },
  {
    title: "Parent-Teacher Meeting",
    date: "April 12, 2026",
    time: "10:00 AM – 1:00 PM",
    location: "Respective Classrooms",
    description: "Discuss your child's academic progress and development with class teachers.",
    category: "General",
    featured: false,
  },
  {
    title: "Cultural Fest — Tarang 2026",
    date: "May 1–3, 2026",
    time: "All Day",
    location: "School Campus",
    description: "Three days of dance, music, drama, art, and cultural performances by students.",
    category: "Cultural",
    featured: true,
  },
  {
    title: "Summer Camp Registration",
    date: "May 10, 2026",
    time: "9:00 AM – 12:00 PM",
    location: "Admin Office",
    description: "Register for exciting summer workshops in robotics, art, cricket, and swimming.",
    category: "General",
    featured: false,
  },
];

const academicCalendar = [
  { month: "April", events: ["New Session Begins", "Orientation Day for New Students"] },
  { month: "May", events: ["Summer Camp", "Unit Test I"] },
  { month: "June", events: ["World Environment Day Celebration", "Yoga Day"] },
  { month: "July", events: ["Van Mahotsav", "Inter-House Quiz Competition"] },
  { month: "August", events: ["Independence Day Celebration", "Raksha Bandhan Holiday"] },
  { month: "September", events: ["Teacher's Day Celebration", "Half-Yearly Exams"] },
  { month: "October", events: ["Gandhi Jayanti", "Navratri & Dussehra Break"] },
  { month: "November", events: ["Diwali Break", "Children's Day Celebration", "Science Exhibition"] },
  { month: "December", events: ["Annual Sports Day", "Winter Break Begins"] },
  { month: "January", events: ["Republic Day Celebration", "Unit Test III"] },
  { month: "February", events: ["Annual Function — Tarang", "Pre-Board Exams"] },
  { month: "March", events: ["Final Exams", "Result Declaration", "Session Ends"] },
];

const categoryColors: Record<string, string> = {
  Sports: "bg-primary/10 text-primary",
  Academics: "bg-secondary/10 text-secondary",
  Cultural: "bg-accent/20 text-accent-foreground",
  General: "bg-muted text-muted-foreground",
};

const Events = () => {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-navy text-white section-padding">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold mb-4">
              Events & Calendar
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Stay updated with school events, academic calendar, and important dates throughout the year.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-2">
              Upcoming Events
            </h2>
            <p className="text-muted-foreground mb-10">Don't miss out on these exciting happenings!</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className={`rounded-2xl border border-border bg-card p-6 hover:shadow-lg transition-all ${event.featured ? "md:col-span-1 ring-2 ring-primary/20" : ""}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[event.category]}`}>
                      {event.category}
                    </span>
                    {event.featured && (
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary text-primary-foreground">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{event.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-primary" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-primary" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-primary" />
                      {event.location}
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Calendar */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-2">
              Academic Calendar 2026–27
            </h2>
            <p className="text-muted-foreground mb-10">Month-wise overview of key academic and co-curricular activities.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {academicCalendar.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="bg-card rounded-xl p-5 border border-border hover:shadow-md transition-shadow">
                  <h3 className="font-display text-lg font-bold text-primary mb-3">{item.month}</h3>
                  <ul className="space-y-1.5">
                    {item.events.map((e, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-primary text-white text-center">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold mb-4">Want to Know More?</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Contact us to learn about upcoming events or to schedule a campus visit.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Events;
