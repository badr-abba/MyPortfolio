import { useState, useEffect } from 'react';

export interface PortfolioData {
  profile: {
    name: string;
    role: { en: string; fr: string };
    bio: { en: string; fr: string };
    location: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    portfolio: string;
    formspreeId: string;
    photoUrl: string;
    resumeUrl: string;
    openToWork: boolean;
    openToWorkMessage: { en: string; fr: string };
  };
  hero: {
    typingText: { en: string[]; fr: string[] };
  };
  skills: {
    programming: string[];
    databases: string[];
    bigdata: string[];
    devops: string[];
    cloud: string[];
    soft: { en: string[]; fr: string[] };
  };
  experience: Array<{
    role: { en: string; fr: string };
    company: string;
    date: { en: string; fr: string };
    description: { en: string; fr: string };
    tasks: { en: string[]; fr: string[] };
  }>;
  education: Array<{
    degree: { en: string; fr: string };
    school: string;
    year: string;
    description: { en: string; fr: string };
  }>;
  projects: Array<{
    title: string | { en: string; fr: string };
    category: { en: string; fr: string };
    description: { en: string; fr: string };
    tags: string[];
    image: string;
    repoLink: string;
    demoLink: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string | { en: string; fr: string };
    link: string;
    icon: string;
  }>;
  nav: {
    en: Record<string, string>;
    fr: Record<string, string>;
  };
  sections: {
    en: Record<string, string>;
    fr: Record<string, string>;
  };
}

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/portfolio.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch portfolio data');
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
