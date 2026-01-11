import { motion } from 'framer-motion';
import { ExternalLink, Github, FolderOpen } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import portfolioData from '@/data/portfolio.json';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Projects = () => {
  const { language, t } = useLanguage();
  const { projects, sections } = portfolioData;
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/3 -left-64 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 -right-64 w-96 h-96 bg-accent/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            <span className="text-gradient">{sections[language].projectsTitle}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass rounded-2xl overflow-hidden card-hover h-full flex flex-col">
                {/* Project Image */}
                <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-primary/20 via-accent/20 to-warning/20">
                  {!imageErrors[index] && project.image ? (
                    <div className="w-full h-full overflow-hidden">
                      <img
                        src={project.image}
                        alt={typeof project.title === 'string' ? project.title : t(project.title)}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                        onError={() => handleImageError(index)}
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-secondary/30">
                      <FolderOpen className="w-20 h-20 text-muted-foreground/20 group-hover:text-primary/20 transition-colors duration-500" />
                    </div>
                  )}

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6 gap-3">
                    {project.repoLink !== '#' && (
                      <Button variant="glass" size="sm" className="backdrop-blur-md" asChild>
                        <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.demoLink !== '#' && (
                      <Button variant="gradient" size="sm" asChild>
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-5 md:p-6 flex-1 flex flex-col">
                  <div className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">
                    {t(project.category)}
                  </div>
                  <h3 className="text-lg md:text-xl font-display font-bold mb-3 group-hover:text-gradient transition-all">
                    {typeof project.title === 'string' ? project.title : t(project.title)}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                    {t(project.description)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="outline"
                        className="text-xs border-border/50 bg-secondary/50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
