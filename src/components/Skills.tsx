import { motion } from 'framer-motion';
import { Code, Database, BarChart3, Container, Cloud, Users } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import portfolioData from '@/data/portfolio.json';
import { Badge } from '@/components/ui/badge';

const Skills = () => {
  const { language } = useLanguage();
  const { skills, sections } = portfolioData;

  const skillCategories = [
    { 
      title: sections[language].programming, 
      items: skills.programming, 
      icon: Code,
      color: 'primary',
      gradient: 'from-primary/20 to-primary/5'
    },
    { 
      title: sections[language].databases, 
      items: skills.databases, 
      icon: Database,
      color: 'accent',
      gradient: 'from-accent/20 to-accent/5'
    },
    { 
      title: sections[language].bigdata, 
      items: skills.bigdata, 
      icon: BarChart3,
      color: 'warning',
      gradient: 'from-warning/20 to-warning/5'
    },
    { 
      title: sections[language].devops, 
      items: skills.devops, 
      icon: Container,
      color: 'success',
      gradient: 'from-success/20 to-success/5'
    },
    { 
      title: sections[language].cloud, 
      items: skills.cloud, 
      icon: Cloud,
      color: 'primary',
      gradient: 'from-primary/20 to-accent/5'
    },
    { 
      title: sections[language].softSkills, 
      items: skills.soft[language], 
      icon: Users,
      color: 'accent',
      gradient: 'from-accent/20 to-warning/5'
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { text: string; border: string; bg: string }> = {
      primary: { text: 'text-primary', border: 'border-primary/30', bg: 'bg-primary/10' },
      accent: { text: 'text-accent', border: 'border-accent/30', bg: 'bg-accent/10' },
      warning: { text: 'text-warning', border: 'border-warning/30', bg: 'bg-warning/10' },
      success: { text: 'text-success', border: 'border-success/30', bg: 'bg-success/10' },
    };
    return colors[color] || colors.primary;
  };

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-accent/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            <span className="text-gradient">{sections[language].skillsTitle}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((category, catIndex) => {
            const colorClasses = getColorClasses(category.color);
            const IconComponent = category.icon;
            
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: catIndex * 0.1 }}
                className="group"
              >
                <div className={`glass rounded-2xl p-6 h-full card-hover bg-gradient-to-br ${category.gradient}`}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`p-2.5 rounded-xl ${colorClasses.bg} ${colorClasses.border} border`}>
                      <IconComponent className={`w-5 h-5 ${colorClasses.text}`} />
                    </div>
                    <h3 className="text-lg font-display font-semibold">
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: catIndex * 0.05 + index * 0.02 }}
                      >
                        <Badge 
                          variant="outline" 
                          className={`${colorClasses.border} hover:${colorClasses.bg} transition-colors cursor-default`}
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
