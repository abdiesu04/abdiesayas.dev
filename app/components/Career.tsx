import Container from "./Container";
import Reveal from "./Reveal";
import { education, honors, roles } from "../data/career";

export default function Career() {
  return (
    <section id="career" className="scroll-mt-20 py-20 md:py-28">
      <Container>
        <Reveal y={16}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-rule pb-5">
            <h2 className="label">Career</h2>
            <span className="label text-ink/45">Experience — On the Ledger</span>
          </div>
        </Reveal>

        <ul>
          {roles.map((role, index) => (
            <Reveal as="li" key={role.number} delay={Math.min(index * 0.06, 0.24)} y={20}>
              <article className="grid grid-cols-1 gap-x-8 gap-y-4 border-b border-rule py-8 md:grid-cols-12 md:py-10">
                <div className="md:col-span-3">
                  <span className="label block text-ink/70">{role.period}</span>
                  <span className="label mt-1.5 block text-ink/40">{role.location}</span>
                </div>

                <div className="md:col-span-6">
                  <h3
                    className="font-display leading-[1.1] tracking-[-0.01em]"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
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
                </div>

                <p className="label leading-[1.9] text-ink/40 md:col-span-3 md:text-right">
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
                  <span className="label mt-1.5 block text-ink/40">{item.location}</span>
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
                  <p className="mt-3 max-w-[70ch] text-[0.9375rem] leading-relaxed text-ink/60">
                    {item.description}
                  </p>
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
                <span className="label pt-0.5 text-clay">
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
