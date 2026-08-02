import { ArrowDown, ArrowUpRight } from "lucide-react";
import Container from "./Container";
import Drift from "./Drift";
import LocalTime from "./LocalTime";
import Masthead from "./Masthead";
import Reveal from "./Reveal";
import { FIGURE_SHADOW } from "../lib/depth";

const STATS = [
  { figure: "23+", label: "Projects in production" },
  { figure: "Top 3%", label: "Freelancer on Upwork" },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/abdiesu04" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abdiesu04" },
  { label: "Upwork", href: "https://www.upwork.com/freelancers/~01d208502b9f008d54" },
];

export default function Hero() {
  return (
    <section id="top" className="pb-14 pt-8 sm:pt-10 md:pb-20 md:pt-14">
      <Container>
        <Reveal delay={0} y={10} duration={0.6}>
          <div className="flex flex-col gap-y-3 border-b border-rule pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-x-8">
            <span className="label text-ink/70">AI Systems Engineer</span>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="label text-ink/45">Addis Ababa, Ethiopia</span>
              <span className="label text-ink/45">
                <LocalTime />
              </span>
              <span className="label inline-flex items-center gap-2 text-clay">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-clay opacity-70" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-clay" />
                </span>
                Available
              </span>
            </div>
          </div>
        </Reveal>

        <Masthead
          text="Abdi Esayas"
          className="mt-8 font-display leading-[0.84] tracking-[-0.02em] sm:mt-10 md:mt-12"
          style={{ fontSize: "clamp(3rem, 18.5vw, 17rem)" }}
        />

        <div className="mt-10 grid grid-cols-1 gap-y-10 border-t border-rule pt-7 md:mt-12 md:grid-cols-12 md:gap-x-8">
          <Reveal delay={0.5} y={18} className="md:col-span-6">
            <p
              className="max-w-[42ch] font-display leading-[1.24] tracking-[-0.01em]"
              style={{ fontSize: "clamp(1.2rem, 2.1vw, 1.85rem)" }}
            >
              Most of what I build runs inside other people’s companies.
              Production systems handling real money, real customers, and the
              real cost of being wrong.
            </p>
          </Reveal>

          {/* Above the intro paragraph below md: the two figures are the
              reason a stranger keeps reading, so they cannot sit under a
              seven-line paragraph on a phone. DOM order is unchanged. */}
          <Reveal
            delay={0.62}
            y={18}
            className="order-first md:order-none md:col-span-6 md:col-start-7"
          >
            {/* Lags the paragraph beside it by a few pixels on the way out. */}
            <Drift over={760} from={0} to={16}>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-7">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span
                        className="block font-display leading-none tracking-[-0.01em]"
                        style={{
                          fontSize: "clamp(2.35rem, 5.1vw, 4.75rem)",
                          textShadow: FIGURE_SHADOW,
                        }}
                      >
                        {stat.figure}
                      </span>
                      <span className="label mt-2.5 block leading-[1.6] text-ink/70">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Drift>
          </Reveal>
        </div>

        <Reveal delay={0.74} y={12}>
          <div className="mt-10 flex flex-col gap-y-5 border-t border-rule pt-5 sm:flex-row sm:items-center sm:justify-between md:mt-14">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 text-ink/70 transition-colors hover:text-clay"
            >
              <span className="label">Selected Work</span>
              <ArrowDown
                className="size-3.5 transition-transform duration-300 group-hover:translate-y-1"
                aria-hidden
              />
            </a>

            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-7">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label inline-flex items-center gap-1 text-ink/70 transition-colors hover:text-clay"
                  >
                    {social.label}
                    <ArrowUpRight className="size-3" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
