import { ArrowUpRight } from "lucide-react";
import Container from "./Container";
import LocalTime from "./LocalTime";
import Reveal from "./Reveal";

const EMAIL = "abdiesayasbayisa@gmail.com";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/abdiesu04" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abdiesayas" },
  { label: "Upwork", href: "https://www.upwork.com/freelancers/~01d208502b9f008d54" },
];

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 bg-ink pt-20 text-paper md:pt-28">
      <Container>
        <Reveal y={16}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-paper/15 pb-5">
            <h2
              className="font-display leading-[1.05] tracking-[-0.015em] text-paper"
              style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)" }}
            >
              Next Step
            </h2>
            {/* Closes the loop the hero's availability line opened. On ink
                the accent cannot carry 11px text at an accessible contrast,
                so the dot carries the signal and the words stay paper. */}
            <span className="label inline-flex items-center gap-2 text-paper/70">
              <span className="proof-dot proof-dot-ink" aria-hidden />
              Open to new work
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.08} y={24}>
          <p
            className="max-w-[24ch] pt-12 font-display leading-[1.02] tracking-[-0.02em] md:pt-16"
            style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
          >
            Let’s build something that holds up.
          </p>
        </Reveal>

        {/* Facts already stated above, restated once at the point where a
            visitor decides to write or leave. One line, no second ask. */}
        <Reveal delay={0.12} y={16}>
          <p className="label mt-12 leading-[1.9] text-paper/70 md:mt-16">
            Top 3% on Upwork · 23+ systems in production · Addis Ababa, UTC+3
          </p>
        </Reveal>

        <Reveal delay={0.16} y={16}>
          <a
            href={`mailto:${EMAIL}`}
            className="group mt-6 inline-flex flex-wrap items-center gap-x-3 border-b border-paper/30 pb-2 transition-colors hover:border-clay-dark md:mt-8"
          >
            <span
              className="break-all font-display leading-tight transition-colors group-hover:text-clay-dark"
              style={{ fontSize: "clamp(1.125rem, 3vw, 2.25rem)" }}
            >
              {EMAIL}
            </span>
            <ArrowUpRight
              className="size-5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
        </Reveal>

        <footer className="mt-20 border-t border-paper/15 py-8 md:mt-28">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="label text-paper/45">© 2026 Abdi Esayas</span>
              <span className="label text-paper/45">Addis Ababa, Ethiopia</span>
              <span className="label text-paper/45">
                <LocalTime />
              </span>
            </div>

            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label inline-flex items-center gap-1 text-paper/70 transition-colors hover:text-clay-dark"
                  >
                    {social.label}
                    <ArrowUpRight className="size-3" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </Container>
    </section>
  );
}
