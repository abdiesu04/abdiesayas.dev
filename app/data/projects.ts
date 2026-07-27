export type Project = {
  number: string;
  category: string;
  name: string;
  description: string;
  tech: string[];
  href?: string;
  status?: string;
  preview?: string;
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
    preview: "/projects/malama.png",
  },
  {
    number: "02",
    category: "Real-time Voice",
    name: "Investor Callback",
    description:
      "AI voice agents that call and qualify real-estate leads 24/7. Streaming STT → LLM → TTS overlapped for sub-second turns, with barge-in, voicemail detection, and human handoff.",
    tech: ["FastAPI", "Twilio", "Streaming STT/TTS", "Redis"],
    href: "https://investorcallback.com",
    preview: "/projects/investorcallback.png",
  },
  {
    number: "03",
    category: "Property · AVM",
    name: "Moov Homes",
    description:
      "Valuation engine for a UK home-buying service: comparables over recent sales and EPC data, an offer range with a confidence score — and low confidence routes to a human surveyor within one working day.",
    tech: ["Python", "PostgreSQL", "Comparables Pipeline"],
    href: "https://moovhomes.co.uk",
    preview: "/projects/moovhomes.png",
  },
  {
    number: "04",
    category: "AI Video · SaaS",
    name: "SmartAIVideo",
    description:
      "AI video platform that takes a concept to a finished cut — script generation, studio-quality voiceover in 40+ languages, multi-layer compositing, and scheduled publishing.",
    tech: ["Next.js", "LLM Pipeline", "TTS", "Vercel"],
    href: "https://ai-video-eight.vercel.app/",
    preview: "/projects/smartaivideo.png",
  },
  {
    number: "05",
    category: "Education · LLM",
    name: "SkillBridge Academy",
    description:
      "AI-powered preparation for Rwandan national exams — multilingual practice, marking, and step-by-step explanations instead of answer keys.",
    tech: ["Next.js", "Python", "LLM Pipeline"],
    status: "Case study on request",
  },
  {
    number: "06",
    category: "SaaS · Private Beta",
    name: "BrandVision",
    description:
      "AI-powered brand operating system. Backend and AI orchestration for a product currently behind auth — written case study available on request.",
    tech: ["Node.js", "Next.js"],
    status: "Private beta — case study on request",
  },
];
