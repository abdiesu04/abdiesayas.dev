import Image from "next/image";
import { Download } from "lucide-react";
import Container from "./Container";
import Reveal from "./Reveal";
import { downloadName, pdfPath, previewPath, previewSize } from "../data/resume";
import { PANEL_SHADOW } from "../lib/depth";

const ALT =
  "Résumé of Abdi Esayas: skills, professional experience at Upwork, Mālama Funding, AuraSpot and Eskalate, a machine learning project, education at ASTU and A2SV, leadership at CSEC ASTU, and awards.";

export default function Resume() {
  return (
    <section id="resume" className="scroll-mt-20 py-20 md:py-28">
      <Container>
        <Reveal y={16}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-rule pb-5">
            <h2
              className="font-display leading-[1.05] tracking-[-0.015em] text-ink"
              style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)" }}
            >
              Résumé
            </h2>

            <a
              href={pdfPath}
              download={downloadName}
              className="label group inline-flex items-center gap-2 border-b border-rule pb-1 text-ink/70 transition-colors hover:border-clay hover:text-clay"
            >
              <Download
                className="size-3.5 transition-transform duration-200 group-hover:translate-y-0.5"
                aria-hidden
              />
              Download PDF
            </a>
          </div>
        </Reveal>

        {/* The document itself, framed as a sheet lying on the page. The
            embedded viewer is the real PDF, so its text stays selectable and
            searchable; the image beside it is the same page rendered, for the
            mobile browsers that refuse to inline a PDF at all. Deliberately
            outside Reveal — a transformed ancestor makes a PDF plugin repaint. */}
        <div
          className="mx-auto mt-12 w-full max-w-[860px] overflow-hidden rounded-[2px] border border-rule bg-white md:mt-16"
          style={{ boxShadow: PANEL_SHADOW }}
        >
          <object
            data={`${pdfPath}#view=FitH&toolbar=0&navpanes=0`}
            type="application/pdf"
            aria-label={ALT}
            className="hidden w-full md:block"
            style={{ aspectRatio: `${previewSize.width} / ${previewSize.height}` }}
          >
            <Image
              src={previewPath}
              alt={ALT}
              width={previewSize.width}
              height={previewSize.height}
              className="block h-auto w-full"
            />
          </object>

          <Image
            src={previewPath}
            alt={ALT}
            width={previewSize.width}
            height={previewSize.height}
            className="block h-auto w-full md:hidden"
          />
        </div>
      </Container>
    </section>
  );
}
