import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SocialIcon } from "./SocialIcon";
import { SectionHeader } from "./SectionHeader";
import { personalInfo } from "@/lib/data";
import { FaPhone, FaCommentDots, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Send, CheckCircle } from "lucide-react";

// ============================================================
// 📧 CẤU HÌNH EMAILJS — BẠN CẦN THAY ĐỔI 3 GIÁ TRỊ NÀY
// ============================================================
// 1. Vào https://www.emailjs.com/ → Đăng ký tài khoản miễn phí
// 2. Tạo Email Service (kết nối Gmail của bạn)
// 3. Tạo Email Template với các variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
// 4. Copy Service ID, Template ID và Public Key vào đây:
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";   // VD: "service_abc123"
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // VD: "template_xyz789"
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";    // VD: "AbCdEfGhIjKlMnOp"
// ============================================================

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters long" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long" })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const contactItems = [
  {
    icon: FaPhone,
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
    color: "#25D366",
  },
  {
    icon: FaCommentDots,
    label: "Zalo",
    value: personalInfo.zalo,
    href: null,
    color: "#0068FF",
  },
  {
    icon: FaEnvelope,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: "#EA4335",
  },
  {
    icon: FaMapMarkerAlt,
    label: "Location",
    value: personalInfo.location,
    href: null,
    color: "#8B5CF6",
  },
];

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { ref: infoRef, isRevealed: infoRevealed } = useScrollReveal<HTMLDivElement>();
  const { ref: formRef, isRevealed: formRevealed } = useScrollReveal<HTMLDivElement>();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      // Gửi email qua EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
          to_email: personalInfo.email,
        },
        EMAILJS_PUBLIC_KEY
      );

      setIsSuccess(true);
      toast({
        title: "✅ Message Sent!",
        description: "Your message has been sent to my email. I'll get back to you soon!",
      });
      form.reset();

      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({
        title: "❌ Failed to send",
        description: "Something went wrong. Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[400px] rounded-full blur-[150px] opacity-[0.06]"
          style={{
            background: "radial-gradient(ellipse, hsl(330 85% 60%), transparent)",
          }}
        />
        <div
          className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.04]"
          style={{
            background: "radial-gradient(ellipse, hsl(250 85% 65%), transparent)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          title="Get In Touch"
          subtitle="Feel free to reach out. I'm always open to discussing new projects, ideas, or opportunities."
        />

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Info */}
            <div
              ref={infoRef}
              className={`lg:col-span-2 space-y-6 transition-all duration-700 ${
                infoRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h3 className="text-xl font-bold text-foreground mb-6">
                Contact Information
              </h3>

              <div className="space-y-4">
                {contactItems.map((item, index) => {
                  const IconComponent = item.icon;
                  const content = (
                    <div
                      className="flex items-center gap-4 glass rounded-xl p-4 group hover:bg-white/[0.06] transition-all duration-300 hover:scale-[1.02]"
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div
                        className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: `${item.color}15`,
                          color: item.color,
                        }}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-foreground text-sm font-medium truncate">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );

                  return item.href ? (
                    <a key={index} href={item.href} className="block">
                      {content}
                    </a>
                  ) : (
                    <div key={index}>{content}</div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="pt-4">
                <h4 className="text-sm font-semibold text-foreground mb-4">
                  Connect With Me
                </h4>
                <div className="flex gap-3">
                  {personalInfo.socialLinks.map((social, index) => (
                    <SocialIcon
                      key={index}
                      platform={social.platform}
                      url={social.url}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              ref={formRef}
              className={`lg:col-span-3 transition-all duration-700 delay-200 ${
                formRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden">
                {/* Success animation overlay */}
                {isSuccess && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-2xl">
                    <div className="text-center space-y-3 animate-in fade-in zoom-in duration-300">
                      <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto" />
                      <p className="text-foreground font-semibold text-lg">Message Sent!</p>
                      <p className="text-muted-foreground text-sm">I'll get back to you soon</p>
                    </div>
                  </div>
                )}

                <h3 className="text-xl font-bold text-foreground mb-2">
                  Send Me a Message
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  📧 Your message will be sent directly to my email
                </p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground text-sm">Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                className="bg-white/[0.03] border-white/10 rounded-xl focus:border-primary/50 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/40 transition-all duration-300 hover:border-white/20"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground text-sm">Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your email"
                                type="email"
                                className="bg-white/[0.03] border-white/10 rounded-xl focus:border-primary/50 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/40 transition-all duration-300 hover:border-white/20"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground text-sm">Subject</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Subject"
                              className="bg-white/[0.03] border-white/10 rounded-xl focus:border-primary/50 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/40 transition-all duration-300 hover:border-white/20"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground text-sm">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your message"
                              rows={5}
                              className="bg-white/[0.03] border-white/10 rounded-xl focus:border-primary/50 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/40 transition-all duration-300 resize-none hover:border-white/20"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl py-3 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.01] border-0 group relative overflow-hidden"
                      id="contact-submit"
                    >
                      {/* Shimmer effect */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                          backgroundSize: "200% 100%",
                          animation: "shimmer 2s infinite",
                        }}
                      />
                      <span className="relative z-10">
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            Send Message
                            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
                          </span>
                        )}
                      </span>
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
