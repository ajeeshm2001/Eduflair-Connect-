import { useState } from "react";
import { motion, AnimatePresence, Easing } from "framer-motion";
import { Send, Check, Loader2, Phone, MessageCircle, Mail, MapPin, Instagram } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

const GOOGLE_SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxCmI1xQ47bgtehY_7NWTQybbQlnvW7zhtDLtEtQmduoo6_4ZT3siRPDzD6L3VzxRxb/exec'

const primaryContacts = [
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

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(20),
  qualification: z.string().trim().min(1, "Qualification is required"),
  comment: z.string().trim().max(1000).optional(),
});

type FormData = z.infer<typeof formSchema>;

const qualifications = [
  "10th Standard",
  "12th Standard / Plus Two",
  "Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Other",
];

const easeOutQuart: Easing = [0.25, 1, 0.5, 1];

const LeadForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    comment: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const formSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.string().trim().email("Please enter a valid email"),
    phone: z.string().trim().min(10, "Please enter a valid phone number"),
    qualification: z.string().trim().min(1, "Qualification is required"),
    comment: z.string().trim().max(1000).optional(),
  });
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const result = formSchema.safeParse(formData);
  
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
  
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormData;
        fieldErrors[field] = err.message;
      });
  
      setErrors(fieldErrors);
      return;
    }
  
    setErrors({});
    setIsSubmitting(true);
  
    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("qualification", formData.qualification);
      payload.append("comment", formData.comment || "");
  
      await fetch(GOOGLE_SHEET_ENDPOINT, {
        method: "POST",
        body: payload,
      });
  
      setIsSubmitted(true);
      toast.success("Thank you! We'll contact you shortly.");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  

  return (
    <div className="relative min-h-[500px]">
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          /* Success State */
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: easeOutQuart }}
            className="text-center py-8"
          >
            {/* Animated Checkmark */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5, ease: easeOutQuart }}
              className="relative w-20 h-20 mx-auto mb-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4, ease: easeOutQuart }}
                className="absolute inset-0 bg-primary/10 rounded-full"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4, ease: easeOutQuart }}
                className="absolute inset-2 bg-primary/20 rounded-full"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4, ease: easeOutQuart }}
                className="absolute inset-4 bg-primary rounded-full flex items-center justify-center"
              >
                <motion.div
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4, ease: easeOutQuart }}
                >
                  <Check className="w-6 h-6 text-primary-foreground" strokeWidth={3} />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Success Text */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4, ease: easeOutQuart }}
              className="text-2xl font-semibold text-foreground mb-2"
            >
              Thank You!
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4, ease: easeOutQuart }}
              className="text-muted-foreground mb-8"
            >
              Our team will review your profile and guide you on the next steps
            </motion.p>

            {/* Post-Submit Contact Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5, ease: easeOutQuart }}
              className="space-y-4"
            >
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                Need immediate assistance?
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {primaryContacts.map((contact, index) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: 0.7 + index * 0.1,
                      duration: 0.4,
                      ease: easeOutQuart,
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/5 backdrop-blur-sm border border-primary/10 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-sm"
                  >
                    <contact.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{contact.label}</span>
                  </motion.a>
                ))}
              </div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.4 }}
                className="pt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground"
              >
                <MapPin className="w-3 h-3" />
                Calicut, Kerala
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          /* Form State */
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: easeOutQuart }}
            className="space-y-5"
          >
            {/* Name Field */}
            <motion.div
              className="relative"
              animate={isSubmitting ? { opacity: 0.5, y: -5 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0 }}
            >
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Full Name"
                disabled={isSubmitting}
                className={`form-input-premium ${
                  errors.name ? "border-destructive focus:ring-destructive/30" : ""
                }`}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="name-error"
                  className="mt-2 text-sm text-destructive"
                >
                  {errors.name}
                </motion.p>
              )}
            </motion.div>

            {/* Email Field */}
            <motion.div
              className="relative"
              animate={isSubmitting ? { opacity: 0.5, y: -5 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                disabled={isSubmitting}
                className={`form-input-premium ${
                  errors.email ? "border-destructive focus:ring-destructive/30" : ""
                }`}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="email-error"
                  className="mt-2 text-sm text-destructive"
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Phone Field */}
            <motion.div
              className="relative"
              animate={isSubmitting ? { opacity: 0.5, y: -5 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                disabled={isSubmitting}
                className={`form-input-premium ${
                  errors.phone ? "border-destructive focus:ring-destructive/30" : ""
                }`}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="phone-error"
                  className="mt-2 text-sm text-destructive"
                >
                  {errors.phone}
                </motion.p>
              )}
            </motion.div>

            {/* Qualification Field */}
            <motion.div
              className="relative"
              animate={isSubmitting ? { opacity: 0.5, y: -5 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <select
                name="qualification"
                id="qualification"
                value={formData.qualification}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`form-input-premium appearance-none cursor-pointer ${
                  !formData.qualification ? "text-muted-foreground/60" : ""
                } ${errors.qualification ? "border-destructive focus:ring-destructive/30" : ""}`}
                aria-describedby={errors.qualification ? "qualification-error" : undefined}
              >
                <option value="" disabled>
                  Select Your Qualification
                </option>
                {qualifications.map((qual) => (
                  <option key={qual} value={qual}>
                    {qual}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {errors.qualification && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="qualification-error"
                  className="mt-2 text-sm text-destructive"
                >
                  {errors.qualification}
                </motion.p>
              )}
            </motion.div>

            {/* Comment Field */}
            <motion.div
              className="relative"
              animate={isSubmitting ? { opacity: 0.5, y: -5 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <textarea
                name="comment"
                id="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Any questions or comments?"
                rows={3}
                disabled={isSubmitting}
                className="form-input-premium resize-none"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              animate={isSubmitting ? { scale: 0.98 } : { scale: 1 }}
              whileHover={!isSubmitting ? { scale: 1.01 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              transition={{ duration: 0.2, ease: easeOutQuart }}
              className="btn-primary-premium flex items-center justify-center gap-3 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </motion.span>
                ) : (
                  <motion.span
                    key="default"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    <motion.span
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                      >
                      <Send className="w-5 h-5" />
                    </motion.span>
                      Start Your Journey
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <p className="text-xs text-center text-muted-foreground mt-4">
              By submitting, you agree to be contacted by our counsellors.
            </p>

            {/* Contact Section - Premium Pill Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: easeOutQuart }}
              className="mt-8 pt-6 border-t border-border/30"
            >
              <p className="text-xs text-center text-muted-foreground mb-4 uppercase tracking-wider font-medium">
                Or reach out directly
              </p>

              {/* Primary Contact Pills */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {primaryContacts.map((contact, index) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.4 + index * 0.08,
                      duration: 0.4,
                      ease: easeOutQuart,
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-sm"
                  >
                    <contact.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{contact.label}</span>
                  </motion.a>
                ))}
              </div>

              {/* Location - Subtle Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground"
              >
                <MapPin className="w-3 h-3" />
                Calicut, Kerala
              </motion.div>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeadForm;
