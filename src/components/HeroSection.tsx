import { motion } from "framer-motion";
import { MessageCircle, Mail, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import LeadForm from "./LeadForm";
import heroImage from "@/assets/hero-students.jpg";
import secondImage from "@/assets/heroimage.jpeg"; // <-- ADD YOUR IMAGE HERE
import secondImageMobile from "@/assets/heroimagemobile.jpeg"; // <-- ADD YOUR IMAGE HERE

import { subscribeToMenuState } from "./Header";

const HeroSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    subscribeToMenuState(setIsMenuOpen);
  }, []);

  const contacts = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "https://wa.me/918352010101",
    },
    {
      icon: Phone,
      label: "Call",
      href: "tel:+918352010101",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:info@eduflair.com",
    },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Students studying abroad"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
        </div>

        {/* Content */}
        <div className="section-container relative z-10 py-8 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Lead Form - First on mobile, with menu interaction */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: isMenuOpen ? 0.3 : 1,
                y: isMenuOpen ? 100 : 0,
                scale: isMenuOpen ? 0.95 : 1,
              }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative order-1 lg:order-2"
            >
              <div className="glass-card p-6 md:p-10">
                <div className="text-center mb-6 md:mb-8">
                  <h2 className="text-xl md:text-3xl font-bold text-foreground mb-2">
                    Your Abroad Journey Starts Here
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Fill in your details and we'll reach out to you
                  </p>
                </div>
                <LeadForm />
              </div>

              {/* Decorative elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.6,
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl"
              />
            </motion.div>

            {/* Text Content - Second on mobile, first on desktop */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-white order-2 lg:order-1 hidden lg:block"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4,
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="inline-block px-4 py-2 bg-accent/20 border border-accent/30 rounded-full text-accent text-sm font-medium mb-6"
              >
                ✨ Guiding Career Success
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              >
                Start Your
                <span className="block text-accent">Abroad Studies</span>
                Journey Today
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.6,
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="text-lg md:text-xl text-white/80 mb-8 max-w-lg"
              >
                Expert guidance for global education. From university selection
                to visa processing – we make your international education dreams
                come true.
              </motion.p>

              {/* Quick Contact Options */}
              {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-center gap-4 mb-8"
            >
              {contacts.map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 hover:bg-white/20 hover:text-white transition-all duration-300"
                >
                  <contact.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{contact.label}</span>
                </motion.a>
              ))}
            </motion.div> */}

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.9,
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="flex flex-wrap gap-6"
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 1,
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="w-10 h-10 bg-accent rounded-full flex items-center justify-center"
                  >
                    <span className="text-foreground font-bold text-sm">
                      1K+
                    </span>
                  </motion.div>
                  <span className="text-white/80 text-sm">
                    Students Enrolled
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 1.1,
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="w-10 h-10 bg-primary/80 rounded-full flex items-center justify-center"
                  >
                    <span className="text-white font-bold text-sm">10+</span>
                  </motion.div>
                  <span className="text-white/80 text-sm">
                    Years Experience
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECOND IMAGE SECTION */}
      <section className="w-full">
        <div className="relative w-full aspect-[4/5] md:aspect-[16/9]">
          <picture>
            {/* Mobile first */}
            <source media="(max-width: 768px)" srcSet={secondImageMobile} />

            {/* Desktop fallback */}
            <img
              src={secondImage}
              alt="Study abroad support"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </picture>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
