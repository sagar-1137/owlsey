export interface Skill {
  name: string;
  level: number; // 0 to 100
  years: number;
  icon: string; // Lucide icon name
}

export interface SkillCategory {
  category: string;
  items: Skill[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  desc: string;
  details: string[];
}

export interface Project {
  title: string;
  tagline: string;
  desc: string;
  stack: string[];
  year: string;
  link?: string;
  category: "Desktop" | "System" | "Automation" | "Web" | "Mobile";
  featured?: boolean;
}

export interface Service {
  title: string;
  desc: string;
  icon: string; // Lucide icon name
  techs: string[];
}

export interface Stat {
  value: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: "8+", label: "Years Experience" },
  { value: "17+", label: "Projects Completed" },
  { value: "100+", label: "Systems Managed" },
  { value: "50+", label: "Websites Hosted" },
];

export const SERVICES: Service[] = [
  {
    title: "Server Management",
    desc: "Deploy, monitor, secure and optimize enterprise Linux and Windows servers with maximum uptime.",
    icon: "Server",
    techs: ["Ubuntu", "Nginx", "Apache", "Windows Server"],
  },
  {
    title: "Linux Administration",
    desc: "Advanced terminal automation, shell scripting, user privilege levels, cron jobs, and kernel tweaks.",
    icon: "Terminal",
    techs: ["Shell Scripting", "Cron Jobs", "Security Hardening", "PM2"],
  },
  {
    title: "DevOps Solutions",
    desc: "Automate build, test, and deploy pipelines using industry-standard CI/CD tools and containers.",
    icon: "Infinity",
    techs: ["Docker", "GitLab CI/CD", "Jenkins", "Reverse Proxies"],
  },
  {
    title: "Networking",
    desc: "Design and implement secure network topologies, VLAN partitioning, firewall filtering, and VPN gateways.",
    icon: "Network",
    techs: ["Routing", "VLANs", "VPN", "Firewalls"],
  },
  {
    title: "Infrastructure Setup",
    desc: "Self-host production databases, applications, and logs with automated containerized backups.",
    icon: "Database",
    techs: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
  },
  {
    title: "Full Stack Development",
    desc: "Construct highly responsive, modern user interfaces connected to reliable, secure server backends.",
    icon: "Cpu",
    techs: ["Next.js", "React", "Node.js", "TypeScript"],
  },
  {
    title: "Flutter Development",
    desc: "Compile premium cross-platform mobile apps for iOS and Android using Flutter's high-performance canvas.",
    icon: "Smartphone",
    techs: ["Flutter", "Dart", "State Management", "API Integrations"],
  },
];

export const PROJECTS: Project[] = [
  {
    title: "ELauncher",
    tagline: "Comprehensive employee monitoring desktop app",
    desc: "Engineered a secure desktop dashboard that logs employee productivity metrics, registers mouse and keyboard activity, and communicates background events to a central management server.",
    stack: ["Electron", "React", "Node.js", "WebSockets"],
    year: "2024",
    category: "Desktop",
    featured: true,
  },
  {
    title: "Barrier Attendance System",
    tagline: "Biometric attendance automation system",
    desc: "Integrated biological scanners and card readers to compile real-time attendance rosters. Designed a lightweight local gateway that processes credentials instantly and stores logs securely.",
    stack: ["Python", "Flask", "MongoDB", "Biometrics API"],
    year: "2023",
    category: "Automation",
    featured: true,
  },
  {
    title: "Self Hosted GitLab Infrastructure",
    tagline: "Enterprise containerized development workflow",
    desc: "Architected a private GitLab server on dedicated hosting. Configured multiple concurrent runner nodes, automated certificate renewals, and established secure remote access.",
    stack: ["GitLab", "Docker", "GitLab CI/CD", "Nginx Proxy"],
    year: "2023",
    category: "System",
    featured: true,
  },
  {
    title: "CRM Platform",
    tagline: "Robust business customer relationship manager",
    desc: "Constructed a multi-tenant client management portal featuring role-based controls, customized email notification pipelines, database auditing, and automatic sales funnel generation.",
    stack: ["React", "Node.js", "Express", "PostgreSQL"],
    year: "2022",
    category: "Web",
    featured: false,
  },
  {
    title: "Flutter Applications",
    tagline: "Sleek cross-platform mobile utilities",
    desc: "Built various fluid mobile apps featuring offline SQLite synchronization, custom UI themes, interactive dashboard graphs, and push notification triggers.",
    stack: ["Flutter", "Dart", "SQLite", "Firebase"],
    year: "2022",
    category: "Mobile",
    featured: false,
  },
  {
    title: "Owlsey Workspace Portfolio",
    tagline: "Dynamic interactive portfolio & shell layout",
    desc: "The current premium portfolio itself, hosting dynamic gravity simulation fields, a floating canvas rendering system, theme selectors, and keyboard command palette support.",
    stack: ["Next.js", "TailwindCSS", "Framer Motion", "TypeScript"],
    year: "2026",
    category: "Web",
    featured: true,
  },
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Infrastructure",
    items: [
      { name: "Ubuntu / Debian", level: 95, years: 7, icon: "Terminal" },
      { name: "Linux Administration", level: 92, years: 7, icon: "Cpu" },
      { name: "Windows Server", level: 85, years: 5, icon: "Layers" },
      { name: "Nginx / Apache", level: 90, years: 6, icon: "Server" },
      { name: "DNS / Bind9", level: 88, years: 6, icon: "Globe" },
      { name: "PM2 / Process Control", level: 92, years: 5, icon: "Play" },
    ],
  },
  {
    category: "DevOps",
    items: [
      { name: "Docker / Compose", level: 92, years: 5, icon: "Container" },
      { name: "Jenkins", level: 80, years: 4, icon: "Workflow" },
      { name: "GitLab CI/CD", level: 88, years: 4, icon: "GitBranch" },
      { name: "Reverse Proxy", level: 90, years: 6, icon: "Shuffle" },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "MongoDB", level: 82, years: 4, icon: "Database" },
      { name: "PostgreSQL", level: 85, years: 4, icon: "Database" },
      { name: "MySQL / MariaDB", level: 90, years: 6, icon: "Database" },
      { name: "Redis", level: 78, years: 3, icon: "Zap" },
    ],
  },
  {
    category: "Networking",
    items: [
      { name: "Routing & Switching", level: 92, years: 6, icon: "Network" },
      { name: "VLAN / Subnets", level: 90, years: 6, icon: "Split" },
      { name: "VPN (OpenVPN / WireGuard)", level: 88, years: 5, icon: "Shield" },
      { name: "Firewall (ufw / iptables)", level: 85, years: 5, icon: "Flame" },
      { name: "Troubleshooting", level: 95, years: 7, icon: "Activity" },
    ],
  },
  {
    category: "Development",
    items: [
      { name: "React / Next.js", level: 85, years: 4, icon: "Code" },
      { name: "Node.js", level: 88, years: 4, icon: "Terminal" },
      { name: "Flutter / Dart", level: 82, years: 3, icon: "Smartphone" },
      { name: "TypeScript", level: 85, years: 3, icon: "ShieldAlert" },
    ],
  },
];

export const TIMELINE: Experience[] = [
  {
    role: "System Administrator & DevOps Engineer",
    company: "ELaunch Solution Pvt. Ltd.",
    period: "2024 - Present",
    desc: "Overseeing corporate server orchestration, configuring dockerized container workflows, and ensuring secure remote accessibility across local and public cloud routers.",
    details: [
      "Hardened Linux & Windows Server endpoints containing mission-critical customer data.",
      "Configured automatic offsite backup scripts checking file integrity prior to encryption.",
      "Maintained GitLab Runners and custom deployment configurations scaling developer velocity."
    ]
  },
  {
    role: "Senior Network Engineer",
    company: "Vasundhara Infotech",
    period: "2020 - 2024",
    desc: "Supervised corporate network diagnostics, managed physical and virtual routing, administered hosting engines, and debugged dynamic application layers.",
    details: [
      "Configured robust VLAN topologies partitioning admin traffic from public test environments.",
      "Managed web hosting environments (cPanel/WHM, custom Nginx configurations).",
      "Diagnosed hardware, software conflicts, and managed daily security logs."
    ]
  },
  {
    role: "IT Assistant",
    company: "Veerayatan Group of Institutions",
    period: "2020",
    desc: "Resolved daily Helpdesk queries, deployed network camera feeds, maintained IT hardware infrastructure, and hosted live video conference streams.",
    details: [
      "Maintained LAN switches, routers, and IP camera recording grids.",
      "Supported staff members with operating system adjustments and hardware fixes."
    ]
  },
  {
    role: "Computer Technician",
    company: "Dell Services and Computers",
    period: "2019 - 2020",
    desc: "Conducted diagnostics, fixed hardware faults, repaired motherboard rails, and set up office security cameras.",
    details: [
      "Analyzed hardware bottlenecks and upgraded internal RAM/SSD components.",
      "Executed network wire laying and custom terminal crimping."
    ]
  }
];

export const LOGO_CLOUD = [
  "Docker", "GitLab", "Jenkins", "React", "Node.js", "Flutter", "MongoDB", "Redis", "Linux", "Ubuntu", "Nginx"
];
