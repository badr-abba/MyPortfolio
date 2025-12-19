import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import portfolioData from '@/data/portfolio.json';

const About = () => {
  const { language, t } = useLanguage();
  const { profile, sections } = portfolioData;

  return (
    <section id="about" className="section-padding relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            <span className="text-gradient">{sections[language].aboutTitle}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass rounded-3xl p-8 md:p-12 gradient-border">
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8 text-center">
              {t(profile.bio)}
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <motion.div 
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-primary/5 border border-primary/20"
                whileHover={{ scale: 1.05, backgroundColor: 'hsl(var(--primary) / 0.1)' }}
              >
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{profile.location}</span>
              </motion.div>
              
              <motion.a 
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-accent/5 border border-accent/20 hover:bg-accent/10 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Mail className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">{profile.email}</span>
              </motion.a>
              
              <motion.div 
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-warning/5 border border-warning/20"
                whileHover={{ scale: 1.05, backgroundColor: 'hsl(var(--warning) / 0.1)' }}
              >
                <Phone className="w-5 h-5 text-warning" />
                <span className="text-sm font-medium">{profile.phone}</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
