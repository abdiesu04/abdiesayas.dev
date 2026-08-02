import Container from "./Container";
import Reveal from "./Reveal";
import { education, honors, roles, type Metric } from "../data/career";

/**
 * A rule and whitespace, never a box: the outcomes a role actually produced,
 * lifted out of the sentence they are buried in so they can be scanned. The
 * figure sits above body copy and below the company it belongs to, which is
 * the order a reader needs them in.
 */
function Ledger({ metrics }: { metrics: Metric[] }) {
  return (
    <dl className="mt-6 flex flex-wrap gap-x-9 gap-y-4 border-t border-rule pt-4">
      {metrics.map((metric) => (
        // flex-col-reverse keeps <dt> before <dd> in the DOM, which a
        // definition list requires, while painting the figure on top.
        <div key={metric.caption} className="flex flex-col-reverse">
          <dt className="label mt-1.5 text-ink/45">{metric.caption}</dt>
          <dd
            className="font-display leading-none tracking-[-0.01em]"
            style={{ fontSize: "clamp(1.375rem, 2.2vw, 1.75rem)" }}
          >
            {metric.figure}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function Career() {
  return (
    <section id="career" className="scroll-mt-20 py-20 md:py-28">
      <Container>
        <Reveal y={16}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-rule pb-5">
            <h2
              className="font-display leading-[1.05] tracking-[-0.015em] text-ink"
              style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)" }}
            >
              Career
            </h2>
            <span className="label text-ink/45">Experience — On the Ledger</span>
          </div>
        </Reveal>

        <ul>
          {roles.map((role, index) => (
            <Reveal as="li" key={role.number} delay={Math.min(index * 0.06, 0.24)} y={20}>
              <article className="grid grid-cols-1 gap-x-8 gap-y-4 border-b border-rule py-8 md:grid-cols-12 md:py-10">
                <div className="md:col-span-3">
                  <span className="label block text-ink/70">{role.period}</span>
                  <span className="label mt-1.5 block text-ink/45">{role.location}</span>
                </div>

                <div className="md:col-span-6">
                  {/* Held down so the outcome below can be its near-peer
                      rather than a fifth of its weight. A client has not
                      heard of the company; the −32% is what transfers. */}
                  <h3
                    className="font-display leading-[1.1] tracking-[-0.01em]"
                    style={{ fontSize: "clamp(1.375rem, 2.4vw, 2rem)" }}
                  >
                    {role.company}
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] text-ink/70">{role.title}</p>

                  {role.note ? (
                    <span className="label mt-3 inline-block border border-clay/40 px-2.5 py-1 text-clay">
                      {role.note}
                    </span>
                  ) : null}

                  <p className="mt-4 max-w-[60ch] text-[0.9375rem] leading-relaxed text-ink/65">
                    {role.description}
                  </p>

                  {role.metrics ? <Ledger metrics={role.metrics} /> : null}
                </div>

                <p className="label leading-[1.9] text-ink/45 md:col-span-3 md:text-right">
                  {role.tech.join(" · ")}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal y={16}>
          <h3 className="label mt-20 border-b border-rule pb-5 text-ink/70 md:mt-28">
            Education
          </h3>
        </Reveal>

        <ul>
          {education.map((item, index) => (
            <Reveal as="li" key={item.institution} delay={index * 0.06} y={20}>
              <article className="grid grid-cols-1 gap-x-8 gap-y-3 border-b border-rule py-8 md:grid-cols-12">
                <div className="md:col-span-3">
                  <span className="label block text-ink/70">{item.period}</span>
                  <span className="label mt-1.5 block text-ink/45">{item.location}</span>
                </div>

                <div className="md:col-span-9">
                  <h4
                    className="font-display leading-[1.15] tracking-[-0.01em]"
                    style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.9rem)" }}
                  >
                    {item.institution}
                  </h4>
                  <p className="mt-1.5 text-[0.9375rem] text-ink/70">
                    {item.qualification}
                  </p>

                  {item.backing ? (
                    <span className="label mt-3 inline-block border border-clay/40 px-2.5 py-1 text-clay">
                      {item.backing}
                    </span>
                  ) : null}

                  <p className="mt-3 max-w-[70ch] text-[0.9375rem] leading-relaxed text-ink/60">
                    {item.description}
                  </p>

                  {item.metrics ? <Ledger metrics={item.metrics} /> : null}
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal y={16}>
          <h3 className="label mt-20 border-b border-rule pb-5 text-ink/70 md:mt-28">
            Certifications & Honors
          </h3>
        </Reveal>

        <ul className="grid grid-cols-1 md:grid-cols-2">
          {honors.map((honor, index) => (
            <Reveal as="li" key={honor} delay={index * 0.05} y={16}>
              <div className="flex h-full items-start gap-4 border-b border-rule py-6">
                {/* Enumeration, not proof — clay would spend the accent on
                    counting and empty it everywhere it means something. */}
                <span className="label pt-0.5 text-ink/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-ink/70">
                  {honor}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
