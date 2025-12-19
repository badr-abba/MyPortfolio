import { motion } from 'framer-motion';
import { Award, ExternalLink, Github, Database, Code, Shield, ShieldCheck, Server } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import portfolioData from '@/data/portfolio.json';

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  database: Database,
  code: Code,
  shield: Shield,
  'shield-check': ShieldCheck,
  server: Server,
};

const Certifications = () => {
  const { language, t } = useLanguage();
  const { certifications, sections } = portfolioData;

  return (
    <section id="certifications" className="section-padding relative bg-gradient-subtle">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            {sections[language].certificationsTitle}
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, index) => {
            const IconComponent = iconMap[cert.icon] || Award;
            return (
              <motion.a
                key={index}
                href={cert.link !== '#' ? cert.link : undefined}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass rounded-xl p-4 md:p-5 card-hover flex items-start gap-3 md:gap-4 group cursor-pointer"
              >
                <div className="p-2 md:p-3 rounded-lg bg-gradient-primary flex-shrink-0">
                  <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base font-semibold mb-1 group-hover:text-primary transition-colors truncate">
                    {cert.name}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">{t(cert.date)}</p>
                </div>
                {cert.link !== '#' && (
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                )}
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
