/**
 * Centralized Portfolio Data Configuration for Shreya Jayi
 * Keeps all content structured, maintainable, and easily editable.
 * All information strictly derived from prompt and verified uploaded resume.
 */

const portfolioData = {
  personal: {
    name: "Shreya Jayi",
    shortName: "Shreya",
    title: "Computer Science Engineering Student | AI/ML Enthusiast | Python Developer",
    smallHeroText: "HELLO, I'M SHREYA",
    heroDescription: "A passionate CSE student interested in AI/ML, programming, data analysis, and developing practical technology projects.",
    aboutDescription1: "A passionate Computer Science Engineering student interested in AI/ML, programming, data analysis, and developing practical technology projects.",
    aboutDescription2: "I enjoy learning through practical projects and continuously improving my technical skills, actively applying problem-solving and algorithmic thinking to real-world challenges.",
    highlights: [
      { id: "year", text: "2nd Year CSE", subtext: "East Point College", icon: "🎓" },
      { id: "cgpa", text: "8.63 CGPA", subtext: "Academic Performance", icon: "⭐" },
      { id: "grad", text: "Graduating 2029", subtext: "Expected Completion", icon: "🗓️" }
    ],
    email: "shreyajayi33@gmail.com",
    phone: "+91 9686284845",
    location: "Bengaluru, Karnataka, India"
  },

  socialLinks: {
    github: "https://github.com/shreyajayi33-dot",
    linkedin: "https://www.linkedin.com/in/shreya-jayi-89707838a",
    resume: "resume.pdf" // Unified resume asset (copied from uploaded PDF)
  },

  aboutCards: [
    {
      id: "aiml",
      title: "AI/ML",
      icon: "🧠",
      description: "Exploring artificial intelligence and machine learning fundamentals."
    },
    {
      id: "programming",
      title: "Programming",
      icon: "💻",
      description: "Building programming skills using Python, C and Java."
    },
    {
      id: "data-analysis",
      title: "Data Analysis",
      icon: "📊",
      description: "Interested in working with data and extracting useful insights."
    },
    {
      id: "problem-solving",
      title: "Problem Solving",
      icon: "🧩",
      description: "Developing knowledge of Data Structures and Algorithms."
    }
  ],

  education: {
    degree: "Bachelor of Engineering (B.E.)",
    major: "Computer Science Engineering",
    college: "East Point College of Engineering and Technology",
    currentYear: "2nd Year",
    cgpa: "8.63",
    graduation: "2029",
    statusBadge: "Active Degree • 2nd Year",
    details: [
      "Rigorous foundations in Data Structures, Algorithms, Object-Oriented Programming, and Database Systems.",
      "Maintained an 8.63 CGPA with strong analytical and problem-solving focus.",
      "Pursuing practical software engineering implementations and AI/ML research alongside academic coursework."
    ]
  },

  skills: [
    {
      category: "Programming",
      icon: "💻",
      description: "Core programming languages for algorithmic logic and software development.",
      items: ["Python", "C", "Java"]
    },
    {
      category: "Web Development",
      icon: "🌐",
      description: "Building clean, accessible, and responsive user interfaces.",
      items: ["HTML", "CSS", "JavaScript"]
    },
    {
      category: "Database",
      icon: "🗄️",
      description: "Managing and querying structured relational databases.",
      items: ["SQL"]
    },
    {
      category: "AI / ML",
      icon: "🧠",
      description: "Core intelligent algorithms, neural models, and autonomous workflows.",
      items: ["Artificial Intelligence", "Machine Learning", "Neural Networks", "Agentic AI"]
    },
    {
      category: "Tools",
      icon: "🛠️",
      description: "Industry-standard version control and collaboration platforms.",
      items: ["Git", "GitHub"]
    },
    {
      category: "Computer Science",
      icon: "⚡",
      description: "Core theoretical pillars and software engineering methodologies.",
      items: ["Data Structures and Algorithms", "Problem Solving", "Logical Thinking", "Software Development"]
    }
  ],

  internship: {
    role: "AI/ML & Neural Networks Intern",
    organization: "Elien",
    period: "2026 – Present",
    icon: "🧠",
    points: [
      "Hands-on exposure to Artificial Intelligence, Machine Learning and Neural Network concepts",
      "Practical technical work",
      "Applying programming, analytical thinking and problem-solving skills to AI-focused tasks",
      "Understanding AI/ML workflows and neural-network concepts",
      "Exploring practical applications of AI/ML",
      "Strengthening software development skills through structured implementations"
    ]
  },

  projects: [
    {
      id: "languagetutor",
      name: "LanguageTutor",
      category: "AI-Powered Language Learning Application",
      icon: "🗣️",
      image: "assets/images/project-weather.jpg", // high-tech preview
      description: "An AI-powered language-learning application designed to support language learning through an interactive experience.",
      tags: ["AI-Powered", "Python", "Interactive UX", "Natural Language"],
      githubUrl: "https://github.com/shreyajayi33-dot/LanguageTutor",
      demoUrl: null, // "[Live Demo URL]" placeholder
      hasRealGithub: true,
      hasRealDemo: false,
      demoPlaceholderText: "[Live Demo URL]"
    },
    {
      id: "aura",
      name: "AURA",
      category: "Agentic AI Phone Manager",
      icon: "🤖",
      image: "assets/images/project-aura.jpg",
      description: "Agentic AI concept designed to assist users with phone-related tasks through intelligent automation. Focuses on user-intent interpretation, decision-making, task coordination, automated actions, and practical applications of autonomous AI agents.",
      tags: ["Agentic AI", "User Intent", "Task Coordination", "Automation"],
      githubUrl: null,
      demoUrl: null, // "[Live Demo URL]" placeholder
      hasRealGithub: false,
      hasRealDemo: false,
      demoPlaceholderText: "[Live Demo URL]",
      interactiveSimulation: true
    },
    {
      id: "women-safety",
      name: "Women Safety Device Using GPS Tracking",
      category: "Safety Technology Project",
      icon: "🛡️",
      image: "assets/images/project-gps.jpg",
      description: "A safety-oriented solution using GPS tracking to provide location awareness and support emergency assistance. Designed around real-time location tracking to enable faster access to location information during emergency situations. Applied programming and problem-solving concepts to address a practical personal-safety use case.",
      tags: ["GPS Tracking", "Personal Safety", "Real-Time Telemetry", "Problem Solving"],
      githubUrl: null,
      demoUrl: null,
      hasRealGithub: false,
      hasRealDemo: false,
      demoPlaceholderText: "[Project Details]",
      hasDetailsModal: true
    },
    {
      id: "weather-app",
      name: "Weather App",
      category: "Web Application",
      icon: "⛅",
      image: "assets/images/project-weather.jpg",
      description: "Developed a web-based weather application with a simple and user-friendly interface for displaying weather information. Applied HTML and programming fundamentals to structure the application and provide an accessible user experience. Focused on clear presentation of weather information and straightforward application usability.",
      tags: ["HTML", "JavaScript", "Responsive UX", "Weather Data"],
      githubUrl: null,
      demoUrl: null,
      hasRealGithub: false,
      hasRealDemo: false,
      demoPlaceholderText: "[Project Details]",
      hasDetailsModal: true
    }
  ],

  certifications: [
    {
      id: "cert-1",
      name: "National Space Day Quiz 2026",
      issuer: "MyGov / ISRO",
      icon: "🚀",
      url: null,
      placeholderUrl: "[Certificate URL]",
      badge: "National Recognition"
    },
    {
      id: "cert-2",
      name: "Python for Data Analysis",
      issuer: "Simplilearn",
      icon: "📊",
      url: "assets/pythonfordataanalysis.pdf", // Actual verified certificate file!
      placeholderUrl: null,
      badge: "Verified PDF Available"
    },
    {
      id: "cert-3",
      name: "AWS Cloud Practitioner Essentials",
      issuer: "AWS",
      icon: "☁️",
      url: null,
      placeholderUrl: "[Certificate URL]",
      badge: "Cloud Computing"
    },
    {
      id: "cert-4",
      name: "Data Structures and Algorithms",
      issuer: "Infosys",
      icon: "🧩",
      url: null,
      placeholderUrl: "[Certificate URL]",
      badge: "Algorithms"
    },
    {
      id: "cert-5",
      name: "Basics of Data Structures and Algorithms",
      issuer: "Simplilearn",
      icon: "⚡",
      url: null,
      placeholderUrl: "[Certificate URL]",
      badge: "Foundations"
    },
    {
      id: "cert-6",
      name: "Basic Electronics Course for Beginners",
      issuer: "Cursa",
      icon: "🔌",
      url: null,
      placeholderUrl: "[Certificate URL]",
      badge: "Electronics / ECE"
    },
    {
      id: "cert-7",
      name: "C Programming Basics",
      issuer: "Simplilearn and Infosys",
      icon: "💻",
      url: null,
      placeholderUrl: "[Certificate URL]",
      badge: "C Fundamentals"
    },
    {
      id: "cert-8",
      name: "Programming Fundamentals Using Python",
      issuer: "Infosys",
      icon: "🐍",
      url: null,
      placeholderUrl: "[Certificate URL]",
      badge: "Python Core"
    },
    {
      id: "cert-9",
      name: "MATLAB Onramp",
      issuer: "MathWorks",
      icon: "📐",
      url: null,
      placeholderUrl: "[Certificate URL]",
      badge: "Computational Modeling"
    },
    {
      id: "cert-10",
      name: "Basics of Python",
      issuer: "Infosys",
      icon: "🐍",
      url: null,
      placeholderUrl: "[Certificate URL]",
      badge: "Python Essentials"
    },
    {
      id: "cert-11",
      name: "QuizOff 2026: India's Biggest AI Quiz",
      issuer: "CampusCrew, Unstop",
      icon: "🏆",
      url: null,
      placeholderUrl: "[Certificate URL]",
      badge: "525,000+ Students",
      highlight: "Participated in national-level Artificial Intelligence competition with 5,25,000+ students, demonstrating interest in AI and emerging technologies."
    }
  ]
};

// Export to window for global access
if (typeof window !== 'undefined') {
  window.portfolioData = portfolioData;
}
