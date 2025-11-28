# Portfolio - Jaime Lara

Portafolio personal en React + Vite con diseño minimalista, animaciones suaves y secciones en español.

## Requisitos
- Node.js 18+ (recomendado)  
- npm

## Scripts
- `npm install` — instala dependencias  
- `npm run dev` — modo desarrollo (http://localhost:3000)  
- `npm run build` — build de producción en `dist/`  
- `npm run preview` — sirve el build para revisión local

## Estructura rápida
- `App.tsx`: compone las secciones principales.
- `components/`: Navbar, Hero, Experience (Cojali), Education, Projects, Skills (píldoras con física), Contact.
- `Gemini_Generated_Image_*.png`: imagen usada en Educación.
- `vite.config.ts`, `tsconfig.json`: configuración de build/TypeScript.

## Personalización
- Textos: edita cada archivo en `components/`.
- Experiencia: `components/Experience.tsx`.
- Educación: `components/Education.tsx` (puedes cambiar la imagen o agregar más items).
- Proyectos y habilidades: `components/Projects.tsx` y `components/Skills.tsx`.

No se requiere ninguna API key; todo corre localmente.
