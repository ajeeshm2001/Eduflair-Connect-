import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, BookOpen, Globe, Briefcase } from "lucide-react";

const services = [
  {
    icon: GraduationCap,
    title: "Study Abroad",
    description:
      "Achieve your global education dreams with expert guidance, university selection, visa support, and language training.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: BookOpen,
    title: "Ausbildung Program",
    description:
      "Gain hands-on training in Germany through structured vocational programs with guaranteed job placements.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Globe,
    title: "Language Academy",
    description:
      "Develop essential skills through language training, certification courses, and career coaching workshops.",
    color: "bg-eduflair-teal-light text-primary",
  },
  {
    icon: Briefcase,
    title: "Placement Consultancy",
    description:
      "Explore overseas job opportunities with expert recruitment services, visa processing, and relocation assistance.",
    color: "bg-eduflair-gold-light text-accent",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" ref={ref} className="py-20 lg:py-28 bg-secondary">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="section-heading">Your Gateway to Global Success</h2>
          <p className="section-subheading">
            Comprehensive support to ensure a seamless transition to your dream
            university or career opportunity abroad.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="service-card group"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}
              >
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional support list */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-premium"
        >
          <h3 className="text-2xl font-semibold text-foreground text-center mb-8">
            End-to-End Support We Provide
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Personalized University Selection",
              "Application & Admission Assistance",
              "Visa Guidance & Processing",
              "Language Training & Test Preparation",
              "Scholarship & Financial Aid Support",
              "Pre-Departure & Post-Arrival Support",
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-3 text-foreground"
              >
                <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
