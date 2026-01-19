import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";
import logo from "@/assets/eduflair-logo.png";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/eduflairlearningsolutions.pvt.ltd/", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/eduflairlearningsolutions/", label: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com/@eduflairlearningsolutions", label: "YouTube" },
    { icon: Linkedin, href: "https://in.linkedin.com/company/eduflair-learning-solutions", label: "LinkedIn" },
  ];

  const quickLinks = [
    { label: "Study Abroad", href: "https://eduflair.com/study-abroad/" },
    { label: "Ausbildung Program", href: "https://eduflair.com/ausbildung-program/" },
    { label: "Language Academy", href: "https://eduflair.com/about-eduflairs-language-skill-academy/" },
    { label: "Placement Consultancy", href: "https://eduflair.com/placement-consultancy/" },
  ];

  const countries = ["Germany", "UK", "Canada", "USA", "Ireland", "Australia"];

  return (
    <footer id="footer" className="bg-foreground text-white">
      <div className="section-container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={logo}
              alt="Eduflair"
              className="h-12 w-auto mb-6 brightness-0 invert"
            />
            <p className="text-white/70 leading-relaxed mb-6">
              Your trusted partner for global education and career success. We
              bridge the gap between aspirations and achievements.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Countries */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-6">Study Destinations</h3>
            <ul className="space-y-3">
              {countries.map((country) => (
                <li key={country}>
                  <a
                    href="#countries"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {country}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div> */}

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/70 text-sm">Call Anytime</p>
                  <a
                    href="tel:+918352010101"
                    className="text-white hover:text-accent transition-colors font-medium"
                  >
                    +91 8352 010101
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/70 text-sm">Send Email</p>
                  <a
                    href="mailto:info@eduflair.com"
                    className="text-white hover:text-accent transition-colors font-medium"
                  >
                    info@eduflair.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/70 text-sm">Visit Our Office</p>
                  <p className="text-white text-sm">
                    3rd Floor, RP Mall, Mavoor Road, Calicut, Kerala - 673004
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="section-container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Eduflair Learning Solutions Pvt. Ltd. All
              rights reserved.
            </p>
            {/* <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
