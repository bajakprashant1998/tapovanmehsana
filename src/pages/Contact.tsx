import { useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Contact Inquiry\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nMessage: ${form.message}`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(text)}`, "_blank");
    toast({ title: "Redirecting to WhatsApp", description: "Your message is being sent." });
  };

  return (
    <div className="pt-20">
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-custom text-center">
          <AnimatedSection>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Contact</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">Get in Touch</h1>
            <p className="text-secondary-foreground/70 text-lg mt-4 max-w-2xl mx-auto">
              We'd love to hear from you. Reach out for admissions, campus visits, or any inquiries.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Info */}
            <div>
              <AnimatedSection>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Contact Details</h2>
              </AnimatedSection>
              <div className="space-y-5">
                {[
                  { icon: MapPin, label: "Address", value: "Ahmedabad–Mehsana Highway, Nr. Kadi, Gujarat, India" },
                  { icon: Phone, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
                  { icon: Mail, label: "Email", value: "info@tapovanschool.net", href: "mailto:info@tapovanschool.net" },
                  { icon: Clock, label: "Office Hours", value: "Monday – Saturday: 8:00 AM – 5:00 PM" },
                ].map((item, i) => (
                  <AnimatedSection key={i} delay={i * 0.1}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-muted-foreground">{item.value}</p>
                        )}
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              {/* Map */}
              <AnimatedSection delay={0.4}>
                <div className="mt-8 rounded-xl overflow-hidden border border-border">
                  <iframe
                    title="Tapovan International School Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.0!2d72.3!3d23.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDE4JzAwLjAiTiA3MsKwMTgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </AnimatedSection>
            </div>

            {/* Form */}
            <AnimatedSection delay={0.2}>
              <Card className="shadow-xl border-primary/10">
                <CardContent className="p-8">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} required />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-saffron-dark text-primary-foreground py-6 font-semibold">
                      Send via WhatsApp <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
