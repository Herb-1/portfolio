// This file contains all the personal information for the portfolio

export const personalInfo = {
  name: "Panadora",
  headline: "Web Developer & Designer & AI datalist & DEV ( Bốc Phét thoi )",
  shortBio: "Chả có cái vẹo gì cả , tại không có cái gì để viết cả.",
  role: "Full Stack Developer",
  description:
    "A passionate Full Stack Developer based in Vietnam. I am always eager to learn new technologies and create innovative solutions.",
  location: "Ở NHÀ TAOOO",
  email: "Shabbydream01@gmail.com",
  availability: "Open for opportunities",
  phone: "0559099491",
  zalo: "0559099491",
  profileImageUrl: "/images/your-avatar.jpg",
  aboutMe: [
    "I'm a passionate Full Stack Developer with expertise in building modern web applications. I love creating intuitive user interfaces and robust backend systems.",
    "With experience in both frontend and backend development, I enjoy solving complex problems and turning ideas into reality through code.",
    "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee while reading tech blogs.",
    "Những cái trên tao bốc phét đó."
  ],
  socialLinks: [
    {
      platform: "Facebook",
      url: "https://www.facebook.com/QUts.Deraz"
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/quts.deraz"
    },
    {
      platform: "GitHub",
      url: "https://github.com/Herb-1"
    }
  ],
  stats: [
    { label: "Years Coding", value: "2+" },
    { label: "Projects", value: "10+" },
    { label: "Technologies", value: "9+" },
    { label: "Cups of Coffee", value: "∞" }
  ]
};

export interface Skill {
  name: string;
  icon: string;
  level: number; // 0-100
  category: "frontend" | "backend" | "other";
}

export const skills: Skill[] = [
  {
    name: "HTML5 & CSS3",
    icon: "🌐",
    level: 85,
    category: "frontend",
  },
  {
    name: "JavaScript",
    icon: "⚡",
    level: 80,
    category: "frontend",
  },
  {
    name: "React",
    icon: "⚛️",
    level: 75,
    category: "frontend",
  },
  {
    name: "Python",
    icon: "🐍",
    level: 70,
    category: "backend",
  },
  {
    name: "Node.js",
    icon: "🟢",
    level: 65,
    category: "backend",
  },
  {
    name: "Java",
    icon: "☕",
    level: 60,
    category: "backend",
  },
  {
    name: "SQL",
    icon: "🗄️",
    level: 65,
    category: "backend",
  },
  {
    name: "Responsive Design",
    icon: "📱",
    level: 80,
    category: "frontend",
  },
  {
    name: "Bốc Phét",
    icon: "😐",
    level: 100,
    category: "other",
  },
];

export const skillCategories = [
  { key: "all", label: "All" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "other", label: "Other" },
] as const;

export const projects = [
  {
    title: "E-commerce Website",
    description:
      "A fully functional e-commerce website with product catalog, shopping cart, and payment integration.",
    technologies: ["React", "Node.js", "MongoDB"],
    imageUrl: "/images/project-ecommerce.png",
    projectUrl: "#",
  },
  {
    title: "Finance Dashboard",
    description:
      "An interactive dashboard for tracking expenses, income, and investment performance.",
    technologies: ["Vue.js", "Firebase", "D3.js"],
    imageUrl: "/images/project-finance.png",
    projectUrl: "#",
  },
  {
    title: "Weather App",
    description:
      "A weather application that provides real-time forecasts for any location worldwide.",
    technologies: ["JavaScript", "Weather API", "CSS3"],
    imageUrl: "/images/project-weather.png",
    projectUrl: "#",
  },
  {
    title: "Task Management App",
    description:
      "A productivity application for managing tasks, deadlines, and team collaboration.",
    technologies: ["React", "TypeScript", "Firebase"],
    imageUrl: "/images/project-taskmanager.png",
    projectUrl: "#",
  },
  {
    title: "Social Media Dashboard",
    description:
      "A comprehensive dashboard for managing multiple social media accounts and analyzing engagement metrics.",
    technologies: ["Next.js", "Tailwind CSS", "REST API"],
    imageUrl: "/images/project-social.png",
    projectUrl: "#",
  },
  {
    title: "AI Image Generator",
    description:
      "An application that generates unique images using artificial intelligence based on text prompts.",
    technologies: ["Python", "TensorFlow", "React"],
    imageUrl: "/images/project-ai.png",
    projectUrl: "#",
  },
];
