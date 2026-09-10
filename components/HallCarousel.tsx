"use client";

import Image from "next/image";
import { useState } from "react";

type Photo = {
  src: string;
  alt: string;
};

export function HallCarousel({
  photos,
  priority = false,
}: {
  photos: Photo[];
  priority?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const current = photos[index];
  const total = photos.length;

  function go(delta: number) {
    setIndex((prev) => (prev + delta + total) % total);
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        key={current.src}
        src={current.src}
        alt={current.alt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 58vw"
        className="object-cover object-center"
      />

      {total > 1 ? (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-4 top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center bg-paper text-text hover:bg-red hover:text-white"
            aria-label="Предыдущее фото"
          >
            <Arrow dir="prev" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-4 top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center bg-paper text-text hover:bg-red hover:text-white"
            aria-label="Следующее фото"
          >
            <Arrow dir="next" />
          </button>
          <p className="absolute bottom-4 right-4 z-10 bg-panel px-3 py-1.5 font-display text-[13px] tracking-[0.08em] text-white">
            {index + 1} / {total}
          </p>
        </>
      ) : null}
    </div>
  );
}

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={dir === "prev" ? "rotate-180" : undefined}
    >
      <path
        d="M7 4l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  );
}
