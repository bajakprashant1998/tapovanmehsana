import { useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Briefcase, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const openings = [
  { title: "PGT – Physics", department: "Senior Secondary", type: "Full-Time" },
  { title: "TGT – English", department: "Middle School", type: "Full-Time" },
  { title: "PRT – Mathematics", department: "Primary School", type: "Full-Time" },
  { title: "Sports Coach – Cricket", department: "Sports", type: "Full-Time" },
  { title: "Front Office Executive", department: "Administration", type: "Full-Time" },
];

const Careers = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", position: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Application for ${form.position} – ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nPosition: ${form.position}\n\n${form.message}`);
    window.open(`mailto:careers@tapovanschool.net?subject=${subject}&body=${body}`);
    toast({ title: "Opening email client", description: "Your application will be sent via email." });
  };

  return (
    <div className="pt-20">
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-custom text-center">
          <AnimatedSection>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Careers</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">Join Our Team</h1>
            <p className="text-secondary-foreground/70 text-lg mt-4 max-w-2xl mx-auto">
              Be part of a passionate team shaping the future of education.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Openings */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Openings</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground">Current Positions</h2>
            </div>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto space-y-4">
            {openings.map((o, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Briefcase className="h-5 w-5 text-primary shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground">{o.title}</h3>
                        <p className="text-sm text-muted-foreground">{o.department} • {o.type}</p>
                      </div>
                    </div>
                    <a href="#apply">
                      <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                        Apply
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="section-padding bg-muted">
        <div className="container-custom max-w-2xl">
          <AnimatedSection>
            <div className="text-center mb-8">
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Apply</span>
              <h2 className="font-display text-3xl font-bold mt-2 text-foreground">Submit Your Application</h2>
              <p className="text-muted-foreground mt-2 text-sm">Send your resume to careers@tapovanschool.net</p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position Applying For</Label>
                    <Input id="position" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Cover Letter / Message</Label>
                    <Textarea id="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-saffron-dark text-primary-foreground py-6 font-semibold">
                    Send Application via Email <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Careers;
