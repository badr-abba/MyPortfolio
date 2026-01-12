import { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ContactProps {
  profile: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
  sections: {
    en: Record<string, string>;
    fr: Record<string, string>;
  };
}

export function Contact({ profile, sections }: ContactProps) {
  const { lang } = useLanguage();
  const sectionLabels = sections[lang];
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create mailto link
    const mailtoLink = `mailto:${profile.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Contact')}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          <span className="gradient-text">{sectionLabels.contactTitle}</span>
        </h2>
        <div className="section-underline mb-12" />

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="contact-card">
              <div className="icon-gradient w-12 h-12">
                <Mail size={20} className="text-background" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Email</div>
                <a href={`mailto:${profile.email}`} className="font-medium hover:text-primary transition-colors">
                  {profile.email}
                </a>
              </div>
            </div>

            <div className="contact-card">
              <div className="icon-gradient w-12 h-12">
                <Phone size={20} className="text-background" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">
                  {lang === 'en' ? 'Phone' : 'Téléphone'}
                </div>
                <a href={`tel:${profile.phone}`} className="font-medium hover:text-primary transition-colors">
                  {profile.phone}
                </a>
              </div>
            </div>

            <div className="contact-card">
              <div className="icon-gradient w-12 h-12">
                <MapPin size={20} className="text-background" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Location</div>
                <span className="font-medium">{profile.location}</span>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-card hover:border-primary hover:text-primary transition-colors"
              >
                <Linkedin size={20} />
                LinkedIn
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-card hover:border-primary hover:text-primary transition-colors"
              >
                <Github size={20} />
                GitHub
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                {lang === 'en' ? 'Name' : 'Nom'}
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={lang === 'en' ? 'Your name' : 'Votre nom'}
                required
                className="bg-card border-border focus:border-primary"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Email</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="bg-card border-border focus:border-primary"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                {lang === 'en' ? 'Subject' : 'Sujet'}
              </label>
              <Input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={lang === 'en' ? "What's this about?" : 'Sujet de votre message'}
                className="bg-card border-border focus:border-primary"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Message</label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={lang === 'en' ? 'Tell me about your project or opportunity...' : 'Parlez-moi de votre projet...'}
                required
                rows={5}
                className="bg-card border-border focus:border-primary resize-none"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90"
            >
              <Send size={18} className="mr-2" />
              {sectionLabels.sendMessage}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
