import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/tis-logo.png";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Academics", path: "/academics" },
  { label: "Facilities", path: "/facilities" },
  { label: "Admissions", path: "/admissions" },
  { label: "Residential Life", path: "/residential-life" },
  { label: "Gallery", path: "/gallery" },
  { label: "Careers", path: "/careers" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-card/95 backdrop-blur-md shadow-lg"
        : "bg-transparent"
        }`}
    >
      <div className="container-custom flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Tapovan International School" className="h-14 w-auto" />
          <div className="hidden sm:block">
            <p className={`font-display text-lg font-bold leading-tight transition-colors ${scrolled || location.pathname !== "/" ? "text-secondary" : "text-white"}`}>
              Tapovan International
            </p>
            <p className={`text-xs tracking-wider uppercase transition-colors ${scrolled || location.pathname !== "/" ? "text-muted-foreground" : "text-white/60"}`}>School</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${location.pathname === item.path
                  ? "text-primary"
                  : scrolled || location.pathname !== "/"
                    ? "text-foreground hover:text-primary hover:bg-primary/5"
                    : "text-white hover:text-primary"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/admissions">
            <Button className="hidden md:inline-flex bg-primary hover:bg-saffron-dark text-primary-foreground font-semibold shadow-lg">
              Apply Now
            </Button>
          </Link>
          <a href="tel:+919876543210" className="hidden md:inline-flex">
            <Button variant="outline" size="icon" className="border-primary/30 text-primary hover:bg-primary/10">
              <Phone className="h-4 w-4" />
            </Button>
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-muted"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card/98 backdrop-blur-md border-t border-border"
          >
            <nav className="container-custom py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${location.pathname === item.path
                    ? "text-primary"
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/admissions" className="mt-2">
                <Button className="w-full bg-primary hover:bg-saffron-dark text-primary-foreground font-semibold">
                  Apply Now
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header >
  );
};

export default Header;
