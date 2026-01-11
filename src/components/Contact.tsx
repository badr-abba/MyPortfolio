import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import portfolioData from '@/data/portfolio.json';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  const { language } = useLanguage();
  const { profile, sections } = portfolioData;

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
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-2xl p-5 md:p-8 space-y-4 md:space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const name = formData.get('name');
              const email = formData.get('email');
              const message = formData.get('message');
              window.location.href = `mailto:${profile.email}?subject=Portfolio Contact from ${name}&body=${message} (from ${email})`;
            }}
          >
            <div>
              <Input
                name="name"
                required
                placeholder={sections[language].yourName}
                className="bg-background/50 border-primary/10 focus:border-primary/30 transition-all font-medium"
              />
            </div>
            <div>
              <Input
                name="email"
                type="email"
                required
                placeholder={sections[language].yourEmail}
                className="bg-background/50 border-primary/10 focus:border-primary/30 transition-all font-medium"
              />
            </div>
            <div>
              <Textarea
                name="message"
                required
                placeholder={sections[language].yourMessage}
                rows={5}
                className="bg-background/50 resize-none border-primary/10 focus:border-primary/30 transition-all font-medium"
              />
            </div>
            <Button variant="gradient" size="lg" type="submit" className="w-full gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">
              <Send className="w-4 h-4" />
              {sections[language].sendMessage}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
