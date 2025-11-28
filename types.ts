import React from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string; 
  link?: string;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  imageUrl: string;
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
