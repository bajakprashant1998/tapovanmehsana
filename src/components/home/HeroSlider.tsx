import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import heroBg from "@/assets/hero-campus.jpg";

const slides = [
  {
    tag: "CBSE Affiliated • Day Boarding & Residential",
    title: <>Shaping Tomorrow's <span className="text-primary">Leaders</span> Today</>,
    desc: "A premier international school on the Ahmedabad–Mehsana Highway offering world-class education, modern campus, and holistic development.",
    cta: "Admissions Open 2025-26",
    ctaLink: "/admissions",
  },
  {
    tag: "15-Acre World-Class Campus",
    title: <>Where <span className="text-primary">Excellence</span> Meets Opportunity</>,
    desc: "Smart classrooms, advanced labs, sports complex, and a nurturing residential facility — all in one campus.",
    cta: "Explore Facilities",
    ctaLink: "/facilities",
  },
  {
    tag: "100% CBSE Board Results",
    title: <>Academic <span className="text-primary">Brilliance</span>, Proven Results</>,
    desc: "Our students consistently achieve outstanding board results, with top rankers across science, commerce, and humanities streams.",
    cta: "View Results",
    ctaLink: "/results",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  const textVariants = {
    enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, y: 0 },
    exit: (dir: number) => ({ opacity: 0, y: dir > 0 ? -40 : 40 }),
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Ken Burns effect */}
      <motion.div
        key={current}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 via-secondary/60 to-secondary/90" />

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-secondary-foreground pt-20 max-w-4xl mx-auto">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-sm font-semibold mb-6 border border-primary/30 text-primary-foreground">
              {slide.tag}
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] mb-6 tracking-tight">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl text-secondary-foreground/80 max-w-2xl mx-auto mb-8">
              {slide.desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={slide.ctaLink}>
                <Button size="lg" className="bg-primary hover:bg-saffron-dark text-primary-foreground text-base px-8 py-6 font-semibold shadow-xl">
                  {slide.cta} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="bg-transparent border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10 text-base px-8 py-6">
                  Explore Our School
                </Button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2.5 rounded-full transition-all duration-500 ${i === current ? "w-10 bg-primary" : "w-2.5 bg-white/40 hover:bg-white/60"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
