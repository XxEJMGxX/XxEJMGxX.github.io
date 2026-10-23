export type Language = 'es' | 'en';

export interface Project {
  id: string;
  title: string;
  category: 'web' | 'desktop';
  windowUrl: string;
  icon: string;
  badge: { es: string; en: string };
  description: { es: string; en: string };
  tags: string[];
  liveUrl?: string;
  codeUrl?: string;
  hasUiModal?: boolean;
  hasPlayableDemo?: boolean;
  previewImage?: string;
  screenshots?: {
    src: string;
    title: { es: string; en: string };
    desc: { es: string; en: string };
  }[];
}

export const PORTFOLIO_CONTENT = {
  brand: {
    first: 'ELÍAS',
    last: 'NIETO'
  },
  nav: {
    about: { es: 'Sobre mí', en: 'About Me' },
    projects: { es: 'Proyectos', en: 'Projects' },
    skills: { es: 'Habilidades', en: 'Skills' },
    experience: { es: 'Experiencia', en: 'Experience' },
    contact: { es: 'Contacto', en: 'Contact' },
    cv: { es: 'Descargar CV', en: 'Download CV' }
  },
  hero: {
    statusBadge: {
      es: 'Disponible para Prácticas Formativas • Madrid',
      en: 'Available for IT Internship • Madrid'
    },
    fullName: 'Elías Nieto Urieta',
    titleBadge: {
      es: 'Desarrollador de Aplicaciones Web (DAW)',
      en: 'Web Application Developer (DAW)'
    },
    subtitle: {
      es: 'Estudiante de 2.º del Ciclo Superior en Desarrollo de Aplicaciones Web (DAW)',
      en: '2nd Year Student of the Higher Vocational Training Programme in Web Application Development'
    },
    bio: {
      es: 'Soy estudiante del ciclo de Desarrollo de Aplicaciones Web (DAW) y cuento con certificaciones técnicas en HarvardX (CS50) y Platzi. Poseo una sólida base en diseño de interfaces y frontend (HTML5, CSS3, JavaScript), backend (PHP, Java) y bases de datos (MySQL, MariaDB). Me considero una persona responsable, empática y me motiva el hecho de poder unirme en prácticas a un equipo tecnológico donde aportar soluciones eficientes y adquirir experiencia.',
      en: 'I am a Web Application Development (DAW) student certified in HarvardX (CS50) and Platzi. I have a solid foundation in interface design and frontend (HTML5, CSS3, JavaScript), backend (PHP, Java), and databases (MySQL, MariaDB). I consider myself a responsible and empathetic professional, highly motivated to join a tech team as an intern where I can provide efficient solutions and gain practical experience.'
    },
    ctaProjects: { es: 'Ver Portafolio de Proyectos', en: 'View Project Portfolio' },
    ctaContact: { es: 'Contactar', en: 'Contact Me' },
    ctaCv: { es: 'Ver / Descargar CV', en: 'View / Download CV' },
    photoTitle: { es: 'Digitech FP • 2.º DAW', en: 'Digitech FP • 2nd Year DAW' },
    photoLangs: { es: 'Inglés C1 • Francés A1', en: 'English C1 • French A1' },
    location: '28037 San Blas (Madrid)',
    pdfUrl: '/CV_Elias_Nieto_DAW.pdf'
  },
  projects: [
    {
      id: 'sabor-binacional',
      title: 'Sabor Binacional',
      category: 'web',
      windowUrl: 'xxejmgxx.github.io/Sabor-Binacional',
      icon: '🫓🤝🥟',
      badge: {
        es: 'Portal Cultural y Gastronómico',
        en: 'Cultural & Culinary Web Portal'
      },
      description: {
        es: 'Sitio web divulgativo que une a Venezuela y Colombia como tierras hermanas, explicando las diferencias de nombres en productos cotidianos mediante un lenguaje neutro y accesible para eliminar fronteras.',
        en: 'Informative website uniting Venezuela and Colombia as sister lands, explaining vocabulary differences for everyday culinary products using neutral, accessible language across borders.'
      },
      tags: ['HTML5', 'CSS3', 'Responsive UI', 'JavaScript'],
      previewImage: '/assets/aistudio/image_17a916bd.png',
      liveUrl: 'https://xxejmgxx.github.io/Sabor-Binacional/',
      codeUrl: 'https://github.com/XxEJMGxX/Sabor-Binacional'
    },
    {
      id: 'java-quiz',
      title: 'Quiz de Conocimientos de Java',
      category: 'desktop',
      windowUrl: 'JavaQuizApp.jar — JavaFX',
      icon: '⏱️☕🖥️',
      previewImage: '/assets/aistudio/image_0491c7e0.png',
      badge: {
        es: 'Aplicación de Escritorio Interactiva',
        en: 'Interactive Desktop Application'
      },
      description: {
        es: 'Aplicación interactiva de preguntas tipo test (A, B, C, D) con temporizador por pregunta para evaluar conocimientos de Java. Interfaz construida con JavaFX, Gluon Scene Builder y hojas de estilo CSS.',
        en: 'Interactive multiple-choice quiz app (A, B, C, D) with a countdown timer to test Java knowledge. Built using JavaFX, Gluon Scene Builder, and custom CSS styling.'
      },
      tags: ['Java', 'JavaFX', 'Scene Builder', 'CSS', 'MVC'],
      codeUrl: 'https://github.com/XxEJMGxX/Java-Quiz',
      hasUiModal: true,
      hasPlayableDemo: true,
      screenshots: [
        {
          src: '/assets/aistudio/image_0491c7e0.png',
          title: {
            es: 'Portada y Banner Oficial del Proyecto',
            en: 'Official Project Banner & Tech Stack'
          },
          desc: {
            es: 'Identidad visual del proyecto: Quiz de Conocimientos de Java (JavaFX, MVC, Maven) con mockup interactivo.',
            en: 'Visual identity of the project: Java Knowledge Quiz (JavaFX, MVC, Maven) with interactive mockups.'
          }
        },
        {
          src: '/assets/aistudio/Men__de_inicio_8badbb29.png',
          title: {
            es: 'Menú de Inicio (JavaQuiz - Edición DAW)',
            en: 'Main Start Menu (JavaQuiz - DAW Edition)'
          },
          desc: {
            es: 'Pantalla principal para el registro de jugador, acceso a puntuaciones, modo pantalla completa y selector de opciones.',
            en: 'Main screen for player registration, score history access, fullscreen mode, and option settings.'
          }
        },
        {
          src: '/assets/aistudio/Respuesta_correcta_ed0e4cd7.png',
          title: {
            es: 'Pregunta en Curso: Respuesta Correcta',
            en: 'Active Question: Correct Answer Feedback'
          },
          desc: {
            es: 'Interfaz interactiva de pregunta tipo test con temporizador dinámico y retroalimentación visual en verde para la opción acertada.',
            en: 'Interactive multiple-choice test interface with dynamic countdown timer and green visual feedback for the correct answer.'
          }
        },
        {
          src: '/assets/aistudio/Respuesta_incorreta_be76b77c.png',
          title: {
            es: 'Pregunta en Curso: Respuesta Incorrecta',
            en: 'Active Question: Incorrect Answer Feedback'
          },
          desc: {
            es: 'Alerta visual en rojo al seleccionar una alternativa errónea, destacando la respuesta correcta en verde para reforzar el aprendizaje.',
            en: 'Red visual alert upon selecting an erroneous choice, with the correct option highlighted in green for learning reinforcement.'
          }
        },
        {
          src: '/assets/aistudio/Resultados_cd28c393.png',
          title: {
            es: 'Pantalla de Resultados y Calificación',
            en: 'Final Results & Score Summary'
          },
          desc: {
            es: 'Resumen detallado de la partida con total de aciertos, fallos, puntuación porcentual y opciones para reiniciar o guardar la puntuación.',
            en: 'Detailed match summary displaying total correct and incorrect answers, percentage score, and options to retry or save score.'
          }
        },
        {
          src: '/assets/aistudio/Clasificaci_n_0e61dc5d.png',
          title: {
            es: 'Ventana Modal: Clasificación y Puntuaciones',
            en: 'Modal Window: High Scores & Leaderboard'
          },
          desc: {
            es: 'Tabla de puntuaciones históricas con nombres de participantes, aciertos, fallos y fechas persistidas localmente.',
            en: 'Historical leaderboard table showing player names, correct/incorrect totals, and locally persisted match dates.'
          }
        }
      ]
    }
  ] as Project[],
  skillsSection: {
    title: {
      es: 'Competencias Técnicas y Formación',
      en: 'Technical Skills & Education'
    },
    techStackTitle: {
      es: 'Competencias Técnicas (CV Oficial)',
      en: 'Technical Competencies (Official CV)'
    },
    skillsList: [
      {
        category: {
          es: 'Frontend y UI/UX:',
          en: 'Frontend & UI/UX:'
        },
        description: {
          es: 'Maquetación semántica y responsive con HTML5 y CSS3, aportando interactividad dinámica mediante JavaScript. Prototipado visual centrado en el usuario utilizando Figma, Canva y el ecosistema Google Stitch.',
          en: 'Semantic, responsive layout with HTML5 & CSS3, interactive dynamism via JavaScript. User-centered visual prototyping with Figma, Canva, and Google Stitch ecosystem.'
        },
        items: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI', 'Figma', 'Canva', 'Google Stitch']
      },
      {
        category: {
          es: 'Backend y Arquitectura:',
          en: 'Backend & Architecture:'
        },
        description: {
          es: 'Programación del lado del servidor en PHP y Python. Desarrollo de aplicaciones robustas bajo el patrón MVC con Java y JavaFX, aplicando principios de Programación Orientada a Objetos.',
          en: 'Server-side programming in PHP and Python. Robust application development following MVC pattern with Java and JavaFX, applying OOP principles.'
        },
        items: ['PHP', 'Python', 'Java 17', 'JavaFX', 'Patrón MVC', 'POO']
      },
      {
        category: {
          es: 'Gestión de Bases de Datos:',
          en: 'Database Management:'
        },
        description: {
          es: 'Diseño de modelos relacionales, procesos de normalización y ejecución de consultas SQL optimizadas, empleando motores como MySQL y MariaDB.',
          en: 'Relational model design, database normalization, and optimized SQL queries using MySQL and MariaDB engines.'
        },
        items: ['MySQL', 'MariaDB', 'Modelos Relacionales', 'Normalización', 'Consultas SQL']
      },
      {
        category: {
          es: 'Servidores y Virtualización:',
          en: 'Servers & Virtualization:'
        },
        description: {
          es: 'Configuración y despliegue en entornos locales de prueba (XAMPP) y máquinas virtuales (Oracle VirtualBox), sumando conocimientos prácticos en containerización mediante Docker.',
          en: 'Configuration and deployment on local test environments (XAMPP) and virtual machines (Oracle VirtualBox), plus practical knowledge in containerization with Docker.'
        },
        items: ['Docker', 'XAMPP', 'Oracle VirtualBox', 'Despliegue Local']
      },
      {
        category: {
          es: 'Herramientas y Flujo de Trabajo:',
          en: 'Tools & Workflow:'
        },
        description: {
          es: 'Control de versiones con Git/GitHub y manejo ágil de VS Code. Gestión organizativa con Microsoft Office, Google Workspace y edición técnica avanzada en Antigravity.',
          en: 'Version control with Git/GitHub and agile use of VS Code. Organizational management with Microsoft Office, Google Workspace, and technical editing in Antigravity.'
        },
        items: ['Git', 'GitHub', 'VS Code', 'Microsoft Office', 'Google Workspace', 'Antigravity']
      }
    ],
    softSkillsTitle: {
      es: 'Habilidades Personales y Blandas',
      en: 'Personal & Soft Skills'
    },
    softSkills: [
      { es: 'Resolución de problemas', en: 'Problem Solving' },
      { es: 'Trabajo en equipo y comunicación', en: 'Teamwork & Communication' },
      { es: 'Adaptabilidad y curiosidad', en: 'Adaptability & Curiosity' },
      { es: 'Pensamiento analítico', en: 'Analytical Thinking' },
      { es: 'Organización y gestión del tiempo', en: 'Time Management & Organization' },
      { es: 'Responsabilidad y compromiso', en: 'Responsibility & Commitment' },
      { es: 'Orientación al usuario', en: 'User Orientation' }
    ],
    educationTitle: {
      es: 'Formación Académica y Cursos',
      en: 'Academic Education & Courses'
    },
    educationList: [
      {
        degree: {
          es: 'Ciclo Superior en Desarrollo de Aplicaciones Web (DAW)',
          en: 'HVET in Web Application Development (DAW)'
        },
        institution: 'Digitech FP',
        period: '2025 – Actualmente',
        badge: 'En curso'
      },
      {
        degree: {
          es: 'Bachillerato de Ciencias y Tecnología',
          en: 'Science & Technology High School Diploma'
        },
        institution: 'IES Alfredo Kraus',
        period: '2023 – 2025',
        badge: 'Graduado'
      }
    ],
    coursesList: [
      {
        title: "CS50's Web Programming (Python & JS)",
        institution: 'HarvardX / edX',
        period: 'CS50, 2024',
        details: {
          es: 'Lógica de programación y arquitectura de aplicaciones web',
          en: 'Programming logic and web application architecture'
        }
      },
      {
        title: 'Curso de Programación y Desarrollo de Software',
        institution: 'Platzi',
        period: 'Platzi, 2023',
        details: {
          es: 'Maquetación y desarrollo interactivo en entorno Frontend',
          en: 'Layout and interactive frontend development'
        }
      }
    ],
    languages: [
      { name: { es: 'Inglés', en: 'English' }, level: 'C1', desc: { es: 'Avanzado / Profesional', en: 'Advanced / Professional' } },
      { name: { es: 'Francés', en: 'French' }, level: 'A1', desc: { es: 'Básico', en: 'Basic' } },
      { name: { es: 'Español', en: 'Spanish' }, level: 'Nativo', desc: { es: 'Lengua materna', en: 'Native' } }
    ]
  },
  workExperience: [
    {
      role: {
        es: 'Atención al Cliente en Call Center',
        en: 'Customer Support Call Center Agent'
      },
      company: 'Intelcia (para Carrefour)',
      period: 'Junio 2024 – Septiembre 2024',
      description: {
        es: 'Resolución de incidencias y soporte al usuario aplicando comunicación efectiva, fortaleciendo mis competencias en atención al cliente, empatía y trabajo en equipo.',
        en: 'Incident resolution and user support applying effective communication, strengthening customer service skills, empathy, and teamwork.'
      },
      tags: ['Atención al Cliente', 'Resolución de Incidencias', 'Comunicación Efectiva', 'Trabajo en Equipo']
    }
  ],
  contact: {
    title: { es: '¿Hablamos?', en: "Let's Talk!" },
    subtitle: {
      es: '📍 28037 San Blas (Madrid) • Disponibilidad para entrevistas y convenio de prácticas.',
      en: '📍 28037 San Blas (Madrid) • Available for interviews and internship agreements.'
    },
    location: '28037 San Blas (Madrid)',
    email: 'eliasnietou@gmail.com',
    phone: '(+34) 603 81 96 89',
    phoneRaw: '+34603819689',
    github: 'https://github.com/XxEJMGxX',
    linkedin: 'https://www.linkedin.com/in/elias-nieto-dev/'
  },
  saborBinacionalGlossary: [
    {
      id: 'mecato-chucheria',
      title: 'Mecato vs Chuchería',
      colombia: 'Mecato',
      venezuela: 'Chuchería',
      emoji: '🍬📦',
      category: { es: 'Golosinas y Snacks', en: 'Sweets & Snacks' },
      description: {
        es: 'Golosinas, dulces comerciales, snacks o "galguerías" de paquete, usualmente ultraprocesados que se comen entre comidas principales o se compran en cualquier tienda de barrio o kiosko.',
        en: 'Commercial sweets, packaged snacks, or junk food eaten between meals or bought in local corner stores and kiosks.'
      }
    },
    {
      id: 'pasaboca-pasapalo',
      title: 'Pasaboca vs Pasapalo',
      colombia: 'Pasaboca',
      venezuela: 'Pasapalo',
      emoji: '🧀🥟',
      category: { es: 'Aperitivos y Tapas', en: 'Appetizers & Finger Food' },
      description: {
        es: 'Aperitivos o pequeños bocados salados que se sirven en fiestas, reuniones o antes del plato principal ("tapas"). Diseñados expresamente para acompañar los tragos ("pasar el palo" o "pasar el trago"). Los tequeños reinan indiscutiblemente aquí.',
        en: 'Savory finger food and appetizers served at parties or before main courses ("tapas"), designed to pair with drinks. Tequeños reign supreme.'
      }
    },
    {
      id: 'caraotas-frijol-negro',
      title: 'Caraotas vs Frijol Negro',
      colombia: 'Frijol Negro / Zaragoza',
      venezuela: 'Caraotas',
      emoji: '🍲🫘',
      category: { es: 'Granos y Legumbres', en: 'Grains & Legumes' },
      description: {
        es: 'Grano leguminoso oscuro imprescindible en el Pabellón Criollo. Dato: Muchos venezolanos las comen dulces, añadiéndoles un buen puñado de azúcar durante la preparación, ocasionando un cisma gastronómico infinito con quienes las prefieren saladas.',
        en: 'Dark legume grain essential in the Pabellón Criollo. Many Venezuelans cook them sweet by adding sugar, creating a legendary debate with those who prefer them savory.'
      }
    },
    {
      id: 'tinto-guayoyo',
      title: 'El Tinto (Café) vs Guayoyo',
      colombia: 'Tinto (Café)',
      venezuela: 'Guayoyo / Café Negro',
      emoji: '☕',
      category: { es: 'Cafetería Tradicional', en: 'Traditional Coffee' },
      description: {
        es: 'Si estando en Colombia alguien te invita un "tinto" a media mañana, jamás te darán vino. Te ofrecerán un café oscuro, normalmente filtrado y aromático. El equivalente venezolano más cercano (un poco más aguado) se le conoce pintorescamente como "Pintado" o "Guayoyo".',
        en: 'In Colombia, accepting a "tinto" invitation is never wine: it is dark, freshly filtered, aromatic coffee. In Venezuela, the everyday drip coffee is called "Guayoyo".'
      }
    },
    {
      id: 'budare-plancha',
      title: 'Budare vs Plancha / Callana',
      colombia: 'Laja / Plancha / Callana',
      venezuela: 'Budare',
      emoji: '🍳🫓',
      category: { es: 'Utensilios de Cocina', en: 'Kitchen Cookware' },
      description: {
        es: 'Una plancha plana circular, tradicionalmente de hierro fundido o barro, usada casi exclusivamente para asar arepas, cachapas y casabe. Para el venezolano rural y urbano, un buen budare escurridizo "que cure" la arepa sin pegarla es la joya de la corona del hogar.',
        en: 'A circular flat griddle of cast iron or clay, used almost exclusively to roast arepas, cachapas, and casabe bread without sticking.'
      }
    },
    {
      id: 'papelon-panela',
      title: 'Papelón vs Panela',
      colombia: 'Panela',
      venezuela: 'Papelón',
      emoji: '🍋🧊',
      category: { es: 'Endulzantes Naturales', en: 'Natural Sweeteners' },
      description: {
        es: 'Jugo de caña de azúcar solidificado en bloques. Indispensable como bebida hidratante fría mezclada con limón ("Papelón con Limón" / "Aguapanela fría") o servida caliente ("Aguapanela") para ahuyentar el frío y las gripes (común en Bogotá).',
        en: 'Solidified sugarcane juice blocks. Essential as a cold hydrating drink with lime ("Papelón con Limón" / "Aguapanela fría") or hot ("Aguapanela") for cold weather.'
      }
    }
  ],
  quizQuestions: [
    {
      id: 1,
      question: {
        es: '¿Java es lo mismo que Javascript?',
        en: 'Is Java the same as JavaScript?'
      },
      options: [
        { key: 'A', text: 'Sí, JavaScript es la versión web.' },
        { key: 'B', text: 'No, son lenguajes totalmente independientes.' },
        { key: 'C', text: 'Sí, comparten el motor de ejecución.' },
        { key: 'D', text: 'No, Java es una extensión de HTML.' }
      ],
      correctKey: 'B',
      explanation: {
        es: 'Java y JavaScript son lenguajes totalmente independientes en sintaxis, paradigma y motor de ejecución (creados por Sun Microsystems y Netscape respectivamente).',
        en: 'Java and JavaScript are entirely separate languages with different syntax, runtime engines, and creators (Sun Microsystems vs Netscape).'
      }
    },
    {
      id: 2,
      question: {
        es: '¿Qué herramienta es estrictamente imprescindible para EJECUTAR Java?',
        en: 'Which tool is strictly essential to EXECUTE Java bytecode?'
      },
      options: [
        { key: 'A', text: 'El JDK.' },
        { key: 'B', text: 'El IDE.' },
        { key: 'C', text: 'La JVM.' },
        { key: 'D', text: 'El compilador javac.' }
      ],
      correctKey: 'C',
      explanation: {
        es: 'La Máquina Virtual de Java (JVM) es el entorno estrictamente necesario para interpretar y ejecutar el bytecode compilado (.class).',
        en: 'The Java Virtual Machine (JVM) is strictly required to execute compiled Java bytecode.'
      }
    },
    {
      id: 3,
      question: {
        es: '¿En qué sistemas operativos se puede usar o ejecutar Java?',
        en: 'On which operating systems can Java be used or executed?'
      },
      options: [
        { key: 'A', text: 'Solo en Windows.' },
        { key: 'B', text: 'En cualquier sistema con una JVM compatible.' },
        { key: 'C', text: 'Solo en UNIX.' },
        { key: 'D', text: 'Solo en Android.' }
      ],
      correctKey: 'B',
      explanation: {
        es: 'Gracias al principio "Write Once, Run Anywhere", Java funciona en cualquier plataforma que disponga de una JVM compatible.',
        en: 'Following "Write Once, Run Anywhere", Java runs on any OS equipped with a compatible JVM.'
      }
    },
    {
      id: 4,
      question: {
        es: '¿Cuál fue el primer nombre oficial del proyecto Java?',
        en: 'What was the first official name of the Java project?'
      },
      options: [
        { key: 'A', text: 'Oak.' },
        { key: 'B', text: 'Green.' },
        { key: 'C', text: 'C++++.' },
        { key: 'D', text: 'Duke.' }
      ],
      correctKey: 'A',
      explanation: {
        es: 'James Gosling lo llamó originalmente "Oak" en honor a un roble que veía desde su ventana en Sun Microsystems.',
        en: 'James Gosling originally named it "Oak" after an oak tree outside his office at Sun Microsystems.'
      }
    },
    {
      id: 5,
      question: {
        es: '¿Para qué sirve principalmente la clase Scanner en Java?',
        en: 'What is the primary purpose of the Scanner class in Java?'
      },
      options: [
        { key: 'A', text: 'Buscar virus.' },
        { key: 'B', text: 'Leer datos introducidos por teclado.' },
        { key: 'C', text: 'Compilar código.' },
        { key: 'D', text: 'Digitalizar imágenes.' }
      ],
      correctKey: 'B',
      explanation: {
        es: 'java.util.Scanner se usa primordialmente para leer entradas estándar (System.in), facilitando la captura de datos por consola.',
        en: 'java.util.Scanner is primarily used to read console keyboard input via System.in.'
      }
    },
    {
      id: 6,
      question: {
        es: '¿Cuál es la instrucción para crear un objeto a partir de una clase?',
        en: 'Which statement creates an object instance from a class?'
      },
      options: [
        { key: 'A', text: 'class MiObjeto;' },
        { key: 'B', text: 'new MiClase();' },
        { key: 'C', text: 'MiClase.create();' },
        { key: 'D', text: 'instanceof MiClase;' }
      ],
      correctKey: 'B',
      explanation: {
        es: 'El operador "new" reserva memoria en la memoria dinámica (heap) e invoca al constructor de la clase para instanciar el objeto.',
        en: 'The "new" operator allocates heap memory and calls the class constructor to instantiate the object.'
      }
    },
    {
      id: 7,
      question: {
        es: '¿int e Integer representan exactamente lo mismo en Java?',
        en: 'Do int and Integer represent the exact same thing in Java?'
      },
      options: [
        { key: 'A', text: 'Sí, son idénticos.' },
        { key: 'B', text: 'No, int es primitivo e Integer es clase envolvente.' },
        { key: 'C', text: 'Sí, Integer es nomenclatura de Java 11.' },
        { key: 'D', text: 'No, int es para enteros y Integer para decimales.' }
      ],
      correctKey: 'B',
      explanation: {
        es: '"int" es un tipo primitivo de 32 bits, mientras que "Integer" es su clase wrapper de objeto en el paquete java.lang.',
        en: '"int" is a 32-bit primitive data type, whereas "Integer" is its object wrapper class in java.lang.'
      }
    },
    {
      id: 8,
      question: {
        es: 'Si declaramos int[] numeros = new int[5], ¿cuál es el índice del primer elemento?',
        en: 'If we declare int[] numbers = new int[5], what is the index of the first element?'
      },
      options: [
        { key: 'A', text: '1' },
        { key: 'B', text: '-1' },
        { key: 'C', text: '0' },
        { key: 'D', text: '5' }
      ],
      correctKey: 'C',
      explanation: {
        es: 'En Java los arrays tienen indexación base cero (zero-based indexing), por lo que el primer elemento se ubica en el índice 0.',
        en: 'Java arrays are zero-indexed, which means the initial element is at position [0].'
      }
    },
    {
      id: 9,
      question: {
        es: '¿Es lo mismo un array tradicional que un ArrayList?',
        en: 'Is a standard array the same as an ArrayList?'
      },
      options: [
        { key: 'A', text: 'Sí, ambos son dinámicos.' },
        { key: 'B', text: 'No, el array es estático y el ArrayList dinámico.' },
        { key: 'C', text: 'Sí, ArrayList es para JavaFX.' },
        { key: 'D', text: 'No, ArrayList solo guarda números.' }
      ],
      correctKey: 'B',
      explanation: {
        es: 'Los arrays tienen tamaño fijo inmutable una vez creados, mientras que ArrayList redimensiona dinámicamente su capacidad interna.',
        en: 'Standard arrays have a fixed length upon allocation, whereas ArrayList dynamically adjusts its capacity.'
      }
    },
    {
      id: 10,
      question: {
        es: '¿En qué se parecen un bucle while, un for, un foreach y un do-while?',
        en: 'What do while, for, foreach, and do-while loops have in common?'
      },
      options: [
        { key: 'A', text: 'Evalúan al principio.' },
        { key: 'B', text: 'Requieren contador i++.' },
        { key: 'C', text: 'Son estructuras iterativas cíclicas.' },
        { key: 'D', text: 'Se detienen con null.' }
      ],
      correctKey: 'C',
      explanation: {
        es: 'Todos ellos son sentencias de control cíclicas e iterativas que repiten un bloque de código bajo determinadas condiciones.',
        en: 'All of them are iterative loop control structures designed to repeat code execution based on specific conditions.'
      }
    },
    {
      id: 11,
      question: {
        es: '¿Cuál es la palabra clave para instanciar directamente una clase abstracta?',
        en: 'Which keyword directly instantiates an abstract class?'
      },
      options: [
        { key: 'A', text: 'abstract' },
        { key: 'B', text: 'new' },
        { key: 'C', text: 'extends' },
        { key: 'D', text: 'No se pueden instanciar directamente.' }
      ],
      correctKey: 'D',
      explanation: {
        es: 'Las clases abstractas están incompletas por definición; no pueden instanciarse directamente mediante "new", solo extenderse.',
        en: 'Abstract classes cannot be instantiated directly with "new"; they must be subclassed by concrete implementations.'
      }
    },
    {
      id: 12,
      question: {
        es: 'Si int a=5 y int b=5, ¿qué resulta de a + b frente a "a" + "b"?',
        en: 'If int a=5 and int b=5, what is the result of a + b versus "a" + "b"?'
      },
      options: [
        { key: 'A', text: 'Ambos 55.' },
        { key: 'B', text: 'Suma (10) y concatenación (ab).' },
        { key: 'C', text: 'Error de compilación.' },
        { key: 'D', text: 'Ambos 10.' }
      ],
      correctKey: 'B',
      explanation: {
        es: 'El operador "+" suma valores numéricos enteros (5 + 5 = 10) y concatena cadenas de caracteres ("a" + "b" = "ab").',
        en: 'The "+" operator performs numeric addition on numbers (10) and string concatenation on text ("ab").'
      }
    },
    {
      id: 13,
      question: {
        es: '¿Cómo se define correctamente una constante inmutable en Java?',
        en: 'How do you correctly declare an immutable constant in Java?'
      },
      options: [
        { key: 'A', text: 'const' },
        { key: 'B', text: 'public static final' },
        { key: 'C', text: 'immutable' },
        { key: 'D', text: 'MAYUSCULAS' }
      ],
      correctKey: 'B',
      explanation: {
        es: 'La convención y estándar en Java es declarar las constantes como "public static final", garantizando inmutabilidad y acceso a nivel de clase.',
        en: 'The canonical standard in Java is "public static final" for class-level immutable constants.'
      }
    },
    {
      id: 14,
      question: {
        es: 'Respecto a la declaración de variables en Java, ¿cuál es la regla?',
        en: 'Regarding variable declaration in Java, which rule is mandatory?'
      },
      options: [
        { key: 'A', text: 'Tipado dinámico.' },
        { key: 'B', text: 'Tipado estático obligatorio.' },
        { key: 'C', text: 'Solo en el main.' },
        { key: 'D', text: 'Solo envolventes.' }
      ],
      correctKey: 'B',
      explanation: {
        es: 'Java es un lenguaje fuertemente tipado de forma estática: el tipo de cada dato debe definirse y comprobarse en tiempo de compilación.',
        en: 'Java enforces strong static typing: variable types must be declared and checked at compile time.'
      }
    },
    {
      id: 15,
      question: {
        es: '¿Cómo se llama la clase obligatoria para iniciar un proyecto Java?',
        en: 'What is the required class name to launch a Java application?'
      },
      options: [
        { key: 'A', text: 'Main o Principal.' },
        { key: 'B', text: 'Cualquiera con public static void main.' },
        { key: 'C', text: 'System.' },
        { key: 'D', text: 'Application.' }
      ],
      correctKey: 'B',
      explanation: {
        es: 'La clase puede recibir cualquier nombre válido siempre que implemente el método de entrada "public static void main(String[] args)".',
        en: 'Any valid class name works, provided it contains the standard entry point "public static void main(String[] args)".'
      }
    }
  ]
};
