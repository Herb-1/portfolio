import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SocialIcon } from "./SocialIcon";
import { personalInfo } from "@/lib/data";
import { FaPhone, FaCommentDots, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters long" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long" })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      toast({
        title: "Success",
        description: "Your message has been sent successfully!",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
          <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Get In Touch</span>
        </h2>
        <div className="w-20 h-1 bg-primary mx-auto mb-10"></div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-primary/10 rounded-lg text-primary mr-3">
                    <FaPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <a href={`tel:${personalInfo.phone}`} className="text-foreground hover:text-primary transition-colors duration-200">
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-primary/10 rounded-lg text-primary mr-3">
                    <FaCommentDots className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Zalo</p>
                    <p className="text-foreground">{personalInfo.zalo}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-primary/10 rounded-lg text-primary mr-3">
                    <FaEnvelope className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <a href={`mailto:${personalInfo.email}`} className="text-foreground hover:text-primary transition-colors duration-200">
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-primary/10 rounded-lg text-primary mr-3">
                    <FaMapMarkerAlt className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Location</p>
                    <p className="text-foreground">{personalInfo.location}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className="text-xl font-semibold text-foreground mb-4">Connect With Me</h3>
                
                <div className="flex space-x-4">
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
            
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Send Me a Message</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-tertiary">Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                        <FormLabel className="text-tertiary">Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your email" 
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-tertiary">Subject</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Subject" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                        <FormLabel className="text-tertiary">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your message" 
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
