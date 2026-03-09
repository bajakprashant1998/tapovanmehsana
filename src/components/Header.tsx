import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, MapPin, LogIn, ChevronDown, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/tis-logo.png";

const megaMenus: Record<string, { label: string; path: string; desc?: string }[]> = {
  About: [
    { label: "Our Story", path: "/about", desc: "History, vision & mission" },
    { label: "Mandatory Disclosure", path: "/mandatory-disclosure", desc: "CBSE compliance info" },
    { label: "Alumni", path: "/alumni", desc: "Our proud alumni network" },
    { label: "Careers", path: "/careers", desc: "Join our team" },
  ],
  Academics: [
    { label: "Curriculum", path: "/academics", desc: "CBSE curriculum overview" },
    { label: "Results", path: "/results", desc: "Board & exam results" },
    { label: "Events", path: "/events", desc: "School events & activities" },
  ],
  Campus: [
    { label: "Facilities", path: "/facilities", desc: "World-class infrastructure" },
    { label: "Residential Life", path: "/residential-life", desc: "Hostel & boarding" },
    { label: "Gallery", path: "/gallery", desc: "Photo gallery" },
  ],
};

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about", mega: "About" },
  { label: "Academics", path: "/academics", mega: "Academics" },
  { label: "Campus", path: "/facilities", mega: "Campus" },
  { label: "Admissions", path: "/admissions" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const megaTimeout = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveMega(null);
  }, [location]);

  const handleMegaEnter = (key: string) => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setActiveMega(key);
  };

  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setActiveMega(null), 200);
  };

  const transparent = isHome && !scrolled;

  return (
    <>
      {/* Top Info Bar */}
      <div className={`hidden lg:block transition-all duration-300 ${scrolled ? "h-0 opacity-0 overflow-hidden" : "h-auto opacity-100"} ${transparent ? "bg-secondary/80 backdrop-blur-sm" : "bg-secondary"}`}>
        <div className="container-custom flex items-center justify-between h-10 text-xs">
          <div className="flex items-center gap-5 text-secondary-foreground/80">
            <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Phone className="h-3 w-3" /> +91 98765 43210
            </a>
            <a href="mailto:info@tapovanschool.net" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Mail className="h-3 w-3" /> info@tapovanschool.net
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-primary" /> Ahmedabad–Mehsana Highway
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 mr-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
            <Link to="/portal" className="text-secondary-foreground/80 hover:text-primary transition-colors font-medium">
              <LogIn className="h-3 w-3 inline mr-1" />Portal Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-card/98 backdrop-blur-xl shadow-lg border-b border-border/50"
            : transparent
              ? "bg-transparent"
              : "bg-card border-b border-border/30"
        }`}
      >
        <div className="container-custom flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img
              src={logo}
              alt="Tapovan International School"
              className="h-12 w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <div className="hidden sm:block">
              <p className={`font-display text-lg font-bold leading-tight transition-colors duration-300 ${transparent ? "text-white" : "text-secondary"}`}>
                Tapovan International
              </p>
              <p className={`text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 ${transparent ? "text-white/50" : "text-muted-foreground"}`}>
                School
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.mega && handleMegaEnter(item.mega)}
                onMouseLeave={handleMegaLeave}
              >
                <Link
                  to={item.path}
                  className={`px-3.5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-1 ${
                    location.pathname === item.path
                      ? "text-primary"
                      : transparent
                        ? "text-white/90 hover:text-white hover:bg-white/10"
                        : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {item.label}
                  {item.mega && <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${activeMega === item.mega ? "rotate-180" : ""}`} />}
                </Link>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {item.mega && activeMega === item.mega && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 pt-2 z-50"
                      onMouseEnter={() => handleMegaEnter(item.mega!)}
                      onMouseLeave={handleMegaLeave}
                    >
                      <div className="bg-card rounded-xl shadow-2xl border border-border/60 p-2 min-w-[280px] backdrop-blur-xl">
                        {megaMenus[item.mega!].map((sub) => (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            className="flex flex-col gap-0.5 px-4 py-3 rounded-lg hover:bg-primary/5 transition-colors group"
                          >
                            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                              {sub.label}
                            </span>
                            {sub.desc && (
                              <span className="text-xs text-muted-foreground">{sub.desc}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2.5">
            <Link to="/portal" className="hidden lg:block">
              <Button
                variant="ghost"
                size="sm"
                className={`font-semibold ${transparent ? "text-white/90 hover:bg-white/10 hover:text-white" : "text-foreground hover:text-primary"}`}
              >
                <LogIn className="h-4 w-4 mr-1.5" /> Portal
              </Button>
            </Link>
            <Link to="/admissions" className="hidden md:block">
              <Button size="sm" className="bg-primary hover:bg-saffron-dark text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all">
                Apply Now
              </Button>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${transparent ? "text-white hover:bg-white/10" : "hover:bg-muted"}`}
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
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-card/98 backdrop-blur-xl border-t border-border overflow-hidden"
            >
              <nav className="container-custom py-4 flex flex-col gap-0.5">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <Link
                      to={item.path}
                      className={`px-4 py-3 rounded-lg text-base font-semibold transition-colors block ${
                        location.pathname === item.path
                          ? "text-primary bg-primary/5"
                          : "text-foreground hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      {item.label}
                    </Link>
                    {item.mega && megaMenus[item.mega].map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className="block px-8 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                ))}
                <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                  <Link to="/portal" className="flex-1">
                    <Button variant="outline" className="w-full font-semibold">
                      <LogIn className="h-4 w-4 mr-1.5" /> Portal
                    </Button>
                  </Link>
                  <Link to="/admissions" className="flex-1">
                    <Button className="w-full bg-primary hover:bg-saffron-dark text-primary-foreground font-semibold">
                      Apply Now
                    </Button>
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
