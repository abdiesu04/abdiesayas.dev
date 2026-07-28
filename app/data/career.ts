/** A figure lifted out of the description it already appears in. The prose
 *  keeps its full sentence — the rail is a summary of it, never a
 *  replacement, so the page still reads correctly with no CSS. */
export type Metric = { figure: string; caption: string };

export type Role = {
  number: string;
  period: string;
  location: string;
  title: string;
  company: string;
  note?: string;
  description: string;
  metrics?: Metric[];
  tech: string[];
};

export const roles: Role[] = [
  {
    number: "01",
    period: "06/2025 — Present",
    location: "Remote",
    title: "Freelance Software Engineer",
    company: "Upwork",
    note: "Top Rated Plus (Top 3%)",
    description:
      "Delivered 23 production-grade solutions for startups and small businesses across backend, frontend, and automation — the same work that anchors the systems above.",
    tech: [
      "Python",
      "FastAPI",
      "Django",
      "Node",
      "React / Next.js",
      "PostgreSQL",
      "Docker",
      "AWS",
      "n8n",
      "Make.com",
    ],
  },
  {
    number: "02",
    period: "08/2024 — 09/2025",
    location: "United States",
    title: "Backend Developer & Automation Engineer",
    company: "Mālama Funding",
    description:
      "Built a lending platform with AI-powered document verification for KYC, automated workflows, and secure user management — backend services and orchestration on containerized deployments.",
    tech: ["FastAPI", "LangChain", "LangGraph", "n8n", "Docker"],
  },
  {
    number: "03",
    period: "02/2024 — 08/2025",
    location: "United Kingdom",
    title: "Software Engineer (Remote)",
    company: "AuraSpot",
    description:
      "Optimized queries for a 50k+ user platform, cutting average execution time by 32% and AWS deploy time by 26% via CI/CD caching and parallel builds, while building responsive React interfaces.",
    metrics: [
      { figure: "50k+", caption: "Users on platform" },
      { figure: "−32%", caption: "Query time" },
      { figure: "−26%", caption: "AWS deploy time" },
    ],
    tech: ["Django", "PostgreSQL", "AWS", "Docker", "CI/CD", "React", "Redis", "Celery"],
  },
  {
    number: "04",
    period: "06/2024 — 09/2024",
    location: "Ethiopia",
    title: "Backend Developer",
    company: "Eskalate",
    description:
      "Engineered a Go REST API on Clean Architecture, reducing average response time by 15% (120ms → 102ms) through goroutine concurrency and PostgreSQL indexing, pooling, and query tuning.",
    metrics: [{ figure: "−15%", caption: "Response time · 120ms → 102ms" }],
    tech: ["Golang", "PostgreSQL", "Docker", "CI/CD", "Testify", "JWT"],
  },
];

export type Education = {
  period: string;
  location: string;
  institution: string;
  qualification: string;
  /** Third-party backing, set apart from the qualification because it is
   *  checkable by someone who has never heard of the institution. */
  backing?: string;
  description: string;
  metrics?: Metric[];
};

export const education: Education[] = [
  {
    period: "02/2018 — 06/2022",
    location: "Adama, Ethiopia",
    institution: "Adama Science & Technology University (ASTU)",
    qualification: "BSc, Software Engineering",
    description:
      "Coursework in Algorithms, Advanced Distributed Systems, Database Design, and Cloud Computing.",
  },
  {
    period: "01/2024 — 2025",
    location: "Remote",
    institution: "A2SV — Africa to Silicon Valley",
    qualification: "Competitive Programming & Coding Academy",
    backing: "Backed by Google",
    description:
      "Solved 1000+ competitive programming problems on LeetCode and Codeforces, with hands-on real-world project development and interview preparation.",
    metrics: [{ figure: "1000+", caption: "Problems solved" }],
  },
];

export const honors = [
  "A2SV Hackathon Semi-Finalist",
  "ALX Software Engineering Certificate",
  "Evangadi MERN Stack Development Bootcamp",
  "Top 0.00001% result — Grade 12 national exam",
  "CSEC ASTU — Head of Competitive Programming: led 15+ weekly coding sessions and organized 3 inter-university hackathons",
];
