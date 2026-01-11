import * as React from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import portfolioData from '@/data/portfolio.json';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { language } = useLanguage();
  const { profile, sections } = portfolioData;
  const { toast } = useToast();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If Formspree ID is set, use it
    if (profile.formspreeId) {
      try {
        const response = await fetch(`https://formspree.io/f/${profile.formspreeId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message
          })
        });

        if (response.ok) {
          toast({
            title: sections[language].sendMessage || "Message Sent Successfully",
            description: "Thanks! I will get back to you as soon as possible.",
            variant: "success",
          });
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          throw new Error('Failed to send message');
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again or email me directly.",
          variant: "destructive",
        });
      }
    } else {
      // Fallback to mailto if no ID is configured
      const subject = formData.subject || `Portfolio Contact from ${formData.name}`;
      const body = `${formData.message}\n\n(From: ${formData.email})`;
      const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoUrl;

      toast({
        title: "Email Client Opened",
        description: "Please click 'Send' in your email application to finish sending the message.",
        variant: "default",
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            {sections[language].contactTitle}
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 md:space-y-8"
          >
            <div className="space-y-4">
              <motion.a
                href={`mailto:${profile.email}`}
                className="glass rounded-xl p-4 md:p-5 flex items-center gap-4 card-hover group"
                whileHover={{ x: 5 }}
              >
                <div className="p-2 md:p-3 rounded-lg bg-gradient-primary">
                  <Mail className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Email</p>
                  <p className="text-sm md:text-base font-medium group-hover:text-primary transition-colors">
                    {profile.email}
                  </p>
                </div>
              </motion.a>

              <motion.a
                href={`tel:${profile.phone}`}
                className="glass rounded-xl p-4 md:p-5 flex items-center gap-4 card-hover group"
                whileHover={{ x: 5 }}
              >
                <div className="p-2 md:p-3 rounded-lg bg-gradient-primary">
                  <Phone className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Phone</p>
                  <p className="text-sm md:text-base font-medium group-hover:text-primary transition-colors">
                    {profile.phone}
                  </p>
                </div>
              </motion.a>

              <motion.div
                className="glass rounded-xl p-4 md:p-5 flex items-center gap-4"
                whileHover={{ x: 5 }}
              >
                <div className="p-2 md:p-3 rounded-lg bg-gradient-primary">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Location</p>
                  <p className="text-sm md:text-base font-medium">{profile.location}</p>
                </div>
              </motion.div>
            </div>

            <div className="flex gap-3">
              <Button variant="glass" size="lg" asChild className="flex-1">
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="glass" size="lg" asChild className="flex-1">
                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-2xl p-5 md:p-8 space-y-4 md:space-y-6"
          >
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label className="text-sm font-medium mb-1.5 block text-muted-foreground">Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="bg-background/50 border-primary/10 focus:border-primary/30 transition-all font-medium"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block text-muted-foreground">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="bg-background/50 border-primary/10 focus:border-primary/30 transition-all font-medium"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block text-muted-foreground">Subject</label>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                  className="bg-background/50 border-primary/10 focus:border-primary/30 transition-all font-medium"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block text-muted-foreground">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  className="bg-background/50 resize-none border-primary/10 focus:border-primary/30 transition-all font-medium"
                />
              </div>
              <Button variant="gradient" size="lg" type="submit" className="w-full gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">
                <Send className="w-4 h-4" />
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
