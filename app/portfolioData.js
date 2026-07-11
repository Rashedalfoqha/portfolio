export const profile = {
  firstName: "Rashed",
  lastName: "Alfuqaha",
  fullName: "Rashed Alfuqaha",
  headline: "Full Stack Engineer",
  navSubtitle: "Full Stack Engineer",
  availability: "Open for Collaboration",
  location: "Amman, Jordan",
  primaryEmail: "rashedmohammadalfoqha@gmail.com",
  phoneDisplay: "+962 7 9964 1651",
  phoneHref: "tel:+962799641651",
  portfolioUrl: "https://rashedmohammadportfoilo.netlify.app/",
  linkedinUrl: "https://www.linkedin.com/in/rashed-alfoqha/",
  githubUrl: "https://github.com/Rashedalfoqha",
  cvHref: "/rashed-alfuqaha-cv.pdf",
  summary:
    "I am a passionate Full Stack Developer with a strong background in building dynamic and scalable web applications. I specialize in JavaScript, React.js, Node.js, and MongoDB while continuing to grow across modern full-stack architecture.",
  heroSummary:
    "Full Stack Engineer building scalable web applications with React, Next.js, Node.js, and production-ready data systems, shaped by CAD precision and Islamic geometric arts."
};

export const roleLoop = [
  "Full Stack Engineer",
  "Full Stack Developer",
  "Front-End Developer",
  "Backend Developer"
];

export const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Stack", href: "#stack" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" }
];

export const socialLinks = [
  { type: "github", label: "GitHub", href: profile.githubUrl },
  { type: "linkedin", label: "LinkedIn", href: profile.linkedinUrl },
  { type: "email", label: "Email", href: `mailto:${profile.primaryEmail}` }
];

export const aboutContent = {
  eyebrow: "My Journey",
  titleParts: ["Art", "Architecture", "Code"],
  narrative: [
    "My professional evolution is anchored in Islamic Geometric Arts. Studying sacred geometry taught me restraint, precision, and the discipline to understand where a line starts and where it must end.",
    "CAD design refined that discipline into technical accuracy. Today, as a Full Stack Engineer, I apply the same architectural rigor to scalable interfaces, APIs, databases, and production systems."
  ]
};

export const stats = [
  { label: "Development Experience", value: "2+" },
  { label: "Projects Shipped", value: "5+" },
  { label: "Bootcamp Hours", value: "400+" },
  { label: "Languages", value: "3" }
];

export const skillSynthesis = [
  { name: "React.js", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "NestJS", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "PostgreSQL", category: "Data" },
  { name: "MongoDB", category: "Data" },
  { name: "Redis", category: "Data" },
  { name: "Docker", category: "Tools" },
  { name: "Vercel", category: "Tools" },
  { name: "AutoCAD", category: "Design" },
  { name: "Islamic Design", category: "Design" }
];

export const experiences = [
  {
    company: "CartBuz",
    role: "Full Stack Engineer",
    period: "Jan 2026 - Present",
    location: "Amman, Jordan",
    badge: "CB",
    achievements: [
      "Develop scalable production-grade systems with Next.js, NestJS, PostgreSQL, Redis, and cloud tooling.",
      "Build frontend and backend features while improving API reliability, maintainability, and database performance.",
      "Collaborate in agile cycles to deliver clean, high-quality software solutions."
    ],
    stack: ["Next.js", "NestJS", "PostgreSQL", "Redis"],
    color: "var(--color-primary)"
  },
  {
    company: "BAT TECH",
    role: "Full Stack Developer",
    period: "Nov 2025 - Dec 2025",
    badge: "BT",
    achievements: [
      "Developed and maintained full-stack applications using React.js, Node.js, and PostgreSQL.",
      "Integrated frontend experiences with backend APIs and optimized backend logic.",
      "Improved application user experience through focused agile delivery."
    ],
    stack: ["React.js", "Node.js", "PostgreSQL", "Agile"],
    color: "var(--color-accent)"
  },
  {
    company: "Freelance | Self-Employed",
    role: "Freelance Full Stack Developer",
    period: "May 2025 - Dec 2025",
    location: "Amman, Jordan",
    badge: "FS",
    achievements: [
      "Delivered custom full-stack applications and modern UI solutions for clients.",
      "Built authentication flows, database-backed features, and full project lifecycles from planning to handoff."
    ],
    stack: ["Full Stack", "UI/UX", "Auth", "Databases"],
    color: "var(--color-gold)"
  },
  {
    company: "Freelance | Self-Employed",
    role: "Freelance CAD Designer",
    period: "Jul 2022 - Jan 2026",
    location: "Amman, Jordan",
    badge: "CD",
    achievements: [
      "Designed intricate mosaic and architectural patterns using CAD software for scalable models.",
      "Collaborated with artisans and production teams to translate design concepts into accurate deliverables.",
      "Ensured aesthetic and technical accuracy across visual and technical outputs."
    ],
    stack: ["AutoCAD", "Mosaic Patterns", "Technical Drawing"],
    color: "var(--color-muted)"
  },
  {
    company: "Super Market Abu Rakan",
    role: "Store Cashier",
    period: "Jun 2019 - Aug 2025",
    location: "Madaba, Jordan",
    badge: "SC",
    achievements: [
      "Managed daily transactions and processed payments accurately.",
      "Delivered customer service by addressing inquiries and resolving issues.",
      "Assisted with inventory management and product organization."
    ],
    stack: ["Customer Service", "Transactions", "Inventory"],
    color: "var(--color-muted)"
  }
];

export const techCategories = [
  { id: "frontend", name: "Frontend", icon: "desktop" },
  { id: "backend", name: "Backend", icon: "server" },
  { id: "data", name: "Databases & Cloud", icon: "database" },
  { id: "tools", name: "Tools & AI", icon: "sparkles" }
];

export const techData = {
  frontend: [
    { name: "React.js", level: 95 },
    { name: "Next.js", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Tailwind CSS", level: 95 },
    { name: "Material UI", level: 85 },
    { name: "Redux", level: 80 }
  ],
  backend: [
    { name: "NestJS", level: 90 },
    { name: "Node.js", level: 90 },
    { name: "Express.js", level: 85 },
    { name: "REST APIs", level: 95 },
    { name: "Socket.IO", level: 80 },
    { name: "JWT Auth", level: 85 }
  ],
  data: [
    { name: "PostgreSQL", level: 85 },
    { name: "MongoDB", level: 90 },
    { name: "Redis", level: 80 },
    { name: "MySQL", level: 75 },
    { name: "Supabase", level: 85 },
    { name: "Firebase", level: 85 }
  ],
  tools: [
    { name: "Git / GitHub", level: 95 },
    { name: "Docker", level: 75 },
    { name: "Vercel", level: 90 },
    { name: "Postman", level: 90 },
    { name: "OpenAI / Claude", level: 90 },
    { name: "Cloudinary", level: 80 }
  ]
};

export const concepts = [
  "Scalable Architecture",
  "Responsive Web Design",
  "Agile Methodologies",
  "Object Oriented Programming",
  "API Management",
  "Code Review",
  "E-Commerce",
  "Content Management"
];

export const projects = [
  {
    name: "EV Solution JO",
    period: "Sep 2024 - Oct 2024",
    url: "https://evsjo.com/home",
    linkType: "live",
    description:
      "Developed a full-stack platform for electric vehicle charging services in Jordan with secure authentication, responsive admin workflows, complete content management, reporting tools, and scalable business logic.",
    stack: ["React.js", "Next.js", "Node.js", "Express.js", "Tailwind CSS", "Auth"],
    badges: ["Live", "Full Stack"],
    id: "PROJ_01"
  },
  {
    name: "Tickln",
    subtitle: "Team Collaboration Tool",
    period: "Oct 2024 - Dec 2024",
    url: "https://github.com/Not2Null/NotNullBoards",
    linkType: "github",
    description:
      "Built a collaborative ticketing platform for creating, sharing, and tracking tickets within teams, with live task tracking and real-time communication through Socket.IO.",
    stack: ["React.js", "Node.js", "MongoDB", "Socket.IO"],
    badges: ["Open Source"],
    id: "PROJ_02"
  },
  {
    name: "NotNull Social Space",
    url: "https://github.com/not6null/NotNull",
    linkType: "github",
    description:
      "Developed a social networking platform with authentication, posts, real-time chat, and a responsive interface for a seamless multi-device experience.",
    stack: ["React.js", "Node.js", "PostgreSQL", "Socket.IO", "Firebase"],
    badges: ["Open Source"],
    id: "PROJ_03"
  },
  {
    name: "Ra Job Search",
    url: "https://github.com/C9-Rashedalfoqha/RA-Job",
    linkType: "github",
    description:
      "Created a job search platform with advanced filtering, skill-based matching logic, and optimized APIs for a smoother job discovery workflow.",
    stack: ["React.js", "Node.js", "MongoDB"],
    badges: ["Open Source"],
    id: "PROJ_04"
  },
  {
    name: "Course Management System",
    period: "May 2024 - Jun 2024",
    url: "https://github.com/Rashedalfoqha/managementCourses",
    linkType: "github",
    description:
      "Developed a course management platform for course creation, enrollment tracking, progress monitoring, and role-based access control.",
    stack: ["React.js", "Node.js", "PostgreSQL", "Express", "Firebase"],
    badges: ["Open Source"],
    id: "PROJ_05"
  }
];

export const education = [
  {
    title: "Immersive Full-Stack Web Development",
    school: "MERAKI Academy JO",
    period: "Oct 2023 - Mar 2024",
    desc:
      "Completed 400+ hours of coding, project development, and problem-solving with JavaScript, React.js, Node.js, MongoDB, and PostgreSQL.",
    icon: "code",
    tone: "primary",
    credential: "400+ Hours"
  },
  {
    title: "Bachelor of Islamic Arts",
    school: "The World Islamic Sciences and Education University",
    period: "Jul 2019 - Jul 2023",
    desc:
      "Focused on Islamic architecture, decorative arts, design principles, and the mathematical precision behind geometric harmony.",
    icon: "graduation",
    tone: "gold",
    credential: "Bachelor Degree"
  }
];

export const languages = [
  { name: "Arabic", proficiency: "Native or bilingual proficiency" },
  { name: "English", proficiency: "Full professional proficiency" },
  { name: "Turkish", proficiency: "Full professional proficiency" }
];

export const softSkills = [
  "Adaptable",
  "Fast Learner",
  "Strong Communication",
  "Problem Solving",
  "Solution-Focused",
  "Hardworking"
];
