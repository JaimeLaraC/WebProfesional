import { ExperienceItem, EducationItem, ProjectItem, SkillFolder, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: { ES: 'Sobre mí', EN: 'About' } },
  { id: 'experience', label: { ES: 'Experiencia', EN: 'Experience' } },
  { id: 'education', label: { ES: 'Educación', EN: 'Education' } },
  { id: 'projects', label: { ES: 'Proyectos', EN: 'Projects' } },
  { id: 'skills', label: { ES: 'Habilidades', EN: 'Skills' } },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    company: "Cojali S. L.",
    role: { ES: "AI Diagnostic Test Engineer", EN: "AI Diagnostic Test Engineer" },
    year: "2025",
    description: {
      ES: "Desarrollo de pruebas de diagnóstico impulsadas por inteligencia artificial. Contrato de formación enfocado en la innovación automotriz y tecnológica en Campo de Criptana.",
      EN: "Development of AI-driven diagnostic tests. Training contract focused on automotive and technological innovation in Campo de Criptana."
    },
    techStack: ["Python", "TensorFlow", "AutoML", "Big Data"],
    responsibilities: {
      ES: [
        "Desarrollo de diagnósticos impulsados por IA",
        "Innovación en sistemas automotrices",
        "Optimización de algoritmos de detección"
      ],
      EN: [
        "Development of AI-driven diagnostics",
        "Innovation in automotive systems",
        "Optimization of detection algorithms"
      ]
    }
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    hash: "1df57ef",
    date: "2024",
    title: { ES: "Grado en Ingeniería de Software", EN: "Bachelor in Software Engineering" },
    institution: "Universidad de Castilla-La Mancha",
    type: "merge",
    tags: ["MERGE"]
  },
  {
    hash: "4558c3f",
    date: "2023",
    title: { ES: "Certificación: Deep Learning y AI", EN: "Certification: Deep Learning & AI" },
    institution: "Udemy",
    type: "commit",
  },
  {
    hash: "191cb0d",
    date: "2022",
    title: { ES: "Certificación: Hacking de Redes", EN: "Certification: Network Hacking" },
    institution: "Mastermind",
    type: "commit",
  },
  {
    hash: "init",
    date: "2020",
    title: { ES: "Inicio de Estudios", EN: "Studies Start" },
    institution: "UCLM",
    type: "commit"
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 1,
    title: { ES: "Bot de Telegram IA", EN: "AI Telegram Bot" },
    description: {
      ES: "Diseñé y programé un bot de Telegram utilizando Python y la API de Telegram. Integra funcionalidades avanzadas como respuestas automáticas y conexión con APIs externas.",
      EN: "Designed and programmed a Telegram bot using Python. Integrates advanced features like auto-replies and external API connections."
    },
    tags: ["Python", "Telegram API", "ChatGPT"]
  },
  {
    id: 2,
    title: { ES: "Cloud con Raspberry Pi", EN: "Raspberry Pi Cloud" },
    description: {
      ES: "Configuré y gestioné un servidor Nextcloud en una Raspberry Pi para crear una nube privada. Permite almacenar, sincronizar y acceder a archivos de manera segura.",
      EN: "Configured and managed a Nextcloud server on a Raspberry Pi to create a private cloud. Allows secure file storage, sync, and access."
    },
    tags: ["Raspberry Pi", "Nextcloud", "Linux"]
  },
  {
    id: 3,
    title: { ES: "Detección con Dron", EN: "Drone Detection" },
    description: {
      ES: "Sistema de detección de vehículos en tiempo real utilizando YOLOv5 y un dron. Permite identificar y rastrear vehículos en movimiento.",
      EN: "Real-time vehicle detection system using YOLOv5 and a drone. Allows identifying and tracking moving vehicles."
    },
    tags: ["YOLOv5", "Python", "Computer Vision"]
  },
    {
    id: 4,
    title: { ES: "Predicción Deportiva IA", EN: "AI Sports Prediction" },
    description: {
      ES: "Modelo de IA para predecir resultados de fútbol. Analiza datos históricos y estadísticas clave para ofrecer predicciones precisas.",
      EN: "AI model to predict soccer results. Analyzes historical data and key statistics to offer accurate predictions."
    },
    tags: ["AI", "Machine Learning", "Data Science"]
  },
      {
    id: 5,
    title: { ES: "Diagnóstico IA", EN: "AI Diagnostics" },
    description: {
      ES: "Sistema avanzado de diagnóstico para automoción impulsado por inteligencia artificial, mejorando la precisión y rapidez.",
      EN: "Advanced automotive diagnostic system powered by artificial intelligence, improving accuracy and speed."
    },
    tags: ["AI", "Python", "Machine Learning"]
  },
      {
    id: 6,
    title: { ES: "Auditoría WiFi", EN: "WiFi Audit" },
    description: {
      ES: "Herramienta de ciberseguridad para auditoría y pentesting de redes inalámbricas, permitiendo identificar vulnerabilidades.",
      EN: "Cybersecurity tool for auditing and pentesting wireless networks, allowing identification of vulnerabilities."
    },
    tags: ["Cybersecurity", "Hacking", "Python"]
  }
];

export const SKILLS_DATA: SkillFolder[] = [
  {
    name: "Backend",
    isOpen: true,
    files: [
      {
        name: "python.json",
        type: "json",
        color: "text-yellow-400",
        content: JSON.stringify({
          id: "python",
          name: "Python",
          description: "Scripting, AI & Robust Backend.",
          config: {
            level: "Expert",
            uses: ["AI", "Data", "Scripts"],
            coffee_needed: true
          }
        }, null, 2)
      },
      {
        name: "java.json",
        type: "json",
        color: "text-orange-400",
        content: JSON.stringify({
          id: "java",
          name: "Java",
          description: "Enterprise grade applications.",
          config: {
            level: "Advanced",
            frameworks: ["Spring Boot", "Hibernate"],
            stable: true
          }
        }, null, 2)
      },
      {
        name: "cpp.json",
        type: "json",
        color: "text-blue-400",
        content: JSON.stringify({
          id: "cpp",
          name: "C++",
          description: "High performance computing.",
          config: {
            level: "Intermediate",
            uses: ["Embedded", "Systems"],
            pointers: "managed"
          }
        }, null, 2)
      }
    ]
  },
  {
    name: "Frontend",
    isOpen: false,
    files: [
      {
        name: "react.json",
        type: "json",
        color: "text-cyan-400",
        content: JSON.stringify({
          id: "react",
          name: "React",
          description: "Modern UI Library.",
          config: {
            level: "Advanced",
            hooks: ["useState", "useEffect", "useContext"],
            performance: "high"
          }
        }, null, 2)
      },
      {
        name: "tailwind.json",
        type: "json",
        color: "text-sky-400",
        content: JSON.stringify({
          id: "tailwind",
          name: "Tailwind CSS",
          description: "Utility-first CSS framework.",
          config: {
            speed: "Fast",
            customizable: true,
            dark_mode: true
          }
        }, null, 2)
      }
    ]
  },
    {
    name: "DevOps",
    isOpen: false,
    files: [
      {
        name: "docker.json",
        type: "json",
        color: "text-blue-500",
        content: JSON.stringify({
          id: "docker",
          name: "Docker",
          description: "Containerization platform.",
          config: {
            containers: "isolated",
            compose: true,
            registry: "Docker Hub"
          }
        }, null, 2)
      },
      {
        name: "git.json",
        type: "json",
        color: "text-orange-600",
        content: JSON.stringify({
          id: "git",
          name: "Git",
          description: "Version control.",
          config: {
            branching: "feature-based",
            merging: "pull-requests",
            platform: "GitHub"
          }
        }, null, 2)
      }
    ]
  }
];