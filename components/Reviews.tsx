"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/Container";
import { cn } from "@/lib/cn";

const reviews = [
  {
    title: "Удобно после работы",
    name: "Антон К.",
    initials: "АК",
    text: "Ходим играть в настольный теннис по четвергам. Столы нормальные, свет не бьёт в глаза, ракетки и мячи можно взять на месте. Особенно удобно, что заранее видишь свободное время.",
    service: "Настольный теннис",
  },
  {
    title: "Спокойно тренируюсь днём",
    name: "Мария С.",
    initials: "МС",
    text: "Беру абонемент на восемь занятий и прихожу до обеда. В зале свободно, к стойкам нет очереди. В первый день инструктор показал оборудование и поправил технику — для новичка это очень помогло.",
    service: "Тренажёрный зал",
  },
  {
    title: "Провели хороший турнир",
    name: "Дмитрий П.",
    initials: "ДП",
    text: "Арендовали игровой зал для корпоративного турнира. Площадку подготовили к нашему приезду, сетку выставили быстро. Места хватило и командам, и тем, кто пришёл поболеть.",
    service: "Игровой зал",
  },
  {
    title: "Отлично после волейбола",
    name: "Ольга В.",
    initials: "ОВ",
    text: "Бронировали восстановительный центр после игры. Всё аккуратно, температура комфортная, есть место спокойно посидеть компанией. После двух часов на площадке это именно то, что было нужно.",
    service: "Восстановительный центр",
  },
  {
    title: "Зал с настоящей атмосферой",
    name: "Илья Р.",
    initials: "ИР",
    text: "Играли здесь любительской командой. Паркет хороший, разметка понятная, потолки высокие. Чувствуется, что это полноценная спортивная площадка.",
    service: "Игровой зал",
  },
  {
    title: "Абонемент себя оправдал",
    name: "Екатерина Н.",
    initials: "ЕН",
    text: "Взяла восемь занятий, чтобы вернуться к тренировкам после перерыва. Цена понятная, никаких неожиданных доплат. За месяц вошла в режим и теперь хочу перейти на двенадцать посещений.",
    service: "Тренажёрный зал",
  },
  {
    title: "Приходим всей семьёй",
    name: "Сергей М.",
    initials: "СМ",
    text: "Сын занимается, а мы с женой в это время играем в теннис. Получается удобно по времени и не нужно ездить в разные места. Администратор всегда подсказывает свободные окна.",
    service: "Настольный теннис",
  },
  {
    title: "Всё решили одним звонком",
    name: "Наталья А.",
    initials: "НА",
    text: "Нужна была площадка для группы, но не понимали, сколько времени бронировать. По телефону подробно объяснили условия и помогли выбрать слот. В день занятия всё было готово без задержек.",
    service: "Групповая тренировка",
  },
];

export function Reviews() {
  const reduceMotion = useReducedMotion();
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({
    active: false,
    pointerId: 0,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const slider = sliderRef.current;
    const firstCard = slider?.children[0] as HTMLElement | undefined;
    if (!slider || !firstCard || window.innerWidth < 1024) return;
    slider.scrollLeft = firstCard.offsetWidth + 16;
    setActiveIndex(1);
  }, []);

  function scrollTo(index: number) {
    const slider = sliderRef.current;
    const card = slider?.children[index] as HTMLElement | undefined;
    if (!slider || !card) return;
    const paddingLeft = Number.parseFloat(
      window.getComputedStyle(slider).paddingLeft,
    );
    slider.scrollTo({
      left: card.offsetLeft - paddingLeft,
      behavior: "smooth",
    });
    setActiveIndex(index);
  }

  function updateActive() {
    const slider = sliderRef.current;
    if (!slider) return;
    setActiveIndex(findClosestCard(slider));
  }

  function findClosestCard(slider: HTMLDivElement) {
    const cards = Array.from(slider.children) as HTMLElement[];
    const paddingLeft = Number.parseFloat(
      window.getComputedStyle(slider).paddingLeft,
    );
    const closest = cards.reduce(
      (best, card, index) => {
        const distance = Math.abs(
          card.offsetLeft - paddingLeft - slider.scrollLeft,
        );
        return distance < best.distance ? { index, distance } : best;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY },
    );
    return closest.index;
  }

  function startDrag(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const slider = sliderRef.current;
    if (!slider) return;

    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: slider.scrollLeft,
      moved: false,
    };
    slider.setPointerCapture(event.pointerId);
    setIsDragging(true);
  }

  function moveDrag(event: React.PointerEvent<HTMLDivElement>) {
    const slider = sliderRef.current;
    const drag = dragRef.current;
    if (!slider || !drag.active || drag.pointerId !== event.pointerId) return;

    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 4) drag.moved = true;
    slider.scrollLeft = drag.scrollLeft - distance;
  }

  function finishDrag(event: React.PointerEvent<HTMLDivElement>) {
    const slider = sliderRef.current;
    const drag = dragRef.current;
    if (!slider || !drag.active || drag.pointerId !== event.pointerId) return;

    drag.active = false;
    if (slider.hasPointerCapture(event.pointerId)) {
      slider.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);

    if (drag.moved) {
      const closest = findClosestCard(slider);
      requestAnimationFrame(() => scrollTo(closest));
    }
  }

  return (
    <section className="relative overflow-hidden bg-transparent py-16 text-text sm:py-24">
      <div
        className="absolute inset-x-0 top-0 h-[360px] bg-paper sm:h-[390px]"
        aria-hidden
      />
      <Container>
        <div className="relative z-10 mb-9 flex items-end justify-between gap-5">
          <h2
            className="font-script text-[clamp(38px,6vw,68px)] font-bold italic leading-none"
            data-reveal
          >
            Отзывы <span className="text-red">наших посетителей</span>
          </h2>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              className="flex size-12 items-center justify-center border border-line font-display text-[26px] transition-colors hover:border-red hover:bg-red hover:text-white disabled:opacity-35"
              aria-label="Предыдущий отзыв"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() =>
                scrollTo(Math.min(reviews.length - 1, activeIndex + 1))
              }
              disabled={activeIndex === reviews.length - 1}
              className="flex size-12 items-center justify-center border border-line font-display text-[26px] transition-colors hover:border-red hover:bg-red hover:text-white disabled:opacity-35"
              aria-label="Следующий отзыв"
            >
              →
            </button>
          </div>
        </div>
      </Container>

      <div
        ref={sliderRef}
        onScroll={updateActive}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        className={cn(
          "relative z-10 -my-8 flex touch-pan-y select-none gap-4 overflow-x-auto py-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          isDragging
            ? "cursor-grabbing snap-none"
            : "cursor-grab snap-x snap-mandatory",
        )}
        style={{
          paddingInline:
            "max(1rem, calc((100vw - 1280px) / 2 + 1.5rem))",
        }}
        aria-live="polite"
        data-reveal
      >
          {reviews.map((review, index) => (
            <motion.article
              key={review.name}
              className="review-card flex min-h-[420px] snap-start flex-col border border-ink/10 bg-paper p-7 text-left text-text shadow-[0_8px_24px_rgba(19,25,33,0.12)] transition-shadow duration-300 hover:shadow-[0_14px_34px_rgba(19,25,33,0.18)] sm:p-9"
              aria-label={`${index + 1} из ${reviews.length}`}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      scale: index === activeIndex ? 1.012 : 0.985,
                      y: index === activeIndex ? -5 : 0,
                      opacity: index === activeIndex ? 1 : 0.88,
                    }
              }
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
            >
              <h3 className="font-script text-[clamp(28px,4vw,38px)] font-bold italic leading-none text-red">
                «{review.title}»
              </h3>
              <p className="mt-7 flex-1 text-[16px] leading-[1.7] text-muted sm:text-[17px]">
                {review.text}
              </p>
              <div className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                <div
                  className="flex size-14 shrink-0 items-center justify-center bg-ink font-display text-[22px] text-white"
                  aria-hidden
                >
                  {review.initials}
                </div>
                <div>
                  <p className="text-[16px] font-semibold">{review.name}</p>
                  <p className="mt-0.5 text-[13px] text-muted">
                    {review.service}
                  </p>
                </div>
                <p
                  className="ml-auto text-[17px] tracking-[0.08em] text-red"
                  aria-label="Оценка 5 из 5"
                >
                  ★★★★★
                </p>
              </div>
            </motion.article>
          ))}
      </div>

      <Container>
        <div className="relative z-10 mt-7 flex items-center justify-center gap-2">
          {reviews.map((review, index) => (
            <motion.button
              key={review.name}
              type="button"
              onClick={() => scrollTo(index)}
              className={cn(
                "h-1.5 transition-[width,background-color] duration-200",
                index === activeIndex ? "w-10 bg-white" : "w-4 bg-white/35",
              )}
              layout
              whileTap={reduceMotion ? undefined : { scale: 0.85 }}
              aria-label={`Показать отзыв ${index + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
