import { useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, ArrowRight, Calendar, FileText, UserCheck, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const steps = [
  { icon: FileText, title: "Submit Inquiry", desc: "Fill out the online admission form with your details." },
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
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    student_name: "", parent_name: "", phone: "", email: "",
    applying_for_class: "", date_of_birth: "", gender: "",
    previous_school: "", address: "", city: "", message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("admissions").insert({
      student_name: form.student_name,
      parent_name: form.parent_name,
      phone: form.phone,
      email: form.email,
      applying_for_class: form.applying_for_class,
      date_of_birth: form.date_of_birth || null,
      gender: form.gender || null,
      previous_school: form.previous_school || null,
      address: form.address || null,
      city: form.city || null,
      message: form.message || null,
    });

    setLoading(false);

    if (error) {
      toast({ title: "Error submitting", description: error.message, variant: "destructive" });
    } else {
      setSubmitted(true);
      toast({ title: "Application Submitted!", description: "We will contact you soon." });
    }
  };

  return (
    <div className="pt-20">
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-custom text-center">
          <AnimatedSection>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Admissions 2026-27</span>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold mt-3">Join the Tapovan Family</h1>
            <p className="text-secondary-foreground/70 text-lg mt-4 max-w-2xl mx-auto">
              Admissions are open. Take the first step towards a world-class education for your child.
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
              <h2 className="font-display text-3xl md:text-4xl font-extrabold mt-2 text-foreground">Admission Steps</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <s.icon className="h-8 w-8 text-primary" />
                  </div>
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
              <h2 className="font-display text-3xl md:text-4xl font-extrabold mt-2 text-foreground">Age & Grade Criteria</h2>
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

      {/* Admission Form */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-8">
                <span className="text-primary text-sm font-semibold uppercase tracking-wider">Apply Now</span>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold mt-2 text-foreground">Online Admission Form</h2>
                <p className="text-muted-foreground mt-2">Fill in the details below. Our team will review and contact you.</p>
              </div>
            </AnimatedSection>

            {submitted ? (
              <AnimatedSection>
                <Card className="shadow-xl border-primary/10">
                  <CardContent className="p-12 text-center">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h3 className="font-display text-2xl font-extrabold text-foreground mb-2">Application Submitted!</h3>
                    <p className="text-muted-foreground">Thank you for your interest. Our admissions team will review your application and contact you within 2-3 working days.</p>
                    <Button className="mt-6 bg-primary hover:bg-saffron-dark text-primary-foreground" onClick={() => setSubmitted(false)}>
                      Submit Another Application
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ) : (
              <AnimatedSection delay={0.1}>
                <Card className="shadow-xl border-primary/10">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="student_name">Student Name *</Label>
                          <Input id="student_name" value={form.student_name} onChange={(e) => setForm({ ...form, student_name: e.target.value })} required placeholder="Full name of student" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="parent_name">Parent/Guardian Name *</Label>
                          <Input id="parent_name" value={form.parent_name} onChange={(e) => setForm({ ...form, parent_name: e.target.value })} required placeholder="Parent name" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required placeholder="email@example.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required placeholder="+91 XXXXX XXXXX" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="class">Applying for Class *</Label>
                          <Input id="class" value={form.applying_for_class} onChange={(e) => setForm({ ...form, applying_for_class: e.target.value })} required placeholder="e.g. Class V" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dob">Date of Birth</Label>
                          <Input id="dob" type="date" value={form.date_of_birth} onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender</Label>
                          <select id="gender" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="previous_school">Previous School</Label>
                          <Input id="previous_school" value={form.previous_school} onChange={(e) => setForm({ ...form, previous_school: e.target.value })} placeholder="Name of previous school" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Full address" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Additional Message</Label>
                        <Textarea id="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Any specific questions or requirements..." rows={3} />
                      </div>
                      <Button type="submit" className="w-full bg-primary hover:bg-saffron-dark text-primary-foreground text-base py-6 font-semibold shadow-lg" disabled={loading}>
                        {loading ? "Submitting..." : "Submit Application"} <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </AnimatedSection>
            )}
          </div>
        </div>
      </section>

      {/* Campus Visit CTA */}
      <section className="section-padding bg-gradient-primary text-primary-foreground">
        <div className="container-custom text-center">
          <AnimatedSection>
            <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-80" />
            <h2 className="font-display text-3xl md:text-4xl font-extrabold mb-4">Book a Campus Visit</h2>
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
