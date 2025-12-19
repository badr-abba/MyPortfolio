import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import portfolioData from '@/data/portfolio.json';

const Education = () => {
  const { language, t } = useLanguage();
  const { education, sections } = portfolioData;

  return (
    <section id="education" className="section-padding relative bg-gradient-subtle">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            {sections[language].educationTitle}
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass rounded-2xl p-5 md:p-6 card-hover relative overflow-hidden group"
            >
              {/* Decorative Gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 md:p-3 rounded-xl bg-gradient-primary">
                    <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm">
                    <Calendar className="w-3 h-3" />
                    <span>{edu.year}</span>
                  </div>
                </div>

                <h3 className="text-lg md:text-xl font-display font-semibold mb-2">
                  {t(edu.degree)}
                </h3>

                <p className="text-sm md:text-base text-primary mb-2">{edu.school}</p>

                <p className="text-xs md:text-sm text-muted-foreground">
                  {t(edu.description)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
