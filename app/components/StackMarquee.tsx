// Every chip carries its name, so the mark beside it is a mark and nothing
// more — even where the logo happens to be a logotype. Brands whose primary
// hex washes out on the ivory tile use the darker variant from their own
// official palette instead.
//
// `scale` sizes the mask box, but the box is not what the eye reads: the
// sources are all 24x24 with the ink centred, and their ink fills anywhere
// from 37% to 100% of that square. Setting every box to one size would let
// the wide, short marks (Go, AWS, n8n) print far heavier than the round
// ones. So each scale is solved so that the geometric mean of the painted
// ink — sqrt(width x height) — lands on ~0.50 of the tile. That figure is
// where the hand-tuned icons already sat, and holding wide marks to it is
// what keeps a logotype from shouting over an icon two chips away.
type Tech = {
  name: string;
  file: string;
  brand: string;
  scale: number;
};

const STACK: Tech[] = [
  { name: "Python", file: "python", brand: "#3776ab", scale: 1 },
  { name: "Go", file: "go", brand: "#007d9c", scale: 1.57 },
  { name: "Node.js", file: "nodejs", brand: "#43853d", scale: 1 },
  { name: "React", file: "react", brand: "#087ea4", scale: 1.06 },
  { name: "Next.js", file: "nextjs", brand: "#14120f", scale: 0.95 },
  { name: "FastAPI", file: "fastapi", brand: "#00796b", scale: 0.95 },
  { name: "Django", file: "django", brand: "#0c4b33", scale: 0.96 },
  { name: "PostgreSQL", file: "postgresql", brand: "#336791", scale: 1.1 },
  { name: "Redis", file: "redis", brand: "#c6302b", scale: 1.02 },
  { name: "LangChain", file: "langchain", brand: "#1c3c3c", scale: 0.98 },
  { name: "LangGraph", file: "langgraph", brand: "#1c3c3c", scale: 0.92 },
  { name: "n8n", file: "n8n", brand: "#e0335c", scale: 1.34 },
  { name: "Docker", file: "docker", brand: "#1d63ed", scale: 1.14 },
  { name: "AWS", file: "aws", brand: "#ec7211", scale: 1.24 },
];

// The track shifts by half its width, so the copy count must be even and
// half the run has to stay wider than the widest viewport or the loop gaps.
const COPIES = [0, 1, 2, 3, 4, 5];

export default function StackMarquee() {
  return (
    <section
      aria-label="Technology stack"
      className="stack-band border-y border-rule bg-paper-deep py-8 sm:py-12"
      style={{ overflowX: "clip" }}
    >
      <div className="marquee-track flex w-max items-center">
        {COPIES.map((copy) => (
          <ul
            key={copy}
            className="stack-row flex items-center"
            aria-hidden={copy !== 0}
          >
            {STACK.map((tech) => (
              <li key={tech.name} className="flex">
                <span
                  className="stack-tile"
                  style={{ "--brand": tech.brand } as React.CSSProperties}
                >
                  <span
                    className="stack-mark"
                    aria-hidden="true"
                    style={
                      {
                        "--mark-scale": tech.scale,
                        maskImage: `url(/logos/${tech.file}.svg)`,
                        WebkitMaskImage: `url(/logos/${tech.file}.svg)`,
                      } as React.CSSProperties
                    }
                  />
                  <span className="stack-name">{tech.name}</span>
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
