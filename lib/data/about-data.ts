// About Page Data Configuration
// This file contains all the content for the about page
// Update this file to easily manage content without touching the UI

export interface CompanyValue {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  expertise: string;
  bio: string;
  image: string;
  linkedIn?: string;
  twitter?: string;
}

export interface Leader {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  linkedIn?: string;
  twitter?: string;
  quote: string;
}

export interface AnimatedStat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

// Company Story
export const companyStory = {
  headline: "Building the Future of AI-Powered Solutions",
  subheadline: "Where Innovation Meets Excellence",
  story: [
    "At AI1, we're not just building products—we're crafting the future of intelligent business solutions. Founded on the principle that AI should empower, not replace, human creativity and innovation.",
    "Our journey began with a simple vision: to create an all-in-one platform that combines cutting-edge AI technology with exceptional design and seamless user experience. Today, we serve businesses worldwide, helping them transform their digital presence and operational efficiency.",
    "We believe in the power of AI-first thinking combined with human-centered design. Every solution we create is built to scale, adapt, and grow with your business.",
  ],
};

// Mission & Vision
export const mission = {
  mission:
    "To empower businesses worldwide with AI-first solutions that drive growth, efficiency, and innovation.",
  vision:
    "A world where every business, regardless of size, has access to enterprise-grade AI technology that's simple, powerful, and affordable.",
};

// Company Values
export const companyValues: CompanyValue[] = [
  {
    id: "innovation",
    icon: "Sparkles",
    title: "Innovation First",
    description:
      "We push boundaries and embrace cutting-edge technology to deliver solutions that set new industry standards.",
  },
  {
    id: "quality",
    icon: "Award",
    title: "Uncompromising Quality",
    description:
      "Excellence is not an option—it's our baseline. Every project receives meticulous attention to detail.",
  },
  {
    id: "speed",
    icon: "Zap",
    title: "Lightning Fast",
    description:
      "Time is your most valuable asset. We deliver exceptional results at unprecedented speed without sacrificing quality.",
  },
  {
    id: "transparency",
    icon: "Eye",
    title: "Radical Transparency",
    description:
      "No surprises, no hidden costs. We believe in clear communication and honest partnerships.",
  },
  {
    id: "global",
    icon: "Globe",
    title: "Global Reach",
    description:
      "With teams across continents and 24/7 support, we're always there when you need us.",
  },
  {
    id: "collaboration",
    icon: "Users",
    title: "True Partnership",
    description:
      "Your success is our success. We work as an extension of your team, not just a vendor.",
  },
];

// Timeline Milestones
export const timeline: Milestone[] = [
  {
    id: "founding",
    year: "2021",
    title: "The Beginning",
    description:
      "AI1 was founded with a vision to democratize AI technology for businesses of all sizes.",
  },
  {
    id: "first-product",
    year: "2022",
    title: "First Product Launch",
    description:
      "Launched our flagship AI-powered design platform, serving 100+ clients in the first quarter.",
  },
  {
    id: "expansion",
    year: "2023",
    title: "Global Expansion",
    description:
      "Expanded operations to 3 continents with dedicated teams in North America, Europe, and Asia.",
  },
  {
    id: "recognition",
    year: "2023",
    title: "Industry Recognition",
    description:
      "Named 'Top AI Startup' by TechCrunch and featured in Forbes 30 Under 30.",
  },
  {
    id: "all-in-one",
    year: "2024",
    title: "All-in-One Platform",
    description:
      "Released our comprehensive all-in-one platform, integrating AI, design, and development tools.",
  },
  {
    id: "present",
    year: "2025",
    title: "Today",
    description:
      "Serving 1000+ businesses worldwide with 50+ team members and growing rapidly.",
  },
];

// Leadership (CEO)
export const ceoProfile: Leader = {
  id: "ceo",
  name: "Alex Rivera",
  title: "Founder & CEO",
  bio: "With over 15 years of experience in AI and software engineering, Alex founded AI1 to bridge the gap between cutting-edge technology and practical business solutions. Previously led AI initiatives at major tech companies and holds a PhD in Machine Learning from MIT.",
  image: "/images/team/ceo-placeholder.jpg",
  linkedIn: "https://linkedin.com/in/alexrivera",
  twitter: "https://twitter.com/alexrivera",
  quote:
    "AI should amplify human potential, not replace it. At AI1, we're building tools that empower people to do their best work.",
};

// Team Members by Expertise
export const teamMembers: TeamMember[] = [
  // Engineering Team
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    role: "VP of Engineering",
    expertise: "Engineering",
    bio: "Former tech lead at Google, specializing in scalable AI systems and cloud architecture.",
    image: "/images/team/member-placeholder-1.jpg",
    linkedIn: "https://linkedin.com/in/sarahchen",
  },
  {
    id: "michael-okonkwo",
    name: "Michael Okonkwo",
    role: "Senior AI Engineer",
    expertise: "Engineering",
    bio: "PhD in Neural Networks, expert in machine learning model optimization and deployment.",
    image: "/images/team/member-placeholder-2.jpg",
    linkedIn: "https://linkedin.com/in/michaelokonkwo",
  },
  {
    id: "lisa-park",
    name: "Lisa Park",
    role: "Full Stack Developer",
    expertise: "Engineering",
    bio: "Specialized in React, Next.js, and building high-performance web applications.",
    image: "/images/team/member-placeholder-3.jpg",
  },

  // Design Team
  {
    id: "jordan-blake",
    name: "Jordan Blake",
    role: "Head of Design",
    expertise: "Design",
    bio: "Award-winning designer with 10+ years crafting beautiful, user-centric experiences.",
    image: "/images/team/member-placeholder-4.jpg",
    linkedIn: "https://linkedin.com/in/jordanblake",
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    role: "UX Researcher",
    expertise: "Design",
    bio: "Human-computer interaction expert focused on accessibility and inclusive design.",
    image: "/images/team/member-placeholder-5.jpg",
  },
  {
    id: "carlos-mendes",
    name: "Carlos Mendes",
    role: "UI Designer",
    expertise: "Design",
    bio: "Passionate about motion design and creating delightful micro-interactions.",
    image: "/images/team/member-placeholder-6.jpg",
  },

  // Product Team
  {
    id: "emma-johnson",
    name: "Emma Johnson",
    role: "Product Manager",
    expertise: "Product",
    bio: "Data-driven product leader with experience scaling products from 0 to millions of users.",
    image: "/images/team/member-placeholder-7.jpg",
    linkedIn: "https://linkedin.com/in/emmajohnson",
  },
  {
    id: "raj-patel",
    name: "Raj Patel",
    role: "Product Designer",
    expertise: "Product",
    bio: "Bridge between design and engineering, focused on shipping great products fast.",
    image: "/images/team/member-placeholder-8.jpg",
  },

  // Business Team
  {
    id: "nicole-anderson",
    name: "Nicole Anderson",
    role: "Head of Growth",
    expertise: "Business",
    bio: "Growth hacker and marketing strategist who's scaled multiple startups to success.",
    image: "/images/team/member-placeholder-9.jpg",
    linkedIn: "https://linkedin.com/in/nicoleanderson",
  },
  {
    id: "david-kim",
    name: "David Kim",
    role: "Customer Success Lead",
    expertise: "Business",
    bio: "Dedicated to ensuring every client achieves their goals and maximizes ROI.",
    image: "/images/team/member-placeholder-10.jpg",
  },
];

// Animated Stats
export const animatedStats: AnimatedStat[] = [
  {
    id: "clients",
    value: 1000,
    suffix: "+",
    label: "Happy Clients",
    description: "Businesses transformed worldwide",
  },
  {
    id: "projects",
    value: 2500,
    suffix: "+",
    label: "Projects Delivered",
    description: "On time and under budget",
  },
  {
    id: "countries",
    value: 45,
    suffix: "+",
    label: "Countries",
    description: "Global reach and support",
  },
  {
    id: "turnaround",
    value: 48,
    suffix: "h",
    label: "Average Turnaround",
    description: "Lightning-fast delivery",
  },
  {
    id: "satisfaction",
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Rated 5-stars consistently",
  },
];

// Differentiators
export const differentiators = [
  {
    id: "ai-first",
    title: "AI-First Approach",
    description:
      "Every solution is built with AI at its core, leveraging machine learning to deliver smarter, faster, and more efficient results.",
    icon: "Brain",
  },
  {
    id: "all-in-one",
    title: "All-in-One Platform",
    description:
      "No more juggling multiple tools. Our comprehensive platform handles everything from design to deployment.",
    icon: "Package",
  },
  {
    id: "fast-turnaround",
    title: "Lightning Fast Delivery",
    description:
      "Average 48-hour turnaround on projects. We move at the speed of your business.",
    icon: "Zap",
  },
  {
    id: "global-reach",
    title: "24/7 Global Support",
    description:
      "Teams across three continents ensure you always have support when you need it, no matter the timezone.",
    icon: "Globe",
  },
];

// CTA Section
export const ctaSection = {
  headline: "Ready to Transform Your Business?",
  description:
    "Join 1000+ companies that trust AI1 to power their digital presence. Let's build something amazing together.",
  primaryCTA: {
    label: "Get Started",
    href: "/services",
  },
  secondaryCTA: {
    label: "View Portfolio",
    href: "/services/portfolio",
  },
};

// Export grouped by expertise for easier filtering
export const teamByExpertise = {
  Engineering: teamMembers.filter((m) => m.expertise === "Engineering"),
  Design: teamMembers.filter((m) => m.expertise === "Design"),
  Product: teamMembers.filter((m) => m.expertise === "Product"),
  Business: teamMembers.filter((m) => m.expertise === "Business"),
};

export const expertiseCategories = [
  "All",
  "Engineering",
  "Design",
  "Product",
  "Business",
] as const;

export type ExpertiseCategory = (typeof expertiseCategories)[number];
