"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { LeadModal } from "@/components/LeadModal";

const halls = [
  {
    id: "court",
    title: "Игровой зал",
    href: "/?f=court#schedule",
    text: "Профессиональное покрытие с разметкой под волейбол, баскетбол и мини-футбол. Тот самый паркет, на котором проходят всероссийские соревнования. Аренда почасовая: тренировка, турнир, корпоративная игра.",
    photos: [
      {
        src: "/photos/volley-hall/volleyball-hall-01.jpg",
        alt: "Игровой зал Дома спорта с профессиональной разметкой",
      },
      {
        src: "/photos/volley-hall/volleyball-court.jpg",
        alt: "Волейбольная сетка и паркет игрового зала",
      },
      {
        src: "/photos/volley-hall/volleyball-hall-02.jpg",
        alt: "Трибуны и поле игрового зала",
      },
      {
        src: "/photos/volley-hall/volleyball-hall-03.jpg",
        alt: "Общий вид игрового зала",
      },
      {
        src: "/photos/volley-hall/volleyball-hall-04.jpg",
        alt: "Игровой зал с разметкой под несколько видов спорта",
      },
      {
        src: "/photos/volley-hall/volleyball-facilities-01.jpg",
        alt: "Инфраструктура игрового зала",
      },
      {
        src: "/photos/volley-hall/volleyball-locker-room.jpg",
        alt: "Раздевалка игрового зала",
      },
      {
        src: "/photos/volley-hall/volleyball-showers.jpg",
        alt: "Душевые игрового зала",
      },
    ],
  },
  {
    id: "gym",
    title: "Тренажёрный зал",
    href: "/?f=gym#schedule",
    text: "Силовые тренажёры, кардио, свободные веса и зона для функционального тренинга. Инструктор в зале поставит технику и соберёт программу. Днём почти пусто — можно работать спокойно.",
    photos: [
      {
        src: "/photos/gym/gym-hall-01.jpg",
        alt: "Тренажёрный зал: стойка, штанга и свободные веса",
      },
      {
        src: "/photos/gym/gym-hall-02.jpg",
        alt: "Велотренажёры у зеркала",
      },
      {
        src: "/photos/gym/gym-hall-03.jpg",
        alt: "Стойка со штангами и дисками",
      },
      {
        src: "/photos/gym/gym-dumbbells.jpg",
        alt: "Ряд гантелей в тренажёрном зале",
      },
      {
        src: "/photos/gym/gym-equipment-01.png",
        alt: "Беговые дорожки и эллипс в тренажёрном зале",
      },
    ],
  },
  {
    id: "tennis",
    title: "Настольный теннис",
    href: "/?f=tennis#schedule",
    text: "Несколько столов, ракетки и мячи выдаём на месте. Час на двоих выходит дешевле двух чашек кофе. Подходит и для разминки перед турниром, и просто чтобы поиграть.",
    photos: [
      {
        src: "/photos/tennis/table-tennis-hall-01.jpg",
        alt: "Ряд столов для настольного тенниса в галерее зала",
      },
      {
        src: "/photos/tennis/table-tennis-hall-02.jpg",
        alt: "Зал настольного тенниса",
      },
      {
        src: "/photos/tennis/table-tennis-hall-03.jpg",
        alt: "Столы для настольного тенниса вдоль галереи",
      },
      {
        src: "/photos/tennis/table-tennis-equipment.png",
        alt: "Ракетки и мячи для настольного тенниса",
      },
    ],
  },
  {
    id: "sauna",
    title: "Сауна",
    href: "/?f=sauna#schedule",
    text: "Сауна и зона отдыха. Мышцы отпускает, пульс приходит в норму, из комплекса выходите не выжатым. Бронируется отдельно, удобно ставить сразу после тренировки.",
    photos: [
      {
        src: "/photos/rehab/recovery-sauna.jpg",
        alt: "Деревянная сауна с каменкой в зоне восстановления",
      },
      {
        src: "/photos/rehab/recovery-room-01.jpg",
        alt: "Комната отдыха у сауны с деревянными столами",
      },
      {
        src: "/photos/rehab/recovery-room-02.jpg",
        alt: "Банные шапки на деревянной вешалке",
      },
      {
        src: "/photos/rehab/recovery-room-03.jpg",
        alt: "Зона восстановления",
      },
      {
        src: "/photos/rehab/recovery-room-04.jpg",
        alt: "Комната отдыха в зоне сауны",
      },
      {
        src: "/photos/rehab/recovery-shower.jpg",
        alt: "Душевая кабина в зоне восстановления",
      },
    ],
  },
];

export function Services() {
  const reduceMotion = useReducedMotion();
  const [leadService, setLeadService] = useState<string | null>(null);
  const featured = halls[0];
  const rest = halls.slice(1);

  return (
    <section id="services" className="scroll-mt-24 bg-paper py-16 sm:py-24">
      <Container>
        <h2
          className="font-script mb-9 text-[clamp(38px,6vw,68px)] font-bold italic leading-none"
          data-reveal
        >
          Направления и <span className="text-red">услуги</span>
        </h2>

        <motion.article
          id={featured.id}
          className="group relative z-10 grid scroll-mt-24 overflow-hidden bg-panel text-white shadow-[0_0_42px_rgba(43,103,243,0.45)] lg:min-h-[430px] lg:grid-cols-2"
          data-reveal
          whileHover={
            reduceMotion
              ? undefined
              : {
                  y: -6,
                  boxShadow: "0 0 58px rgba(43,103,243,0.62)",
                }
          }
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
        >
          <div className="relative min-h-[300px]">
            <Image
              src={featured.photos[0].src}
              alt={featured.photos[0].alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
            />
            <span className="absolute left-4 top-4 bg-red px-3 py-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.08em]">
              Командные виды спорта
            </span>
          </div>
          <div className="flex flex-col justify-center bg-red px-6 py-10 sm:px-10 lg:px-12">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white/65">
              Главная площадка комплекса
            </p>
            <h3 className="mt-4 font-display text-[clamp(32px,4vw,48px)] uppercase leading-none">
              {featured.title}
            </h3>
            <p className="mt-5 max-w-[48ch] text-[15px] leading-[1.55] text-white/85">
              {featured.text}
            </p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
              <Button
                href={featured.href}
                variant="inverted"
                className="w-full shadow-[0_0_26px_rgba(255,255,255,0.5)] sm:w-auto"
              >
                Забронировать
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => setLeadService(featured.title)}
              >
                Написать
              </Button>
            </div>
          </div>
        </motion.article>

        <div className="mt-3 grid gap-3 md:grid-cols-3" data-stagger>
          {rest.map((hall) => (
            <motion.article
              key={hall.id}
              id={hall.id}
              className="group flex scroll-mt-24 flex-col overflow-hidden bg-panel text-white"
              data-stagger-item
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -8,
                      boxShadow: "0 16px 34px rgba(19,25,33,0.2)",
                    }
              }
              whileTap={reduceMotion ? undefined : { scale: 0.99 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <div className="relative h-[250px]">
                <Image
                  src={hall.photos[0].src}
                  alt={hall.photos[0].alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute left-3 top-3 bg-red px-2.5 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.08em]">
                  Платные услуги
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6 lg:p-7">
                <h3 className="font-display text-[clamp(32px,3vw,44px)] uppercase leading-none">
                  {hall.title}
                </h3>
                <p className="mt-4 line-clamp-4 text-[14px] leading-[1.55] text-white/65">
                  {hall.text}
                </p>
                <div className="mt-7 flex w-full flex-col gap-2.5">
                  <Button href={hall.href} className="w-full px-6 py-3">
                    Забронировать
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full px-6 py-3"
                    onClick={() => setLeadService(hall.title)}
                  >
                    Написать
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
      <AnimatePresence>
        {leadService ? (
          <LeadModal
            tariff={`Услуга: ${leadService}`}
            onClose={() => setLeadService(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
