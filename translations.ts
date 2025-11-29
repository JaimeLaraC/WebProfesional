import { TranslationData } from './types';
import {
    Code2, Shield, Cpu, Box, Database, Terminal, Globe, Command, Layers, Braces, Coffee, Zap, Lock
} from 'lucide-react';

export const TRANSLATIONS: Record<'es' | 'en', TranslationData> = {
    es: {
        nav: {
            about: "Sobre mí",
            experience: "Experiencia",
            education: "Educación",
            projects: "Proyectos",
            skills: "Habilidades",
            terminal: "Terminal"
        },
        hero: {
            greeting: "HELLO_WORLD",
            role: "Ingeniero de Software & IA",
            description_start: "",
            description_bold_1: "",
            description_mid: "",
            description_bold_2: "",
            description_end: "",
            quote: "",
            system_status: "Sistema Operativo",
            user_id: "JL-2025",
            subtitle: "SOY JAIME",
            stats: [
                { label: "Rol", value: "Software Engineer" },
                { label: "Ubicación", value: "España (Remoto)" },
                { label: "Estado", value: "Disponible" },
                { label: "Enfoque", value: "Crear Impacto " }
            ],
            ide: {
                bio: {
                    comment: "// Ejecutando secuencia_bio...",
                    variable: "desarrollador",
                    value: "Jaime Lara",
                    function: "mision",
                    return: "Transformar problemas complejos en código limpio."
                },
                stack: {
                    frontend: "frontend",
                    backend: "backend",
                    ai: "ia",
                    status: "estado"
                },
                mindset: {
                    title: "# Principios_Core",
                    p1: "- El código es poesía, la lógica es arte.",
                    p2: "- El fracaso es solo una variable no definida.",
                    mantra_title: "## Mantra",
                    mantra: "\"No se trata de que funcione. Se trata de que escale.\""
                },
                status: {
                    info_loc: "Ubicación: España (Remoto)",
                    info_energy: "Energía: 85% (Se requiere café)",
                    warn: "Fecha límite acercándose",
                    ok: "Listo para colaborar"
                }
            }
        },
        titles: {
            experience: "experiencia",
            education: "educación",
            projects: "proyectos",
            skills: "habilidades",
            terminal: "Terminal Mode",
            ready: "¿Listo para crear algo increíble?",
            talk: "Hablemos 👋",
            footer: "Creado con React & IA por Jaime Lara"
        },
        terminal: {
            welcome: "Bienvenido a JaimeOS v3.0.0",
            system: "Carga del sistema: 0.02, 0.04 | Modo Interactivo: ON",
            help_prompt: "Escribe 'help' para ver la lista de comandos.",
            try: "Prueba: ai <pregunta>, about, projects, contact",
            processing: "Procesando..."
        },
        chat: {
            title: "Asistente IA",
            welcome: "¡Hola! Soy el asistente virtual de Jaime. ¿En qué puedo ayudarte?",
            placeholder: "Pregúntame algo...",
            error: "Tengo problemas de conexión en este momento. Por favor, inténtalo de nuevo."
        },
        services_section: {
            title: "Experiencia Técnica",
            description: "Combino la precisión de la ingeniería con la resolución creativa de problemas para entregar software que impulsa el crecimiento empresarial."
        },
        skills_section: {
            title: "habilidades",
            subtitle: "Selecciona una vista para explorar mi stack tecnológico.",
            tabs: {
                ide: "IDE",
                constellation: "Ecosistema"
            },
            skills: {
                python: { label: "Python", description: "Scripting, IA y Backend robusto." },
                java: { label: "Java", description: "Sistemas empresariales y POO." },
                cpp: { label: "C++", description: "Alto rendimiento y sistemas embebidos." },
                sql: { label: "SQL", description: "Gestión eficiente de bases de datos." },
                js: { label: "JavaScript", description: "Interactividad y lógica Frontend." },
                react: { label: "React", description: "Interfaces modernas y reactivas." },
                docker: { label: "Docker", description: "Contenerización y despliegue." },
                linux: { label: "Linux", description: "Administración de sistemas y servidores." },
                git: { label: "Git", description: "Control de versiones y colaboración." },
                cloud: { label: "Cloud / IoT", description: "Infraestructura y dispositivos conectados." },
                ai: { label: "AI & DL", description: "Redes neuronales y modelos predictivos." },
                cyber: { label: "Security", description: "Auditoría y protección de redes." },
                apis: { label: "REST APIs", description: "Conexión entre servicios." }
            }
        },
        experience: [
            {
                id: '1',
                company: "Cojali S. L.",
                role: "AI Diagnostic Test Engineer",
                year: "2025",
                description: "Desarrollo de pruebas de diagnóstico impulsadas por inteligencia artificial. Contrato de formación enfocado en la innovación automotriz y tecnológica en Campo de Criptana.",
                techStack: ["Python", "TensorFlow", "AutoML", "Big Data"],
                responsibilities: [
                    "Desarrollo de diagnósticos impulsados por IA",
                    "Innovación en sistemas automotrices",
                    "Optimización de algoritmos de detección"
                ]
            }
        ],
        education: [
            {
                id: '1',
                school: 'Universidad de Castilla-La Mancha',
                degree: 'Grado en Ingeniería de Software',
                year: '2024',
                imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
                skills: ['Algoritmos', 'Estructuras de Datos', 'Arquitectura Software', 'Bases de Datos', 'Ingeniería Web'],
                type: 'degree'
            },
            {
                id: '2',
                school: 'Udemy',
                degree: 'Certificación: Deep Learning y AI con Python',
                year: '2023',
                imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
                skills: ['TensorFlow', 'Neural Networks', 'Computer Vision', 'Pandas', 'NumPy'],
                type: 'certification'
            },
            {
                id: '3',
                school: 'Mastermind',
                degree: 'Certificación: Hacking de Redes Inalámbricas',
                year: '2022',
                imageUrl: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=800&auto=format&fit=crop',
                skills: ['Aircrack-ng', 'WPA2 Protocol', 'Network Sniffing', 'Kali Linux', 'Bash Scripting'],
                type: 'certification'
            }
        ],
        projects: [
            {
                id: '1',
                title: 'Bot de Telegram IA',
                description: 'Diseñé y programé un bot de Telegram utilizando Python y la API de Telegram. Integra funcionalidades avanzadas como respuestas automáticas y conexión con APIs externas (ChatGPT) para interacciones inteligentes.',
                tags: ['Python', 'Telegram API', 'ChatGPT'],
                fileName: 'telegram_bot.py',
                language: 'python',
                runOutput: `> python telegram_bot.py
[INFO] Starting bot...
[INFO] Loaded OpenAI API Key: sk-****
[INFO] Application started. Polling...
[INFO] User 12938 connected.
[INFO] Received message: "Hola bot"
[INFO] Sent response: "Hola! Soy un bot..."`,
                code: `import logging
from telegram import Update
from telegram.ext import ApplicationBuilder, ContextTypes, CommandHandler
import openai

# Configuración
openai.api_key = "sk-..."
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await context.bot.send_message(
        chat_id=update.effective_chat.id, 
        text="Hola! Soy un bot potenciado por IA. Pregúntame lo que quieras."
    )

async def ask_gpt(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_input = " ".join(context.args)
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=user_input,
        max_tokens=150
    )
    await context.bot.send_message(
        chat_id=update.effective_chat.id,
        text=response.choices[0].text.strip()
    )

if __name__ == '__main__':
    application = ApplicationBuilder().token('YOUR_TOKEN').build()
    
    start_handler = CommandHandler('start', start)
    gpt_handler = CommandHandler('ask', ask_gpt)
    
    application.add_handler(start_handler)
    application.add_handler(gpt_handler)
    
    application.run_polling()`
            },
            {
                id: '2',
                title: 'Cloud con Raspberry Pi',
                description: 'Configuré y gestioné un servidor Nextcloud en una Raspberry Pi para crear una nube privada. Permite almacenar, sincronizar y acceder a archivos de manera segura desde cualquier dispositivo en la red.',
                tags: ['Raspberry Pi', 'Nextcloud', 'Linux'],
                fileName: 'setup_cloud.sh',
                language: 'shell',
                runOutput: `> ./setup_cloud.sh
[+] Updating repositories... Done.
[+] Installing Apache2... Done.
[+] Downloading Nextcloud v24.0.0...
[+] Unzipping files...
[+] Setting permissions for www-data...
[+] Enabling site configuration...
[SUCCESS] Nextcloud is running at http://localhost`,
                code: `#!/bin/bash
# Configuración automática de Nextcloud en Raspberry Pi

echo "Actualizando sistema..."
sudo apt update && sudo apt upgrade -y

echo "Instalando Apache y PHP..."
sudo apt install apache2 php libapache2-mod-php mariadb-server -y

echo "Descargando Nextcloud..."
wget https://download.nextcloud.com/server/releases/nextcloud-24.0.0.zip
unzip nextcloud-24.0.0.zip
sudo mv nextcloud /var/www/

echo "Configurando permisos..."
sudo chown -R www-data:www-data /var/www/nextcloud
sudo chmod -R 755 /var/www/nextcloud

echo "Creando configuración de Apache..."
cat <<EOF > /etc/apache2/sites-available/nextcloud.conf
<VirtualHost *:80>
    DocumentRoot /var/www/nextcloud
    ServerName nube.jaime.dev
    <Directory /var/www/nextcloud/>
        Require all granted
        AllowOverride All
        Options FollowSymLinks MultiViews
    </Directory>
</VirtualHost>
EOF

sudo a2ensite nextcloud.conf
sudo systemctl reload apache2

echo "Instalación completada. Accede a http://localhost para finalizar."`
            },
            {
                id: '3',
                title: 'Detección con Dron',
                description: 'Sistema de detección de vehículos en tiempo real utilizando YOLOv5 y un dron. Permite identificar y rastrear vehículos en movimiento, optimizando el análisis visual aéreo.',
                tags: ['YOLOv5', 'Python', 'Computer Vision'],
                fileName: 'drone_detection.py',
                language: 'python',
                runOutput: `> python drone_detection.py
Loading YOLOv5 model (best.pt)...
Fusing layers...
Model Summary: 213 layers, 7012822 parameters.
[STREAM] Connected to rtsp://192.168.1.1:554
[DETECTION] Car 98% at [102, 304]
[DETECTION] Truck 85% at [500, 200]
[DETECTION] Person 92% at [50, 50]`,
                code: `import torch
import cv2
import numpy as np

# Cargar modelo YOLOv5 pre-entrenado
model = torch.hub.load('ultralytics/yolov5', 'custom', path='best.pt')

# Configurar captura de video del Dron (Stream RTSP)
cap = cv2.VideoCapture("rtsp://192.168.1.1:554/stream")

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Inferencia
    results = model(frame)

    # Procesar detecciones
    for *box, conf, cls in results.xyxy[0]:
        # Filtrar por confianza > 0.5
        if conf > 0.5:
            x1, y1, x2, y2 = map(int, box)
            label = f'{model.names[int(cls)]} {conf:.2f}'
            
            # Dibujar bounding box
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(frame, label, (x1, y1 - 10), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    cv2.imshow('Drone View - YOLOv5', frame)
    
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()`
            },
            {
                id: '4',
                title: 'Predicción Deportiva IA',
                description: 'Modelo de IA para predecir resultados de fútbol. Analiza datos históricos y estadísticas clave (goles, posesión, rendimiento) para ofrecer predicciones precisas.',
                tags: ['AI', 'Machine Learning', 'Data Science'],
                fileName: 'match_prediction.ipynb',
                language: 'python',
                runOutput: `> jupyter nbconvert --to script match_prediction.ipynb
[NbConvertApp] Converting notebook...
> python match_prediction.py
Loading dataset: premier_league_2023.csv...
Training RandomForestClassifier...
[====================] 100%
Model Accuracy: 0.87
Feature Importance:
- home_form: 0.42
- market_value_diff: 0.35
- h2h_wins: 0.15`,
                code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Cargar dataset de partidos históricos
data = pd.read_csv('premier_league_2023.csv')

# Feature Engineering
# Calculamos media de goles últimos 5 partidos
data['home_form'] = data.groupby('home_team')['home_goals'].transform(
    lambda x: x.rolling(5).mean()
)

features = ['home_form', 'away_form', 'h2h_wins', 'market_value_diff']
target = 'result' # 0: Draw, 1: Home Win, 2: Away Win

X = data[features].dropna()
y = data[target].loc[X.index]

# Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Modelo
rf = RandomForestClassifier(n_estimators=100, max_depth=10)
rf.fit(X_train, y_train)

# Predicción
preds = rf.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, preds):.2f}")

# Importancia de variables
print(dict(zip(features, rf.feature_importances_)))`
            },
            {
                id: '5',
                title: 'Diagnóstico IA',
                description: 'Sistema avanzado de diagnóstico para automoción impulsado por inteligencia artificial, mejorando la precisión y rapidez en la detección de fallos mecánicos.',
                tags: ['AI', 'Python', 'Machine Learning'],
                fileName: 'vehicle_diag.py',
                language: 'python',
                runOutput: `> python vehicle_diag.py
Loading Model: engine_fault_detector_v2.h5...
[DATA] Stream received from ECU #4
[ANALYSIS] Processing batch...
[RESULT] Fault detected: P0300 (Random Misfire)
[CONFIDENCE] 0.92
[ACTION] Triggering dashboard warning light.`,
                code: `import numpy as np
import tensorflow as tf
from tensorflow import keras

# Cargar modelo de diagnóstico entrenado
model = keras.models.load_model('engine_fault_detector_v2.h5')

def diagnose_telemetry(telemetry_data):
    """
    Analiza datos de sensores en tiempo real (RPM, Temp, Vibración)
    """
    # Normalización de datos
    processed_data = (telemetry_data - np.mean(telemetry_data)) / np.std(telemetry_data)
    processed_data = processed_data.reshape(1, 100, 3) # Batch, TimeSteps, Features
    
    # Predicción
    prediction = model.predict(processed_data)
    fault_probability = prediction[0][1] # Clase 1 = Fallo Crítico
    
    if fault_probability > 0.85:
        return {
            "status": "CRITICAL",
            "code": "P0300",
            "message": "Fallo de encendido aleatorio detectado",
            "probability": float(fault_probability)
        }
    elif fault_probability > 0.5:
        return {
            "status": "WARNING",
            "code": "WARN-01",
            "message": "Vibración anómala, revisar soportes",
            "probability": float(fault_probability)
        }
    
    return {"status": "OK", "message": "Parámetros nominales"}`
            },
            {
                id: '6',
                title: 'Auditoría WiFi',
                description: 'Herramienta de ciberseguridad para auditoría y pentesting de redes inalámbricas, permitiendo identificar vulnerabilidades en protocolos WPA/WPA2.',
                tags: ['Cybersecurity', 'Hacking', 'Python'],
                fileName: 'wifi_audit.py',
                language: 'python',
                runOutput: `> sudo python wifi_audit.py
[sudo] password for jaime: 
Iniciando escaneo en wlan0mon...
[*] Detección: SSID=Cafeteria_Free | BSSID=AA:BB:CC:11:22:33 | ENC=WPA2
[*] Detección: SSID=Private_Net | BSSID=11:22:33:44:55:66 | ENC=WPA2
[!!!] Handshake capturado para Private_Net!
[IO] Saved to Private_Net_handshake.pcap`,
                code: `from scapy.all import *
import os
import sys

# Interfaz en modo monitor requerida
INTERFACE = "wlan0mon"

def packet_handler(pkt):
    if pkt.haslayer(Dot11Beacon):
        ssid = pkt.info.decode()
        bssid = pkt.addr2
        stats = pkt[Dot11Beacon].network_stats()
        channel = stats.get("channel")
        crypto = stats.get("crypto")
        
        print(f"[*] Detección: SSID={ssid} | BSSID={bssid} | CH={channel} | ENC={crypto}")
        
        # Detectar Handshake WPA (EAPOL)
        if pkt.haslayer(EAPOL):
            print(f"[!!!] Handshake capturado para {ssid}!")
            wrpcap(f"{ssid}_handshake.pcap", pkt, append=True)

print(f"Iniciando escaneo en {INTERFACE}...")
print("Presiona Ctrl+C para detener.")

try:
    sniff(iface=INTERFACE, prn=packet_handler)
except KeyboardInterrupt:
    print("\nDeteniendo auditoría...")
    sys.exit(0)
except Exception as e:
    print(f"Error: {e}")`
            }
        ],
        services: [
            {
                id: '1',
                title: 'Ingeniería Full Stack',
                description: 'Arquitecturas web escalables construidas con React, Node.js e infraestructura cloud moderna.',
                icon: null // Icons are handled in component
            },
            {
                id: '2',
                title: 'Inteligencia Artificial',
                description: 'Integración de LLMs, modelos predictivos y agentes de IA personalizados para la automatización empresarial.',
                icon: null
            },
            {
                id: '3',
                title: 'Arquitectura de Sistemas',
                description: 'Diseño de sistemas robustos y de alta disponibilidad capaces de manejar millones de peticiones.',
                icon: null
            },
            {
                id: '4',
                title: 'Ciberseguridad',
                description: 'Implementación de prácticas de seguridad para proteger datos e infraestructura de amenazas.',
                icon: null
            },
            {
                id: '5',
                title: 'DevOps & Cloud',
                description: 'Pipelines CI/CD automatizados y despliegues nativos en la nube en AWS y GCP.',
                icon: null
            },
            {
                id: '6',
                title: 'Rendimiento',
                description: 'Optimización de sistemas existentes para máxima velocidad y eficiencia de recursos.',
                icon: null
            }
        ]
    },
    en: {
        nav: {
            about: "About Me",
            experience: "Experience",
            education: "Education",
            projects: "Projects",
            skills: "Skills",
            terminal: "Terminal"
        },
        hero: {
            greeting: "HELLO_WORLD",
            role: "Software Engineer & AI",
            description_start: "",
            description_bold_1: "",
            description_mid: "",
            description_bold_2: "",
            description_end: "",
            quote: "",
            system_status: "System Operational",
            user_id: "JL-2025",
            subtitle: "I AM JAIME",
            stats: [
                { label: "Role", value: "Software Engineer" },
                { label: "Location", value: "Spain (Remote)" },
                { label: "Status", value: "Available" },
                { label: "Focus", value: "Creating Impact 🚀" }
            ],
            ide: {
                bio: {
                    comment: "// Executing bio_sequence...",
                    variable: "developer",
                    value: "Jaime Lara",
                    function: "mission",
                    return: "Transform complex problems into clean code."
                },
                stack: {
                    frontend: "frontend",
                    backend: "backend",
                    ai: "ai",
                    status: "status"
                },
                mindset: {
                    title: "# Core_Principles",
                    p1: "- Code is poetry, logic is art.",
                    p2: "- Failure is just an undefined variable.",
                    mantra_title: "## Mantra",
                    mantra: "\"It's not about working. It's about scaling.\""
                },
                status: {
                    info_loc: "Location: Spain (Remote)",
                    info_energy: "Energy: 85% (Coffee required)",
                    warn: "Deadline approaching",
                    ok: "Ready to collaborate"
                }
            }
        },
        titles: {
            experience: "experience",
            education: "education",
            projects: "projects",
            skills: "skills",
            terminal: "Terminal Mode",
            ready: "Ready to create something amazing?",
            talk: "Let's Talk 👋",
            footer: "Created with React & AI by Jaime Lara"
        },
        terminal: {
            welcome: "Welcome to JaimeOS v3.0.0",
            system: "System load: 0.02, 0.04 | Interactive Mode: ON",
            help_prompt: "Type 'help' to see the command list.",
            try: "Try: ai <question>, about, projects, contact",
            processing: "Processing..."
        },
        chat: {
            title: "AI Assistant",
            welcome: "Hi! I'm Jaime's virtual assistant. How can I help you?",
            placeholder: "Ask me anything...",
            error: "I'm having connection issues right now. Please try again."
        },
        services_section: {
            title: "Technical Expertise",
            description: "I combine engineering precision with creative problem solving to deliver software that drives business growth."
        },
        skills_section: {
            title: "skills",
            subtitle: "Select a view to explore my tech stack.",
            tabs: {
                ide: "IDE",
                constellation: "Ecosystem"
            },
            skills: {
                python: { label: "Python", description: "Scripting, AI, and robust Backend." },
                java: { label: "Java", description: "Enterprise systems and OOP." },
                cpp: { label: "C++", description: "High performance and embedded systems." },
                sql: { label: "SQL", description: "Efficient database management." },
                js: { label: "JavaScript", description: "Interactivity and Frontend logic." },
                react: { label: "React", description: "Modern and reactive interfaces." },
                docker: { label: "Docker", description: "Containerization and deployment." },
                linux: { label: "Linux", description: "System administration and servers." },
                git: { label: "Git", description: "Version control and collaboration." },
                cloud: { label: "Cloud / IoT", description: "Infrastructure and connected devices." },
                ai: { label: "AI & DL", description: "Neural networks and predictive models." },
                cyber: { label: "Security", description: "Network auditing and protection." },
                apis: { label: "REST APIs", description: "Service connection." }
            }
        },
        experience: [
            {
                id: '1',
                company: "Cojali S. L.",
                role: "AI Diagnostic Test Engineer",
                year: "2025",
                description: "Development of AI-driven diagnostic tests. Training contract focused on automotive and technological innovation in Campo de Criptana.",
                techStack: ["Python", "TensorFlow", "AutoML", "Big Data"],
                responsibilities: [
                    "Development of AI-driven diagnostics",
                    "Innovation in automotive systems",
                    "Optimization of detection algorithms"
                ]
            }
        ],
        education: [
            {
                id: '1',
                school: 'University of Castilla-La Mancha',
                degree: 'Software Engineering Degree',
                year: "2024",
                imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
                skills: ['Algorithms', 'Data Structures', 'Software Architecture', 'Databases', 'Web Engineering'],
                type: 'degree'
            },
            {
                id: '2',
                school: 'Udemy',
                degree: 'Certification: Deep Learning and AI with Python',
                year: "2023",
                imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
                skills: ['TensorFlow', 'Neural Networks', 'Computer Vision', 'Pandas', 'NumPy'],
                type: 'certification'
            },
            {
                id: '3',
                school: 'Mastermind',
                degree: 'Certification: Wireless Network Hacking',
                year: "2022",
                imageUrl: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=800&auto=format&fit=crop',
                skills: ['Aircrack-ng', 'WPA2 Protocol', 'Network Sniffing', 'Kali Linux', 'Bash Scripting'],
                type: 'certification'
            }
        ],
        projects: [
            {
                id: '1',
                title: 'Telegram AI Bot',
                description: 'Designed and programmed a Telegram bot using Python and Telegram API. Integrates advanced features like auto-responses and external API connections (ChatGPT) for intelligent interactions.',
                tags: ['Python', 'Telegram API', 'ChatGPT'],
                fileName: 'telegram_bot.py',
                language: 'python',
                runOutput: `> python telegram_bot.py
[INFO] Starting bot...
[INFO] Loaded OpenAI API Key: sk-****
[INFO] Application started. Polling...
[INFO] User 12938 connected.
[INFO] Received message: "Hello bot"
[INFO] Sent response: "Hello! I am a bot..."`,
                code: `import logging
from telegram import Update
from telegram.ext import ApplicationBuilder, ContextTypes, CommandHandler
import openai

# Configuration
openai.api_key = "sk-..."
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await context.bot.send_message(
        chat_id=update.effective_chat.id, 
        text="Hello! I am an AI-powered bot. Ask me anything."
    )

async def ask_gpt(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_input = " ".join(context.args)
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=user_input,
        max_tokens=150
    )
    await context.bot.send_message(
        chat_id=update.effective_chat.id,
        text=response.choices[0].text.strip()
    )

if __name__ == '__main__':
    application = ApplicationBuilder().token('YOUR_TOKEN').build()
    
    start_handler = CommandHandler('start', start)
    gpt_handler = CommandHandler('ask', ask_gpt)
    
    application.add_handler(start_handler)
    application.add_handler(gpt_handler)
    
    application.run_polling()`
            },
            {
                id: '2',
                title: 'Raspberry Pi Cloud',
                description: 'Configured and managed a Nextcloud server on a Raspberry Pi to create a private cloud. Allows secure file storage, sync, and access from any device on the network.',
                tags: ['Raspberry Pi', 'Nextcloud', 'Linux'],
                fileName: 'setup_cloud.sh',
                language: 'shell',
                runOutput: `> ./setup_cloud.sh
[+] Updating repositories... Done.
[+] Installing Apache2... Done.
[+] Downloading Nextcloud v24.0.0...
[+] Unzipping files...
[+] Setting permissions for www-data...
[+] Enabling site configuration...
[SUCCESS] Nextcloud is running at http://localhost`,
                code: `#!/bin/bash
# Automatic Nextcloud Setup on Raspberry Pi

echo "Updating system..."
sudo apt update && sudo apt upgrade -y

echo "Installing Apache and PHP..."
sudo apt install apache2 php libapache2-mod-php mariadb-server -y

echo "Downloading Nextcloud..."
wget https://download.nextcloud.com/server/releases/nextcloud-24.0.0.zip
unzip nextcloud-24.0.0.zip
sudo mv nextcloud /var/www/

echo "Configuring permissions..."
sudo chown -R www-data:www-data /var/www/nextcloud
sudo chmod -R 755 /var/www/nextcloud

echo "Creating Apache configuration..."
cat <<EOF > /etc/apache2/sites-available/nextcloud.conf
<VirtualHost *:80>
    DocumentRoot /var/www/nextcloud
    ServerName cloud.jaime.dev
    <Directory /var/www/nextcloud/>
        Require all granted
        AllowOverride All
        Options FollowSymLinks MultiViews
    </Directory>
</VirtualHost>
EOF

sudo a2ensite nextcloud.conf
sudo systemctl reload apache2

echo "Installation complete. Access http://localhost to finish."`
            },
            {
                id: '3',
                title: 'Drone Detection',
                description: 'Real-time vehicle detection system using YOLOv5 and a drone. Identifies and tracks moving vehicles, optimizing aerial visual analysis.',
                tags: ['YOLOv5', 'Python', 'Computer Vision'],
                fileName: 'drone_detection.py',
                language: 'python',
                runOutput: `> python drone_detection.py
Loading YOLOv5 model (best.pt)...
Fusing layers...
Model Summary: 213 layers, 7012822 parameters.
[STREAM] Connected to rtsp://192.168.1.1:554
[DETECTION] Car 98% at [102, 304]
[DETECTION] Truck 85% at [500, 200]
[DETECTION] Person 92% at [50, 50]`,
                code: `import torch
import cv2
import numpy as np

# Load pre-trained YOLOv5 model
model = torch.hub.load('ultralytics/yolov5', 'custom', path='best.pt')

# Configure Drone Video Capture (RTSP Stream)
cap = cv2.VideoCapture("rtsp://192.168.1.1:554/stream")

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Inference
    results = model(frame)

    # Process detections
    for *box, conf, cls in results.xyxy[0]:
        # Filter by confidence > 0.5
        if conf > 0.5:
            x1, y1, x2, y2 = map(int, box)
            label = f'{model.names[int(cls)]} {conf:.2f}'
            
            # Draw bounding box
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(frame, label, (x1, y1 - 10), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    cv2.imshow('Drone View - YOLOv5', frame)
    
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()`
            },
            {
                id: '4',
                title: 'Sports Prediction AI',
                description: 'AI model to predict soccer results. Analyzes historical data and key statistics (goals, possession, performance) to offer accurate predictions.',
                tags: ['AI', 'Machine Learning', 'Data Science'],
                fileName: 'match_prediction.ipynb',
                language: 'python',
                runOutput: `> jupyter nbconvert --to script match_prediction.ipynb
[NbConvertApp] Converting notebook...
> python match_prediction.py
Loading dataset: premier_league_2023.csv...
Training RandomForestClassifier...
[====================] 100%
Model Accuracy: 0.87
Feature Importance:
- home_form: 0.42
- market_value_diff: 0.35
- h2h_wins: 0.15`,
                code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load historical match dataset
data = pd.read_csv('premier_league_2023.csv')

# Feature Engineering
# Calculate average goals last 5 matches
data['home_form'] = data.groupby('home_team')['home_goals'].transform(
    lambda x: x.rolling(5).mean()
)

features = ['home_form', 'away_form', 'h2h_wins', 'market_value_diff']
target = 'result' # 0: Draw, 1: Home Win, 2: Away Win

X = data[features].dropna()
y = data[target].loc[X.index]

# Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Model
rf = RandomForestClassifier(n_estimators=100, max_depth=10)
rf.fit(X_train, y_train)

# Prediction
preds = rf.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, preds):.2f}")

# Feature Importance
print(dict(zip(features, rf.feature_importances_)))`
            },
            {
                id: '5',
                title: 'AI Diagnostic',
                description: 'Advanced diagnostic system for automotive powered by artificial intelligence, improving precision and speed in mechanical fault detection.',
                tags: ['AI', 'Python', 'Machine Learning'],
                fileName: 'vehicle_diag.py',
                language: 'python',
                runOutput: `> python vehicle_diag.py
Loading Model: engine_fault_detector_v2.h5...
[DATA] Stream received from ECU #4
[ANALYSIS] Processing batch...
[RESULT] Fault detected: P0300 (Random Misfire)
[CONFIDENCE] 0.92
[ACTION] Triggering dashboard warning light.`,
                code: `import numpy as np
import tensorflow as tf
from tensorflow import keras

# Load trained diagnostic model
model = keras.models.load_model('engine_fault_detector_v2.h5')

def diagnose_telemetry(telemetry_data):
    """
    Analyzes real-time sensor data (RPM, Temp, Vibration)
    """
    # Data Normalization
    processed_data = (telemetry_data - np.mean(telemetry_data)) / np.std(telemetry_data)
    processed_data = processed_data.reshape(1, 100, 3) # Batch, TimeSteps, Features
    
    # Prediction
    prediction = model.predict(processed_data)
    fault_probability = prediction[0][1] # Class 1 = Critical Fault
    
    if fault_probability > 0.85:
        return {
            "status": "CRITICAL",
            "code": "P0300",
            "message": "Random misfire detected",
            "probability": float(fault_probability)
        }
    elif fault_probability > 0.5:
        return {
            "status": "WARNING",
            "code": "WARN-01",
            "message": "Abnormal vibration, check mounts",
            "probability": float(fault_probability)
        }
    
    return {"status": "OK", "message": "Nominal parameters"}`
            },
            {
                id: '6',
                title: 'WiFi Auditing',
                description: 'Cybersecurity tool for auditing and pentesting wireless networks, allowing identification of vulnerabilities in WPA/WPA2 protocols.',
                tags: ['Cybersecurity', 'Hacking', 'Python'],
                fileName: 'wifi_audit.py',
                language: 'python',
                runOutput: `> sudo python wifi_audit.py
[sudo] password for jaime: 
Starting scan on wlan0mon...
[*] Detection: SSID=Cafeteria_Free | BSSID=AA:BB:CC:11:22:33 | ENC=WPA2
[*] Detection: SSID=Private_Net | BSSID=11:22:33:44:55:66 | ENC=WPA2
[!!!] Handshake captured for Private_Net!
[IO] Saved to Private_Net_handshake.pcap`,
                code: `from scapy.all import *
import os
import sys

# Monitor mode interface required
INTERFACE = "wlan0mon"

def packet_handler(pkt):
    if pkt.haslayer(Dot11Beacon):
        ssid = pkt.info.decode()
        bssid = pkt.addr2
        stats = pkt[Dot11Beacon].network_stats()
        channel = stats.get("channel")
        crypto = stats.get("crypto")
        
        print(f"[*] Detection: SSID={ssid} | BSSID={bssid} | CH={channel} | ENC={crypto}")
        
        # Detect WPA Handshake (EAPOL)
        if pkt.haslayer(EAPOL):
            print(f"[!!!] Handshake captured for {ssid}!")
            wrpcap(f"{ssid}_handshake.pcap", pkt, append=True)

print(f"Starting scan on {INTERFACE}...")
print("Press Ctrl+C to stop.")

try:
    sniff(iface=INTERFACE, prn=packet_handler)
except KeyboardInterrupt:
    print("\nStopping audit...")
    sys.exit(0)
except Exception as e:
    print(f"Error: {e}")`
            }
        ],
        services: [
            {
                id: '1',
                title: 'Full Stack Engineering',
                description: 'Scalable web architectures built with React, Node.js, and modern cloud infrastructure.',
                icon: null
            },
            {
                id: '2',
                title: 'Artificial Intelligence',
                description: 'Integration of LLMs, predictive models, and custom AI agents for business automation.',
                icon: null
            },
            {
                id: '3',
                title: 'System Architecture',
                description: 'Designing robust, high-availability systems capable of handling millions of requests.',
                icon: null
            },
            {
                id: '4',
                title: 'Cybersecurity',
                description: 'Implementing security-first practices to protect data and infrastructure from threats.',
                icon: null
            },
            {
                id: '5',
                title: 'DevOps & Cloud',
                description: 'Automated CI/CD pipelines and cloud-native deployments on AWS and GCP.',
                icon: null
            },
            {
                id: '6',
                title: 'Performance',
                description: 'Optimization of existing systems for maximum speed and resource efficiency.',
                icon: null
            }
        ]
    }
};
