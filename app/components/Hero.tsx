import { ArrowDown, ArrowUpRight } from "lucide-react";
import Container from "./Container";
import LocalTime from "./LocalTime";
import Reveal from "./Reveal";

const ELSEWHERE = [
  { label: "GitHub", href: "https://github.com/abdiesu04" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abdiesayas" },
  { label: "Upwork", href: "https://www.upwork.com/freelancers/~abdiesayas" },
];

export default function Hero() {
  return (
    <section id="top" className="pb-16 pt-14 md:pb-24 md:pt-20">
      <Container>
        <Reveal delay={0} y={12}>
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-rule pb-5">
            <span className="label">AI Systems Engineer</span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="label text-ink/50">Adama, Ethiopia</span>
              <span className="label text-ink/50">
                <LocalTime />
              </span>
              <span className="label inline-flex items-center gap-2 text-clay">
                <span className="size-1.5 rounded-full bg-clay" aria-hidden />
                Available
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} y={28}>
          <h1
            className="mt-10 font-display leading-[0.82] tracking-[-0.02em] md:mt-14"
            style={{ fontSize: "clamp(3.25rem, 19vw, 18rem)" }}
          >
            Abdi Esayas
          </h1>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 border-t border-rule pt-8 md:mt-16 md:grid-cols-12 md:gap-8">
          <Reveal delay={0.16} className="md:col-span-7">
            <p
              className="max-w-[46ch] font-display leading-[1.25] tracking-[-0.01em]"
              style={{ fontSize: "clamp(1.35rem, 2.6vw, 2.35rem)" }}
            >
              Most of what I build ships into other people’s businesses — a
              lender’s underwriting queue, a property company’s valuation
              engine, a sales team’s phone line.
            </p>
          </Reveal>

          <Reveal delay={0.24} className="md:col-span-4 md:col-start-9">
            <span className="label text-ink/45">Elsewhere</span>
            <ul className="mt-4 flex flex-col gap-2.5">
              {ELSEWHERE.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 border-b border-transparent pb-0.5 text-sm text-ink/70 transition-colors hover:border-clay hover:text-clay"
                  >
                    {item.label}
                    <ArrowUpRight
                      className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.32} y={12}>
          <a
            href="#work"
            className="group mt-14 inline-flex items-center gap-2.5 border-t border-rule pt-5 text-ink/55 transition-colors hover:text-clay md:mt-20"
          >
            <span className="label">Selected Work</span>
            <ArrowDown
              className="size-3.5 transition-transform duration-300 group-hover:translate-y-1"
              aria-hidden
            />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
