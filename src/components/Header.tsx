import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle, Mail, Instagram } from "lucide-react";
import logo from "@/assets/eduflair-logo.png";
import heroImage from "@/assets/hero-students.jpg";

const mobileContacts = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/eduflairlearningsolutions/?hl=en",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/918343010101",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:info@eduflair.in",
  },
  {
    icon: Phone,
    label: "Call",
    href: "tel:+918352010101",
  },
];

// Export menu state for other components to use
let menuStateCallback: ((isOpen: boolean) => void) | null = null;
export const subscribeToMenuState = (callback: (isOpen: boolean) => void) => {
  menuStateCallback = callback;
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#footer" },
  ];

  useEffect(() => {
    menuStateCallback?.(isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    }),
    exit: { opacity: 0, x: -10, transition: { duration: 0.2 } },
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/30 to-transparent"
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex-shrink-0">
            <img
              src={logo}
              alt="Eduflair"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-white/90 hover:text-accent transition-colors duration-200 drop-shadow-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+918352010101"
              className="flex items-center gap-2 text-sm font-medium text-white/90 hover:text-accent transition-colors drop-shadow-sm"
            >
              <Phone className="w-4 h-4" />
              +91 8352 010101
            </a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white drop-shadow-sm"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu - Banner-based background */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:hidden fixed inset-0 top-20 overflow-hidden"
          >
            {/* Background with hero image */}
            <div className="absolute inset-0">
              <img
                src={heroImage}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-foreground/85 via-foreground/80 to-foreground/90" />
            </div>

            {/* Menu content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative section-container py-10 space-y-2"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  custom={i}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="block py-4 text-xl font-medium text-white/90 hover:text-accent transition-colors border-b border-white/10"
                >
                  {link.label}
                </motion.a>
              ))}

              {/* Contact Options */}
              <div className="pt-4 mt-4 border-t border-white/10 space-y-1">
                {mobileContacts.map((contact, i) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    custom={navLinks.length + i}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex items-center gap-3 py-3 text-lg font-medium text-white/80 hover:text-accent transition-colors"
                  >
                    <contact.icon className="w-5 h-5" />
                    {contact.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
