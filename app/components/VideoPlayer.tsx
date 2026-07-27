"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";

const VIDEO_ID = "yBeq8DzIaQ0";

/**
 * Facade player: ships a static thumbnail and only loads the YouTube
 * embed once the visitor asks for it, so the page stays fast and
 * cookie-free until then.
 */
export default function VideoPlayer() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden border border-paper/15 bg-ink">
      {playing ? (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
          title="Client testimonial — Asked My Clients What It’s Really Like to Work With Me"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 size-full cursor-pointer"
          aria-label="Play the client testimonial video"
        >
          <Image
            src="/testimonial-thumb.jpg"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100"
          />

          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-clay text-paper transition-transform duration-300 group-hover:scale-110 md:size-20">
              <Play className="ml-0.5 size-6 md:size-7" fill="currentColor" aria-hidden />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
