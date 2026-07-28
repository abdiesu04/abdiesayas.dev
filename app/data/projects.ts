export type Project = {
  number: string;
  category: string;
  name: string;
  description: string;
  tech: string[];
  href?: string;
  status?: string;
  /** Tall capture of the live site. `aspect` is height ÷ width of the source
   *  image, which sets how far it can pan inside the browser frame. */
  shot?: { src: string; aspect: number };
};

export const projects: Project[] = [
  {
    number: "01",
    category: "Lending · KYC",
    name: "Mālama Funding",
    description:
      "AI document verification and automated underwriting for a US private-money lender in 44 states. Two extraction passes must agree; doubt routes to a human review queue, never into a loan decision.",
    tech: ["FastAPI", "LangChain", "LangGraph", "n8n", "Docker"],
    href: "https://malamafunding.com",
    shot: { src: "/projects/malama-full.jpg", aspect: 1.25 },
  },
  {
    number: "02",
    category: "Real-time Voice",
    name: "Investor Callback",
    description:
      "AI voice agents that call and qualify real-estate leads 24/7. Streaming STT → LLM → TTS overlapped for sub-second turns, with barge-in, voicemail detection, and human handoff.",
    tech: ["FastAPI", "Twilio", "Streaming STT/TTS", "Redis"],
    href: "https://investorcallback.com",
    shot: { src: "/projects/investorcallback-full.jpg", aspect: 1.8056 },
  },
  {
    number: "03",
    category: "Property · AVM",
    name: "Moov Homes",
    description:
      "Valuation engine for a UK home-buying service: comparables over recent sales and EPC data, an offer range with a confidence score — and low confidence routes to a human surveyor within one working day.",
    tech: ["Python", "PostgreSQL", "Comparables Pipeline"],
    href: "https://moovhomes.co.uk",
    shot: { src: "/projects/moovhomes-full.jpg", aspect: 1.8056 },
  },
  {
    number: "04",
    category: "AI Video · SaaS",
    name: "SmartAIVideo",
    description:
      "AI video platform that takes a concept to a finished cut — script generation, studio-quality voiceover in 40+ languages, multi-layer compositing, and scheduled publishing.",
    tech: ["Next.js", "LLM Pipeline", "TTS", "Vercel"],
    href: "https://ai-video-eight.vercel.app/",
    shot: { src: "/projects/smartaivideo-full.jpg", aspect: 1.7125 },
  },
  {
    number: "05",
    category: "Education · LLM",
    name: "SkillBridge Academy",
    description:
      "AI-powered preparation for Rwandan national exams — multilingual practice, marking, and step-by-step explanations instead of answer keys.",
    tech: ["Next.js", "Python", "LLM Pipeline"],
    href: "https://skillbridge.academy/en",
    shot: { src: "/projects/skillbridge-full.jpg", aspect: 3.1944 },
  },
  {
    number: "06",
    category: "Brand OS · SaaS",
    name: "BrandVision",
    description:
      "AI-powered brand operating system. Backend and AI orchestration behind the product — brand memory that persists across sessions, predictive market insight, and campaign generation.",
    tech: ["Node.js", "Next.js"],
    href: "https://www.brandvision.one/",
    shot: { src: "/projects/brandvision-full.jpg", aspect: 1.8056 },
  },
];
