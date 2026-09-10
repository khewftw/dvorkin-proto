"use client";

import { useState } from "react";
import { Container } from "@/components/Container";

const questions = [
  {
    q: "Нужна ли справка от врача?",
    a: "Для разового посещения тренажёрного зала и аренды площадок справка не обязательна. Для абонемента на месяц и детских групп попросите медицинский допуск — его принимают на ресепшен.",
  },
  {
    q: "Есть ли парковка?",
    a: "Да, у комплекса есть открытая парковка. Мест хватает в дневные часы; вечером в дни соревнований лучше закладывать запас времени или приезжать на общественном транспорте.",
  },
  {
    q: "Можно ли приходить со своим инвентарём?",
    a: "Да. Свою форму, кроссовки и ракетки приносить можно. Для настольного тенниса ракетки и мячи выдаём на месте, для игрового зала мячи — по запросу. Сменную обувь просим у всех.",
  },
  {
    q: "Есть ли детские группы?",
    a: "Детские группы в игровом зале — 1 200 ₽ за час. Набор и расписание уточняйте по телефону: группы собираются под возраст и уровень, без «открытого» зала в эти слоты.",
  },
  {
    q: "Есть ли скидки?",
    a: "Скидки для льготных категорий — по положению учреждения, не по устной договорённости. Корпоративные пакеты и сборы считаем отдельно: напишите или позвоните, пришлём условия.",
  },
  {
    q: "Как отменить бронь?",
    a: "Отмена — не позднее чем за 3 часа до начала слота, по телефону +7 (391) 266-86-10. Если не предупредили, час считается использованным. Перенос на другое время — при наличии свободных окон.",
  },
  {
    q: "Зал доступен для маломобильных посетителей?",
    a: "Вход, игровой и тренажёрный залы приспособлены для маломобильных посетителей. Если нужна помощь на месте — предупредите при бронировании, встретим и проводим.",
  },
  {
    q: "Как оплатить?",
    a: "Картой на ресепшен, по QR-коду или наличными. Безналичный расчёт для организаций — по счёту. Онлайн-оплата слота пока не подключена: бронь подтверждаем по телефону.",
  },
];

const docs = [
  { href: "#", label: "Правила посещения" },
  { href: "#", label: "Прейскурант" },
  { href: "#", label: "Положение о платных услугах" },
  { href: "#", label: "Реквизиты" },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 bg-paper py-16 sm:py-24">
      <Container>
        <h2 className="h2 mb-10">Вопросы</h2>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {questions.map((item, index) => {
              const isOpen = open === index;
              return (
                <div key={item.q} className="border-b border-line">
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-4 py-5 text-left"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="h3 min-w-0 font-semibold leading-[1.05]">
                      {item.q}
                    </span>
                    <span className="mt-1 font-display text-xl leading-none text-muted" aria-hidden>
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen ? (
                    <p className="pb-5 pr-8 text-[15px] text-muted">{item.a}</p>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className="lg:col-span-5">
            <div className="border border-line">
              {docs.map((doc) => (
                <a
                  key={doc.label}
                  href={doc.href}
                  className="flex items-center justify-between border-b border-line px-5 py-5 last:border-b-0 hover:bg-surface"
                >
                  <span className="font-display text-[14px] font-semibold uppercase tracking-[0.06em]">
                    {doc.label}
                  </span>
                  <span aria-hidden>→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
