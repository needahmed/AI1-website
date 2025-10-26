import {
  Code,
  Gamepad2,
  Brain,
  Search,
  Palette,
  Zap,
  Database,
  Smartphone,
  Cloud,
  type LucideIcon,
} from "lucide-react";

export interface ProcessStep {
  title: string;
  description: string;
  duration: string;
}

export interface Technology {
  name: string;
  icon: LucideIcon;
  category: string;
}

export interface UseCase {
  title: string;
  description: string;
  benefits: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: LucideIcon;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  overview: {
    title: string;
    description: string;
    highlights: string[];
  };
  process: ProcessStep[];
  technologies: Technology[];
  useCases: UseCase[];
  testimonials: Testimonial[];
  relatedServices: string[]; // slugs of related services
  ctaText: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const servicesData: Record<string, Service> = {
  "web-app-development": {
    slug: "web-app-development",
    title: "Web & App Development",
    shortTitle: "Web & App",
    description:
      "Build scalable, high-performance web and mobile applications with cutting-edge technologies",
    icon: Code,
    heroTitle: "Transform Your Vision Into Reality",
    heroSubtitle:
      "Custom web and mobile applications engineered for scale, performance, and exceptional user experience",
    heroImage: "/images/services/web-app-hero.jpg",
    overview: {
      title: "Comprehensive Development Solutions",
      description:
        "We create robust, scalable applications that drive business growth. From responsive web platforms to native mobile apps, our team delivers solutions that exceed expectations.",
      highlights: [
        "Full-stack development expertise",
        "Modern frameworks and best practices",
        "Responsive and mobile-first design",
        "Performance-optimized architecture",
        "Continuous deployment and monitoring",
      ],
    },
    process: [
      {
        title: "Discovery & Planning",
        description:
          "We analyze your requirements, define project scope, and create a detailed roadmap",
        duration: "1-2 weeks",
      },
      {
        title: "Design & Prototyping",
        description:
          "Create wireframes, mockups, and interactive prototypes for validation",
        duration: "2-3 weeks",
      },
      {
        title: "Development & Testing",
        description:
          "Build your application with agile methodology and continuous testing",
        duration: "6-12 weeks",
      },
      {
        title: "Deployment & Launch",
        description:
          "Deploy to production with monitoring, analytics, and optimization",
        duration: "1 week",
      },
      {
        title: "Support & Maintenance",
        description:
          "Ongoing support, updates, and feature enhancements",
        duration: "Ongoing",
      },
    ],
    technologies: [
      { name: "React", icon: Code, category: "Frontend" },
      { name: "Next.js", icon: Code, category: "Frontend" },
      { name: "TypeScript", icon: Code, category: "Language" },
      { name: "Node.js", icon: Database, category: "Backend" },
      { name: "React Native", icon: Smartphone, category: "Mobile" },
      { name: "PostgreSQL", icon: Database, category: "Database" },
      { name: "MongoDB", icon: Database, category: "Database" },
      { name: "AWS", icon: Cloud, category: "Cloud" },
    ],
    useCases: [
      {
        title: "E-Commerce Platforms",
        description:
          "Build powerful online stores with seamless checkout experiences",
        benefits: [
          "Increased conversion rates",
          "Improved customer retention",
          "Scalable infrastructure",
        ],
      },
      {
        title: "SaaS Applications",
        description:
          "Create subscription-based software with robust user management",
        benefits: [
          "Recurring revenue model",
          "Multi-tenant architecture",
          "Real-time collaboration",
        ],
      },
      {
        title: "Enterprise Solutions",
        description: "Develop custom business applications for operations",
        benefits: [
          "Streamlined workflows",
          "Data-driven decisions",
          "Integration capabilities",
        ],
      },
    ],
    testimonials: [
      {
        quote:
          "The team delivered an exceptional platform that exceeded our expectations. Our conversion rates increased by 40%.",
        author: "Sarah Johnson",
        role: "CTO",
        company: "TechFlow Inc",
      },
      {
        quote:
          "Professional, responsive, and incredibly skilled. They transformed our outdated system into a modern powerhouse.",
        author: "Michael Chen",
        role: "Product Manager",
        company: "Innovation Labs",
      },
    ],
    relatedServices: ["ai-solutions", "game-development", "seo-services"],
    ctaText: "Start Your Web Project",
    seo: {
      title: "Web & App Development Services | Custom Software Solutions",
      description:
        "Expert web and mobile app development services. We build scalable, high-performance applications with React, Next.js, React Native, and modern technologies.",
      keywords: [
        "web development",
        "app development",
        "React development",
        "Next.js",
        "mobile apps",
        "custom software",
        "full-stack development",
      ],
    },
  },
  "game-development": {
    slug: "game-development",
    title: "Game Development",
    shortTitle: "Game Dev",
    description:
      "Create immersive gaming experiences across platforms with stunning visuals and engaging gameplay",
    icon: Gamepad2,
    heroTitle: "Craft Unforgettable Gaming Experiences",
    heroSubtitle:
      "From concept to launch, we build games that captivate players and drive engagement across all platforms",
    heroImage: "/images/services/game-dev-hero.jpg",
    overview: {
      title: "End-to-End Game Development",
      description:
        "We specialize in creating engaging games for mobile, web, and console platforms. Our team combines creative storytelling with technical excellence to deliver memorable gaming experiences.",
      highlights: [
        "Multi-platform game development",
        "2D and 3D game engines",
        "Multiplayer and real-time features",
        "Monetization strategies",
        "Post-launch support and updates",
      ],
    },
    process: [
      {
        title: "Concept & Design",
        description:
          "Define game mechanics, story, characters, and visual style",
        duration: "2-4 weeks",
      },
      {
        title: "Prototyping",
        description: "Build playable prototype to test core mechanics and fun factor",
        duration: "3-4 weeks",
      },
      {
        title: "Production",
        description: "Full development with assets, levels, and features",
        duration: "12-24 weeks",
      },
      {
        title: "Testing & Polish",
        description: "Quality assurance, balancing, and optimization",
        duration: "4-6 weeks",
      },
      {
        title: "Launch & LiveOps",
        description: "Release management and ongoing content updates",
        duration: "Ongoing",
      },
    ],
    technologies: [
      { name: "Unity", icon: Gamepad2, category: "Engine" },
      { name: "Unreal Engine", icon: Gamepad2, category: "Engine" },
      { name: "WebGL", icon: Code, category: "Web" },
      { name: "C#", icon: Code, category: "Language" },
      { name: "C++", icon: Code, category: "Language" },
      { name: "Blender", icon: Palette, category: "3D" },
      { name: "Firebase", icon: Database, category: "Backend" },
      { name: "PlayFab", icon: Cloud, category: "Services" },
    ],
    useCases: [
      {
        title: "Mobile Games",
        description: "Casual and hyper-casual games for iOS and Android",
        benefits: [
          "Wide audience reach",
          "In-app monetization",
          "Viral potential",
        ],
      },
      {
        title: "Web-based Games",
        description: "Browser games with instant playability",
        benefits: [
          "No download required",
          "Cross-platform play",
          "Easy distribution",
        ],
      },
      {
        title: "Serious Games",
        description: "Educational and training simulations",
        benefits: [
          "Enhanced learning outcomes",
          "Interactive training",
          "Measurable results",
        ],
      },
    ],
    testimonials: [
      {
        quote:
          "They brought our game vision to life with incredible attention to detail. Over 500K downloads in the first month!",
        author: "Alex Rivera",
        role: "Founder",
        company: "GameStart Studios",
      },
      {
        quote:
          "The team's expertise in both Unity and multiplayer systems was evident. Our game runs flawlessly.",
        author: "Emma Watson",
        role: "Game Director",
        company: "Pixel Dreams",
      },
    ],
    relatedServices: ["web-app-development", "ai-solutions", "branding-uiux"],
    ctaText: "Start Your Game Project",
    seo: {
      title: "Game Development Services | Mobile, Web & Console Games",
      description:
        "Professional game development services for mobile, web, and console platforms. Unity, Unreal Engine, and custom game solutions with expert developers.",
      keywords: [
        "game development",
        "Unity development",
        "Unreal Engine",
        "mobile games",
        "web games",
        "game design",
        "multiplayer games",
      ],
    },
  },
  "ai-solutions": {
    slug: "ai-solutions",
    title: "AI Solutions & Automations",
    shortTitle: "AI Solutions",
    description:
      "Harness the power of artificial intelligence to automate workflows and gain intelligent insights",
    icon: Brain,
    heroTitle: "Unlock the Power of Artificial Intelligence",
    heroSubtitle:
      "Transform your business with intelligent automation, machine learning, and AI-driven solutions",
    heroImage: "/images/services/ai-hero.jpg",
    overview: {
      title: "Intelligent AI Solutions",
      description:
        "We help businesses leverage AI and machine learning to automate processes, gain insights, and create competitive advantages. Our solutions are practical, scalable, and deliver measurable results.",
      highlights: [
        "Custom AI model development",
        "Process automation and optimization",
        "Natural language processing",
        "Computer vision applications",
        "Predictive analytics and forecasting",
      ],
    },
    process: [
      {
        title: "Assessment & Strategy",
        description:
          "Identify AI opportunities and define success metrics",
        duration: "1-2 weeks",
      },
      {
        title: "Data Preparation",
        description: "Collect, clean, and structure data for training",
        duration: "2-3 weeks",
      },
      {
        title: "Model Development",
        description: "Build, train, and validate AI models",
        duration: "4-8 weeks",
      },
      {
        title: "Integration & Testing",
        description: "Deploy models and integrate with existing systems",
        duration: "2-4 weeks",
      },
      {
        title: "Monitoring & Optimization",
        description: "Track performance and continuously improve",
        duration: "Ongoing",
      },
    ],
    technologies: [
      { name: "TensorFlow", icon: Brain, category: "ML Framework" },
      { name: "PyTorch", icon: Brain, category: "ML Framework" },
      { name: "OpenAI", icon: Brain, category: "AI Platform" },
      { name: "LangChain", icon: Code, category: "AI Tools" },
      { name: "Python", icon: Code, category: "Language" },
      { name: "Scikit-learn", icon: Brain, category: "ML Library" },
      { name: "Hugging Face", icon: Brain, category: "AI Platform" },
      { name: "AWS SageMaker", icon: Cloud, category: "ML Cloud" },
    ],
    useCases: [
      {
        title: "Intelligent Chatbots",
        description: "AI-powered customer service and support automation",
        benefits: [
          "24/7 customer support",
          "Reduced response times",
          "Cost-effective scaling",
        ],
      },
      {
        title: "Document Processing",
        description: "Automated data extraction and document analysis",
        benefits: [
          "Time savings",
          "Improved accuracy",
          "Reduced manual work",
        ],
      },
      {
        title: "Predictive Analytics",
        description: "Forecast trends and optimize decision-making",
        benefits: [
          "Data-driven insights",
          "Risk mitigation",
          "Revenue optimization",
        ],
      },
    ],
    testimonials: [
      {
        quote:
          "Their AI solution reduced our processing time by 80% while improving accuracy. Game-changing for our operations.",
        author: "David Park",
        role: "COO",
        company: "DataFlow Systems",
      },
      {
        quote:
          "The chatbot they built handles 70% of our customer inquiries autonomously. Incredible ROI.",
        author: "Lisa Thompson",
        role: "Customer Success Director",
        company: "ServiceHub",
      },
    ],
    relatedServices: ["web-app-development", "game-development", "seo-services"],
    ctaText: "Explore AI Solutions",
    seo: {
      title: "AI Solutions & Automation Services | Machine Learning Experts",
      description:
        "Custom AI and machine learning solutions. Process automation, chatbots, predictive analytics, and intelligent systems powered by cutting-edge AI technology.",
      keywords: [
        "AI solutions",
        "machine learning",
        "automation",
        "chatbots",
        "NLP",
        "computer vision",
        "predictive analytics",
        "artificial intelligence",
      ],
    },
  },
  "seo-services": {
    slug: "seo-services",
    title: "SEO Services",
    shortTitle: "SEO",
    description:
      "Boost your online visibility and drive organic traffic with data-driven SEO strategies",
    icon: Search,
    heroTitle: "Dominate Search Engine Rankings",
    heroSubtitle:
      "Strategic SEO services that increase visibility, drive qualified traffic, and grow your business",
    heroImage: "/images/services/seo-hero.jpg",
    overview: {
      title: "Comprehensive SEO Strategy",
      description:
        "We implement proven SEO strategies that improve your search rankings, increase organic traffic, and deliver sustainable growth. Our data-driven approach ensures measurable results.",
      highlights: [
        "Technical SEO audits and optimization",
        "Keyword research and strategy",
        "On-page and off-page optimization",
        "Content strategy and creation",
        "Performance tracking and reporting",
      ],
    },
    process: [
      {
        title: "SEO Audit",
        description:
          "Comprehensive analysis of current SEO performance and opportunities",
        duration: "1 week",
      },
      {
        title: "Strategy Development",
        description: "Create tailored SEO roadmap and keyword strategy",
        duration: "1 week",
      },
      {
        title: "Technical Optimization",
        description: "Fix technical issues and improve site structure",
        duration: "2-4 weeks",
      },
      {
        title: "Content Optimization",
        description: "Optimize existing content and create new SEO-focused content",
        duration: "Ongoing",
      },
      {
        title: "Link Building & Monitoring",
        description: "Build quality backlinks and track performance metrics",
        duration: "Ongoing",
      },
    ],
    technologies: [
      { name: "Google Analytics", icon: Search, category: "Analytics" },
      { name: "Search Console", icon: Search, category: "SEO Tools" },
      { name: "Semrush", icon: Search, category: "SEO Tools" },
      { name: "Ahrefs", icon: Search, category: "SEO Tools" },
      { name: "Screaming Frog", icon: Search, category: "Crawler" },
      { name: "Schema Markup", icon: Code, category: "Technical" },
      { name: "Core Web Vitals", icon: Zap, category: "Performance" },
      { name: "GTmetrix", icon: Zap, category: "Performance" },
    ],
    useCases: [
      {
        title: "Local SEO",
        description: "Optimize for local search and Google My Business",
        benefits: [
          "Increased local visibility",
          "More foot traffic",
          "Better local rankings",
        ],
      },
      {
        title: "E-commerce SEO",
        description: "Product page optimization and category structure",
        benefits: [
          "Higher product visibility",
          "More organic sales",
          "Reduced ad spend",
        ],
      },
      {
        title: "Enterprise SEO",
        description: "Large-scale technical SEO and content strategy",
        benefits: [
          "Sustainable growth",
          "Brand authority",
          "Competitive advantage",
        ],
      },
    ],
    testimonials: [
      {
        quote:
          "Within 6 months, our organic traffic tripled and we're ranking #1 for our target keywords. Outstanding results.",
        author: "Robert Martinez",
        role: "Marketing Director",
        company: "GrowthCo",
      },
      {
        quote:
          "Their technical SEO expertise uncovered issues we didn't know existed. Site speed improved by 50%.",
        author: "Jennifer Lee",
        role: "CEO",
        company: "E-Shop Pro",
      },
    ],
    relatedServices: ["web-app-development", "ai-solutions", "branding-uiux"],
    ctaText: "Boost Your Rankings",
    seo: {
      title: "SEO Services | Search Engine Optimization & Digital Marketing",
      description:
        "Professional SEO services that drive results. Technical SEO, keyword strategy, content optimization, and link building to increase organic traffic and rankings.",
      keywords: [
        "SEO services",
        "search engine optimization",
        "digital marketing",
        "keyword research",
        "technical SEO",
        "content optimization",
        "link building",
      ],
    },
  },
  "branding-uiux": {
    slug: "branding-uiux",
    title: "Branding & UI/UX",
    shortTitle: "Branding",
    description:
      "Create memorable brand identities and intuitive user experiences that resonate with your audience",
    icon: Palette,
    heroTitle: "Design That Drives Results",
    heroSubtitle:
      "Strategic branding and user experience design that captivates audiences and builds lasting connections",
    heroImage: "/images/services/branding-hero.jpg",
    overview: {
      title: "Holistic Design Solutions",
      description:
        "We create cohesive brand identities and user experiences that tell your story, engage your audience, and drive business results. From logo design to complete design systems.",
      highlights: [
        "Brand strategy and identity design",
        "User research and persona development",
        "UI/UX design and prototyping",
        "Design systems and guidelines",
        "Ongoing design support",
      ],
    },
    process: [
      {
        title: "Discovery & Research",
        description:
          "Understand your brand, audience, and competitive landscape",
        duration: "1-2 weeks",
      },
      {
        title: "Strategy & Concepting",
        description: "Develop brand positioning and initial design concepts",
        duration: "2-3 weeks",
      },
      {
        title: "Design Development",
        description: "Create comprehensive brand identity and UI designs",
        duration: "4-6 weeks",
      },
      {
        title: "Testing & Refinement",
        description: "User testing and iterative improvements",
        duration: "2-3 weeks",
      },
      {
        title: "Delivery & Guidelines",
        description: "Final assets and comprehensive brand guidelines",
        duration: "1 week",
      },
    ],
    technologies: [
      { name: "Figma", icon: Palette, category: "Design" },
      { name: "Adobe Creative Suite", icon: Palette, category: "Design" },
      { name: "Sketch", icon: Palette, category: "Design" },
      { name: "Framer", icon: Code, category: "Prototyping" },
      { name: "InVision", icon: Palette, category: "Collaboration" },
      { name: "Miro", icon: Palette, category: "Workshops" },
      { name: "UsabilityHub", icon: Search, category: "Testing" },
      { name: "Hotjar", icon: Search, category: "Analytics" },
    ],
    useCases: [
      {
        title: "Brand Identity",
        description: "Complete brand creation from logo to guidelines",
        benefits: [
          "Strong brand recognition",
          "Consistent communication",
          "Professional appearance",
        ],
      },
      {
        title: "Website Redesign",
        description: "Modern UI/UX overhaul for improved conversions",
        benefits: [
          "Better user experience",
          "Higher conversion rates",
          "Mobile optimization",
        ],
      },
      {
        title: "Design Systems",
        description: "Scalable component libraries and guidelines",
        benefits: [
          "Design consistency",
          "Faster development",
          "Better collaboration",
        ],
      },
    ],
    testimonials: [
      {
        quote:
          "They transformed our brand completely. The new identity perfectly captures who we are and resonates with our customers.",
        author: "Amanda Foster",
        role: "Brand Manager",
        company: "Elevate Co",
      },
      {
        quote:
          "The UI/UX redesign increased our conversion rate by 65%. Users love the new interface.",
        author: "Tom Richardson",
        role: "Product Owner",
        company: "ConvertPro",
      },
    ],
    relatedServices: ["web-app-development", "game-development", "seo-services"],
    ctaText: "Transform Your Brand",
    seo: {
      title: "Branding & UI/UX Design Services | Brand Identity & User Experience",
      description:
        "Expert branding and UI/UX design services. Create memorable brand identities, intuitive user experiences, and design systems that drive business results.",
      keywords: [
        "branding",
        "UI design",
        "UX design",
        "brand identity",
        "logo design",
        "user experience",
        "design systems",
        "interface design",
      ],
    },
  },
};

export const getAllServices = (): Service[] => {
  return Object.values(servicesData);
};

export const getServiceBySlug = (slug: string): Service | undefined => {
  return servicesData[slug];
};

export const getRelatedServices = (slug: string): Service[] => {
  const service = servicesData[slug];
  if (!service) return [];
  
  return service.relatedServices
    .map((relatedSlug) => servicesData[relatedSlug])
    .filter(Boolean);
};
