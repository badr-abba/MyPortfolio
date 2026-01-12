import { ExternalLink, Github } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

interface ProjectsProps {
  projects: Array<{
    title: string | { en: string; fr: string };
    category: { en: string; fr: string };
    description: { en: string; fr: string };
    tags: string[];
    image: string;
    repoLink: string;
    demoLink: string;
  }>;
  sections: {
    en: Record<string, string>;
    fr: Record<string, string>;
  };
}

export function Projects({ projects, sections }: ProjectsProps) {
  const { lang, t } = useLanguage();
  const sectionLabels = sections[lang];

  const getTitle = (title: string | { en: string; fr: string }) => {
    if (typeof title === 'string') return title;
    return title[lang];
  };

  return (
    <section id="projects" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          <span className="gradient-text">{sectionLabels.projectsTitle}</span>
        </h2>
        <div className="section-underline mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="project-card group">
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={getTitle(project.title)}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = `https://placehold.co/600x340/1e293b/22d3ee?text=${encodeURIComponent(getTitle(project.title))}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-xs font-medium text-primary uppercase tracking-wider mb-2">
                  {t(project.category)}
                </div>
                <h3 className="text-lg font-semibold mb-2 gradient-text">
                  {getTitle(project.title)}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {t(project.description)}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="badge-skill text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.demoLink && project.demoLink !== '#' && (
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="flex-1 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={14} className="mr-2" />
                        {sectionLabels.viewProject}
                      </a>
                    </Button>
                  )}
                  {project.repoLink && project.repoLink !== '#' && (
                    <Button
                      asChild
                      size="sm"
                      variant="ghost"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                        <Github size={14} className="mr-2" />
                        {sectionLabels.viewCode}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
