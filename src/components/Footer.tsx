import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import logo from "@/assets/tis-logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Tapovan International School" className="h-12 w-auto brightness-0 invert" />
              <div>
                <p className="font-display text-lg font-bold leading-tight">Tapovan International</p>
                <p className="text-xs text-secondary-foreground/60 tracking-wider uppercase">School</p>
              </div>
            </div>
            <p className="text-sm text-secondary-foreground/70 leading-relaxed">
              A CBSE affiliated day-boarding and residential school on the Ahmedabad–Mehsana Highway, 
              offering holistic education in a world-class campus.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", path: "/about" },
                { label: "Academics", path: "/academics" },
                { label: "Admissions", path: "/admissions" },
                { label: "Facilities", path: "/facilities" },
                { label: "Gallery", path: "/gallery" },
                { label: "Careers", path: "/careers" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academics */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Academics</h4>
            <ul className="space-y-2.5">
              {["Pre-Primary", "Primary School", "Middle School", "Secondary School", "Senior Secondary", "Residential Life"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-secondary-foreground/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 text-primary shrink-0" />
                <span className="text-sm text-secondary-foreground/70">
                  Ahmedabad–Mehsana Highway, Gujarat, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a href="tel:+919876543210" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a href="mailto:info@tapovanschool.net" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  info@tapovanschool.net
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container-custom py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-secondary-foreground/50">
            © {new Date().getFullYear()} Tapovan International School. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-secondary-foreground/50 hover:text-secondary-foreground/80 cursor-pointer">
              Privacy Policy
            </span>
            <span className="text-xs text-secondary-foreground/50 hover:text-secondary-foreground/80 cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
