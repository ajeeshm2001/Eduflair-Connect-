import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import nandanaImage from "@/assets/testimonial-nandana.jpg";
import studentsImage from "@/assets/students-image.png";

const testimonials = [
  {
    name: "Nandana Sivadasan",
    role: "B2 Certified",
    image: nandanaImage,
    text: "Had a nice experience with Eduflair team. I completed my A1 to B2 studies here. Soon after my B2 completion I started processing. Jumana ma'am was very transparent with all processing details. Within 3 months I received my offer letter!",
  },
  {
    name: "Fiyona Sara Binu",
    role: "B2 Certified",
    image: studentsImage,
    text: "Eduflair is a good consultancy. I did my A1-B2 here. The classes, teachers and atmosphere are all very good. My processing time was very fast (6 months). I am currently in Germany and I recommend Eduflair!",
  },
  {
    name: "Ziyad",
    role: "B2 Certified",
    image: studentsImage,
    text: "A big thanks for all the help in learning German. I went from knowing nothing to speaking fluently. The team was so patient and encouraging, always making sure I understood everything.",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-20 lg:py-28 bg-gradient-to-b from-secondary to-white"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            Success Stories
          </span>
          <h2 className="section-heading">What Our Students Say</h2>
          <p className="section-subheading">
            Real experiences from students who achieved their dreams with Eduflair.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="testimonial-card relative"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Quote className="w-5 h-5 text-primary" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-accent fill-accent"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground/80 leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
