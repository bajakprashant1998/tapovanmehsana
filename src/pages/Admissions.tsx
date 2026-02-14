import { useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, ArrowRight, Calendar, FileText, UserCheck, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { icon: FileText, title: "Submit Inquiry", desc: "Fill out the online inquiry form or visit the school office." },
  { icon: Calendar, title: "Campus Visit", desc: "Schedule and attend a guided campus tour with your family." },
  { icon: UserCheck, title: "Assessment", desc: "Age-appropriate assessment and interaction with the student." },
  { icon: CreditCard, title: "Enrollment", desc: "Complete admission formalities and fee payment." },
];

const eligibility = [
  { grade: "Nursery", age: "3+ years" },
  { grade: "LKG", age: "4+ years" },
  { grade: "UKG", age: "5+ years" },
  { grade: "Class I", age: "6+ years" },
  { grade: "Class II–VIII", age: "Age appropriate" },
  { grade: "Class IX", age: "Class VIII passed" },
  { grade: "Class XI", age: "Class X passed" },
];

const Admissions = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", email: "", grade: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Admission Inquiry\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nGrade: ${form.grade}\nMessage: ${form.message}`;
    const url = `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    toast({ title: "Redirecting to WhatsApp", description: "Your inquiry is being sent via WhatsApp." });
  };

  return (
    <div className="pt-20">
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-custom text-center">
          <AnimatedSection>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Admissions</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">Join the Tapovan Family</h1>
            <p className="text-secondary-foreground/70 text-lg mt-4 max-w-2xl mx-auto">
              Admissions are open for 2025-26. Take the first step towards a world-class education for your child.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Process</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground">Admission Steps</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="text-center relative">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <s.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute top-8 left-[60%] right-0 h-0.5 bg-primary/20 hidden lg:block last:hidden" />
                  <span className="text-primary font-bold text-sm">Step {i + 1}</span>
                  <h3 className="font-display text-lg font-semibold text-foreground mt-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">Eligibility</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground">Age & Grade Criteria</h2>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="max-w-lg mx-auto">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {eligibility.map((e, i) => (
                      <div key={i} className="flex justify-between items-center px-6 py-4">
                        <span className="font-medium text-foreground">{e.grade}</span>
                        <span className="text-muted-foreground text-sm">{e.age}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-8">
                <span className="text-primary text-sm font-semibold uppercase tracking-wider">Inquire Now</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground">Admission Inquiry</h2>
                <p className="text-muted-foreground mt-2">Fill in the details and we'll connect with you via WhatsApp.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <Card className="shadow-xl border-primary/10">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Parent/Guardian Name</Label>
                        <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Full name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required placeholder="+91 XXXXX XXXXX" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required placeholder="email@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="grade">Grade Applying For</Label>
                        <Input id="grade" value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} required placeholder="e.g. Class V" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea id="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Any specific questions or requirements..." rows={4} />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-saffron-dark text-primary-foreground text-base py-6 font-semibold shadow-lg">
                      Submit Inquiry via WhatsApp <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Campus Visit CTA */}
      <section className="section-padding bg-gradient-primary text-primary-foreground">
        <div className="container-custom text-center">
          <AnimatedSection>
            <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-80" />
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Book a Campus Visit</h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-6">
              Experience our campus firsthand. Schedule a guided tour and see why Tapovan is the right choice.
            </p>
            <a href="https://wa.me/919876543210?text=I%20would%20like%20to%20schedule%20a%20campus%20visit." target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-secondary hover:bg-navy-dark text-secondary-foreground px-8 py-6 font-semibold shadow-xl">
                Schedule Visit on WhatsApp
              </Button>
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Admissions;
