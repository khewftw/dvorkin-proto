"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { cn } from "@/lib/cn";

const photos = [
  {
    src: "/photos/gym/gym-dumbbells.jpg",
    alt: "Ряд гантелей в тренажёрном зале",
    layout: "lg:col-span-5 lg:h-[270px]",
  },
  {
    src: "/photos/rehab/recovery-shower.jpg",
    alt: "Душевая кабина в зоне восстановления",
    layout: "lg:col-span-4 lg:h-[270px]",
  },
  {
    src: "/photos/tennis/table-tennis-hall-03.jpg",
    alt: "Столы для настольного тенниса вдоль галереи зала",
    layout: "lg:col-span-3 lg:h-[270px]",
  },
  {
    src: "/photos/gym/gym-hall-03.jpg",
    alt: "Стойка со штангами и дисками",
    layout: "lg:col-span-6 lg:h-[390px]",
  },
  {
    src: "/photos/rehab/recovery-room-02.jpg",
    alt: "Банные шапки на деревянной вешалке",
    layout: "lg:col-span-6 lg:h-[390px]",
  },
  {
    src: "/photos/gym/gym-equipment-01.png",
    alt: "Беговые дорожки и эллипс в тренажёрном зале",
    layout: "lg:col-span-4 lg:h-[280px]",
  },
  {
    src: "/photos/volley-hall/volleyball-showers.jpg",
    alt: "Общие душевые игрового зала",
    layout: "lg:col-span-4 lg:h-[280px]",
  },
  {
    src: "/photos/rehab/recovery-room-01.jpg",
    alt: "Комната отдыха у сауны с деревянными столами",
    layout: "lg:col-span-4 lg:h-[280px]",
  },
  {
    src: "/photos/volley-hall/volleyball-hall-01.jpg",
    alt: "Игровой зал с волейбольной площадкой",
    layout: "lg:col-span-5 lg:h-[270px]",
  },
  {
    src: "/photos/volley-hall/volleyball-court.jpg",
    alt: "Волейбольная сетка и профессиональный паркет",
    layout: "lg:col-span-4 lg:h-[270px]",
  },
  {
    src: "/photos/volley-hall/volleyball-hall-02.jpg",
    alt: "Трибуны и игровое поле",
    layout: "lg:col-span-3 lg:h-[270px]",
  },
  {
    src: "/photos/gym/gym-hall-01.jpg",
    alt: "Силовое оборудование тренажёрного зала",
    layout: "lg:col-span-6 lg:h-[390px]",
  },
  {
    src: "/photos/gym/gym-hall-02.jpg",
    alt: "Кардиотренажёры у зеркальной стены",
    layout: "lg:col-span-6 lg:h-[390px]",
  },
  {
    src: "/photos/tennis/table-tennis-hall-01.jpg",
    alt: "Зал для настольного тенниса",
    layout: "lg:col-span-4 lg:h-[280px]",
  },
  {
    src: "/photos/rehab/recovery-sauna.jpg",
    alt: "Сауна с деревянной отделкой",
    layout: "lg:col-span-4 lg:h-[280px]",
  },
  {
    src: "/photos/rehab/recovery-room-04.jpg",
    alt: "Пространство для отдыха после тренировки",
    layout: "lg:col-span-4 lg:h-[280px]",
  },
];

export function Gallery() {
  const reduceMotion = useReducedMotion();
  const [showAll, setShowAll] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const touchStart = useRef<number | null>(null);
  const visiblePhotos = useMemo(
    () => (showAll ? photos : photos.slice(0, 8)),
    [showAll],
  );

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") {
        setActiveIndex((index) =>
          index === null
            ? null
            : (index - 1 + visiblePhotos.length) % visiblePhotos.length,
        );
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((index) =>
          index === null ? null : (index + 1) % visiblePhotos.length,
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, visiblePhotos.length]);

  function showPrevious() {
    setActiveIndex((index) =>
      index === null
        ? null
        : (index - 1 + visiblePhotos.length) % visiblePhotos.length,
    );
  }

  function showNext() {
    setActiveIndex((index) =>
      index === null ? null : (index + 1) % visiblePhotos.length,
    );
  }

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="scroll-mt-24 bg-paper py-16 sm:py-24"
    >
      <Container>
        <h2
          id="gallery-title"
          className="font-script mb-9 text-[clamp(38px,6vw,68px)] font-bold italic leading-none"
          data-reveal
        >
          Галерея <span className="text-red">нашего дома</span>
        </h2>

        <div
          className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-12"
          data-stagger
        >
          {visiblePhotos.map((photo, index) => (
            <motion.button
              key={photo.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "group relative h-[260px] overflow-hidden bg-surface sm:h-[300px]",
                photo.layout,
              )}
              aria-label={`Открыть фото: ${photo.alt}`}
              data-stagger-item
              whileHover={reduceMotion ? undefined : { y: -5, scale: 1.008 }}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
              transition={{ type: "spring", stiffness: 320, damping: 25 }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 42vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
              />
            </motion.button>
          ))}
        </div>

        {!showAll ? (
          <div className="mt-8 flex justify-center">
            <Button type="button" onClick={() => setShowAll(true)}>
              Загрузить ещё
            </Button>
          </div>
        ) : null}
      </Container>

      <AnimatePresence>
        {activeIndex !== null ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фотографий"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 sm:p-8"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={() => setActiveIndex(null)}
          onTouchStart={(event) => {
            touchStart.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            if (touchStart.current === null) return;
            const end = event.changedTouches[0]?.clientX ?? touchStart.current;
            const distance = end - touchStart.current;
            if (Math.abs(distance) > 50) {
              if (distance > 0) showPrevious();
              else showNext();
            }
            touchStart.current = null;
          }}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setActiveIndex(null);
            }}
            className="absolute right-4 top-4 z-10 flex size-12 items-center justify-center border border-white/25 bg-panel text-[28px] text-white hover:bg-white hover:text-ink"
            aria-label="Закрыть галерею"
          >
            ×
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            className="absolute bottom-4 left-4 z-10 flex size-12 items-center justify-center border border-white/25 bg-panel font-display text-[28px] text-white hover:bg-white hover:text-ink sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2"
            aria-label="Предыдущее фото"
          >
            ←
          </button>

          <motion.div
            className="relative h-[78svh] w-[calc(100vw-2rem)] max-w-[1400px] sm:h-[86svh] sm:w-[calc(100vw-10rem)]"
            onClick={(event) => event.stopPropagation()}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={visiblePhotos[activeIndex].src}
                className="absolute inset-0"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 1.015 }}
                transition={{ duration: 0.22 }}
              >
                <Image
                  src={visiblePhotos[activeIndex].src}
                  alt={visiblePhotos[activeIndex].alt}
                  fill
                  priority
                  sizes="100vw"
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            className="absolute bottom-4 right-4 z-10 flex size-12 items-center justify-center border border-white/25 bg-panel font-display text-[28px] text-white hover:bg-white hover:text-ink sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2"
            aria-label="Следующее фото"
          >
            →
          </button>

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-display text-[18px] text-white/65">
            {activeIndex + 1} / {visiblePhotos.length}
          </p>
        </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
