const STACK = [
  "Python",
  "Go",
  "Node.js",
  "Next.js / React",
  "FastAPI",
  "Django",
  "PostgreSQL",
  "Redis",
  "LangChain",
  "LangGraph",
  "n8n",
  "Docker",
  "AWS",
];

export default function StackMarquee() {
  return (
    <section
      aria-label="Technology stack"
      className="border-y border-rule bg-paper-deep py-4"
      style={{ overflowX: "clip" }}
    >
      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex items-center" aria-hidden={copy === 1}>
            {STACK.map((item) => (
              <li key={item} className="flex items-center">
                <span className="label whitespace-nowrap text-ink/55">{item}</span>
                <span className="mx-6 size-1 rounded-full bg-clay/50" aria-hidden />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
