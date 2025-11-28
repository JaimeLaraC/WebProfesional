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