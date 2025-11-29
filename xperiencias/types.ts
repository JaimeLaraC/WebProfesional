export type Language = 'ES' | 'EN';

export interface NavItem {
  id: string;
  label: {
    ES: string;
    EN: string;
  };
}

export interface ExperienceItem {
  company: string;
  role: {
    ES: string;
    EN: string;
  };
  year: string;
  description: {
    ES: string;
    EN: string;
  };
  techStack: string[];
  responsibilities: {
    ES: string[];
    EN: string[];
  };
}

export interface EducationItem {
  hash: string;
  date: string;
  title: {
    ES: string;
    EN: string;
  };
  institution: string;
  type: 'commit' | 'merge';
  tags?: string[];
}

export interface ProjectItem {
  id: number;
  title: {
    ES: string;
    EN: string;
  };
  description: {
    ES: string;
    EN: string;
  };
  tags: string[];
}

export interface SkillFile {
  name: string;
  type: 'json' | 'js' | 'ts' | 'py' | 'java' | 'cpp';
  content: string; // JSON string representation
  color: string;
}

export interface SkillFolder {
  name: string;
  files: SkillFile[];
  isOpen: boolean;
}