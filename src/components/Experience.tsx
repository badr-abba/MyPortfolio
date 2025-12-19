import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import portfolioData from '@/data/portfolio.json';

const Experience = () => {
  const { language, t } = useLanguage();
  const { experience, sections } = portfolioData;

  return (
    <section id="experience" className="section-padding relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            {sections[language].experienceTitle}
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative pl-12 md:pl-0 mb-8 md:mb-12 ${
                index % 2 === 0 ? 'md:pr-[55%]' : 'md:pl-[55%]'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-2 md:left-1/2 top-2 w-4 h-4 rounded-full bg-gradient-primary md:-translate-x-1/2 glow z-10" />

              <div className="glass rounded-2xl p-5 md:p-6 card-hover">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-xs md:text-sm font-medium">{exp.company}</span>
                </div>

                <h3 className="text-lg md:text-xl font-display font-semibold mb-2">
                  {t(exp.role)}
                </h3>

                <div className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm mb-3">
                  <Calendar className="w-3 h-3" />
                  <span>{t(exp.date)}</span>
                </div>

                <p className="text-sm md:text-base text-muted-foreground mb-4">
                  {t(exp.description)}
                </p>

                <ul className="space-y-2">
                  {(language === 'en' ? exp.tasks.en : exp.tasks.fr).map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-start gap-2 text-xs md:text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
