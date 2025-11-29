import React from 'react';

export enum ChatRole {
  USER = 'user',
  MODEL = 'model',
  SYSTEM = 'system'
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export type Language = 'es' | 'en';

export interface TranslationData {
  nav: {
    about: string;
    experience: string;
    education: string;
    projects: string;
    skills: string;
    terminal: string;
  };
  hero: {
    greeting: string;
    role: string;
    description_start: string;
    description_bold_1: string;
    description_mid: string;
    description_bold_2: string;
    description_end: string;
    quote: string;
  };
  titles: {
    experience: string;
    education: string;
    projects: string;
    skills: string;
    terminal: string;
    ready: string;
    talk: string;
    footer: string;
  };
  terminal: {
    welcome: string;
    system: string;
    help_prompt: string;
    try: string;
    processing: string;
  };
  chat: {
    title: string;
    welcome: string;
    placeholder: string;
    error: string;
  };
  services_section: {
    title: string;
    description: string;
  };
  experience: ExperienceItem[];
  education: EducationItem[]; // Using EducationItem instead of EducationCommit to match current project
  projects: Project[];
  services: Service[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  link?: string;
  // VS Code Viewer Props
  fileName?: string;
  language?: string;
  code?: string;
  runOutput?: string;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  imageUrl: string;
  // Git Graph Props
  year?: string;
  skills?: string[];
  type?: 'degree' | 'certification';
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}