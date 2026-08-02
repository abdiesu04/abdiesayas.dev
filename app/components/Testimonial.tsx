import { ArrowUpRight } from "lucide-react";
import Container from "./Container";
import Drift from "./Drift";
import Reveal from "./Reveal";
import VideoPlayer from "./VideoPlayer";

const VIDEO_URL = "https://www.youtube.com/watch?v=yBeq8DzIaQ0";

export default function Testimonial() {
  return (
    <section className="bg-ink py-20 text-paper md:py-28">
      <Container>
        <Reveal y={16}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-paper/15 pb-5">
            <h2
              className="font-display leading-[1.05] tracking-[-0.015em] text-paper"
              style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)" }}
            >
              Client Testimonial
            </h2>
            <span className="label text-paper/45">On Record</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 pt-12 md:grid-cols-12 md:gap-8 md:pt-16">
          <Reveal className="flex flex-col justify-between gap-8 md:col-span-5">
            {/* Sits further back than the card, so it travels less. */}
            <Drift from={-8} to={8}>
              <p
                className="max-w-[16ch] font-display leading-[1.05] tracking-[-0.015em]"
                style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
              >
                A client on camera, unedited.
              </p>
            </Drift>

            <div>
              <p className="text-[0.9375rem] leading-relaxed text-paper/60">
                “Asked My Clients What It’s Really Like to Work With Me” — no
                script, no cuts.
              </p>

              <a
                href={VIDEO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 inline-flex items-center gap-2 border-b border-paper/30 pb-1 text-sm text-paper transition-colors hover:border-clay-dark hover:text-clay-dark"
              >
                Watch on YouTube
                <ArrowUpRight
                  className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="md:col-span-7">
            <Drift from={16} to={-16}>
              <VideoPlayer />
            </Drift>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
