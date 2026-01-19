import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 1000, suffix: "+", label: "German Students Enrolled" },
  { value: 950, suffix: "+", label: "Placement Success Rate" },
  { value: 990, suffix: "+", label: "Visa Success Rate" },
  { value: 10, suffix: "+", label: "Years of Experience" },
];

// Premium easing function for smooth count-up
const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

const AnimatedCounter = ({
  value,
  suffix,
  isInView,
  delay = 0,
}: {
  value: number;
  suffix: string;
  isInView: boolean;
  delay?: number;
}) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isInView && !hasStarted) {
      // Initial delay before starting
      const startDelay = setTimeout(() => {
        setHasStarted(true);
        const duration = 2200;
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Apply easing for premium feel
          const easedProgress = easeOutQuart(progress);
          const currentValue = Math.floor(easedProgress * value);
          
          setCount(currentValue);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCount(value);
          }
        };

        requestAnimationFrame(animate);
      }, delay);

      return () => clearTimeout(startDelay);
    }
  }, [isInView, value, delay, hasStarted]);

  return (
    <span className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-16 bg-primary overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl"
        />
      </div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12 + 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="mb-2"
              >
                <span className="text-4xl md:text-5xl font-bold text-white">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    isInView={isInView}
                    delay={index * 150 + 400}
                  />
                </span>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12 + 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="text-white/80 text-sm md:text-base"
              >
                {stat.label}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
