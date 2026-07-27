import Container from "./Container";
import Reveal from "./Reveal";

const PARAGRAPHS = [
  "I’m a software engineer in Adama, Ethiopia, and most of what I build ships into other people’s businesses — a lender’s underwriting queue, a property company’s valuation engine, a sales team’s phone line.",
  "I came up through a software engineering degree at ASTU and A2SV (Google-backed), then through Upwork, where 23 delivered projects taught me the thing courses don’t: clients pay for working, not for clever. The thread through all of it is uncertainty — teaching systems to say “I’m not sure” and hand off to a human instead of guessing.",
  "I’m looking for a team building AI products where correctness actually matters — and I’m happy being the person who asks what happens when the model is wrong.",
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 py-20 md:py-28">
      <Container>
        <Reveal y={16}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-rule pb-5">
            <h2 className="label">About</h2>
            <span className="label text-ink/45">The person behind the systems</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 pt-12 md:grid-cols-12 md:pt-16">
          <Reveal className="md:col-span-5">
            <p
              className="max-w-[22ch] font-display leading-[1.08] tracking-[-0.015em]"
              style={{ fontSize: "clamp(2rem, 4.6vw, 3.75rem)" }}
            >
              Teaching systems to say{" "}
              <span className="text-clay">“I’m not sure.”</span>
            </p>
          </Reveal>

          <div className="flex flex-col gap-6 md:col-span-6 md:col-start-7">
            {PARAGRAPHS.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={index * 0.08} y={18}>
                <p className="max-w-[62ch] text-base leading-[1.75] text-ink/75">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
