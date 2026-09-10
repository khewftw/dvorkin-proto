"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { LeadModal } from "@/components/LeadModal";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";

const passes = [
  {
    title: "Разовое",
    price: 200,
    pricePrefix: "от",
    text: "Разовое самостоятельное занятие в тренажёрном зале",
    label: "Попробовать",
    features: [
      "Продолжительность — 2 часа",
      "С 07:30 до 16:00 — 200 ₽",
      "С 16:00 до 22:00 — 230 ₽",
    ],
  },
  {
    title: "8 занятий",
    price: 1600,
    text: "Абонемент на самостоятельные занятия в течение месяца",
    label: "Выгодный старт",
    features: [
      "8 посещений тренажёрного зала",
      "Продолжительность занятия — 1 час",
      "Срок действия — 30 дней",
    ],
    featured: true,
  },
  {
    title: "12 занятий",
    price: 2400,
    text: "Расширенный абонемент на самостоятельные занятия",
    label: "Больше тренировок",
    features: [
      "12 посещений тренажёрного зала",
      "Продолжительность занятия — 1 час",
      "Срок действия — 30 дней",
    ],
  },
];

type PriceRow = {
  name: string;
  unit: string;
  price: string;
};

const courtRows: PriceRow[] = [
  {
    name: "Подготовка спортивного зала с оборудованием для физкультурных и спортивных мероприятий",
    unit: "1 час",
    price: "5 000 ₽",
  },
  {
    name: "Тренировочное занятие по волейболу с инструктором, группа от 8 до 18 человек",
    unit: "1 час",
    price: "800 ₽",
  },
  {
    name: "Абонемент на занятия по волейболу с инструктором, группа от 8 до 18 человек",
    unit: "8 занятий",
    price: "5 600 ₽",
  },
  {
    name: "Прокат волейбольного мяча",
    unit: "1 час",
    price: "95 ₽",
  },
  {
    name: "Услуги спортивного судьи при проведении соревнований по волейболу",
    unit: "1 матч",
    price: "885 ₽",
  },
];

const gymRows: PriceRow[] = [
  {
    name: "Разовое тренировочное занятие с 07:30 до 16:00",
    unit: "2 часа / 1 человек",
    price: "200 ₽",
  },
  {
    name: "Разовое тренировочное занятие с 16:00 до 22:00",
    unit: "2 часа / 1 человек",
    price: "230 ₽",
  },
  {
    name: "Абонемент на самостоятельные занятия в течение месяца",
    unit: "8 занятий по 1 часу",
    price: "1 600 ₽",
  },
  {
    name: "Абонемент на самостоятельные занятия в течение месяца",
    unit: "12 занятий по 1 часу",
    price: "2 400 ₽",
  },
];

const tennisRows: PriceRow[] = [
  {
    name: "Самостоятельное занятие настольным теннисом",
    unit: "1 час / 1 человек",
    price: "115 ₽",
  },
  {
    name: "Прокат двух ракеток и двух мячей",
    unit: "1 час",
    price: "95 ₽",
  },
  {
    name: "Тренировочное занятие с инструктором",
    unit: "1 час",
    price: "250 ₽",
  },
  {
    name: "Абонемент на занятия с инструктором",
    unit: "8 / 12 занятий",
    price: "1 600 / 2 050 ₽",
  },
];

const recoveryRows: PriceRow[] = [
  {
    name: "Восстановительно-оздоровительное мероприятие, не более 6 человек",
    unit: "1 час",
    price: "1 200 ₽",
  },
  {
    name: "Восстановительно-оздоровительное мероприятие, от 7 до 10 человек",
    unit: "1 час",
    price: "1 200 ₽ + 200 ₽ за человека",
  },
  {
    name: "Прокат простыни",
    unit: "1 час",
    price: "50 ₽",
  },
  {
    name: "Прокат полотенца",
    unit: "1 час",
    price: "50 ₽",
  },
];

const otherRows: PriceRow[] = [
  {
    name: "Автобус Mercedes-Benz с водителем, до 19 мест",
    unit: "город / межгород / ожидание / аэропорт",
    price: "1 800 ₽/ч · 95 ₽/км · 800 ₽/ч · 5 500 ₽",
  },
  {
    name: "Автобус Toyota Hiace с водителем, до 11 мест",
    unit: "город / межгород / ожидание / аэропорт",
    price: "1 500 ₽/ч · 55 ₽/км · 700 ₽/ч · 3 600 ₽",
  },
  {
    name: "Звуковое сопровождение физкультурно-спортивных мероприятий",
    unit: "1 час",
    price: "500 ₽",
  },
  {
    name: "Организация точки питания с предоставлением оборудования",
    unit: "1 час",
    price: "550 ₽",
  },
  {
    name: "Подготовка помещения для зрелищно-развлекательного мероприятия",
    unit: "1 час",
    price: "550 ₽",
  },
  {
    name: "Организация точки продажи во время мероприятия",
    unit: "1 час",
    price: "300 ₽",
  },
];

const tabs = [
  {
    id: "all",
    label: "Все услуги",
    rows: [
      ...courtRows,
      ...gymRows,
      ...tennisRows,
      ...recoveryRows,
      ...otherRows,
    ],
  },
  {
    id: "court",
    label: "Игровой зал",
    rows: courtRows,
  },
  {
    id: "gym",
    label: "Тренажёрный",
    rows: gymRows,
  },
  {
    id: "tennis",
    label: "Теннис",
    rows: tennisRows,
  },
  {
    id: "recovery",
    label: "Восстановление",
    rows: recoveryRows,
  },
  {
    id: "other",
    label: "Прочие",
    rows: otherRows,
  },
] as const;

export function Pricing() {
  const reduceMotion = useReducedMotion();
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("all");
  const [leadTariff, setLeadTariff] = useState<string | null>(null);
  const current = tabs.find((item) => item.id === tab)!;

  return (
    <section id="pricing" className="scroll-mt-24 bg-paper py-16 sm:py-24">
      <Container>
        <h2
          className="font-script mb-10 text-[clamp(38px,6vw,68px)] font-bold italic leading-none"
          data-reveal
        >
          Цены <span className="text-red">и абонементы</span>
        </h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3" data-stagger>
          {passes.map((pass) => (
            <motion.article
              key={pass.title}
              className={cn(
                "relative flex flex-col overflow-hidden border p-7 text-white sm:p-8",
                pass.featured
                  ? "z-10 border-red bg-red shadow-[0_0_42px_rgba(43,103,243,0.55)]"
                  : "border-panel bg-panel",
              )}
              data-stagger-item
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -10,
                      scale: pass.featured ? 1.012 : 1.008,
                      boxShadow: pass.featured
                        ? "0 0 64px rgba(43,103,243,0.72)"
                        : "0 18px 38px rgba(19,25,33,0.2)",
                    }
              }
              transition={{ type: "spring", stiffness: 280, damping: 23 }}
            >
              <p
                className={cn(
                  "text-[13px] font-semibold uppercase tracking-[0.1em]",
                  pass.featured ? "text-white/70" : "text-white/45",
                )}
              >
                {pass.featured ? "Чаще всего выбирают" : pass.label}
              </p>
              <h3 className="font-script mt-8 text-[clamp(36px,4vw,52px)] font-bold leading-none">
                {pass.title}
              </h3>
              <p className="mt-4 font-display text-[clamp(52px,6vw,72px)] font-bold leading-none tracking-[-0.02em]">
                {"pricePrefix" in pass ? `${pass.pricePrefix} ` : ""}
                {formatPrice(pass.price)}
              </p>
              <p
                className={cn(
                  "mt-4 max-w-[34ch] text-[16px] leading-[1.55]",
                  pass.featured ? "text-white/80" : "text-white/60",
                )}
              >
                {pass.text}
              </p>
              <ul className="mt-6 space-y-3 border-t border-white/15 pt-6">
                {pass.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 text-[15px] leading-[1.4] text-white/85"
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex size-5 shrink-0 items-center justify-center text-[13px] font-bold",
                        pass.featured
                          ? "bg-white text-red"
                          : "bg-red text-white",
                      )}
                      aria-hidden
                    >
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                type="button"
                onClick={() =>
                  setLeadTariff(`Тренажёрный зал — ${pass.title}`)
                }
                variant={pass.featured ? "invertedGlow" : "glow"}
                className="mt-8 w-full sm:self-start"
              >
                Оставить заявку
              </Button>
            </motion.article>
          ))}
        </div>

        <div
          className="mt-14 grid grid-cols-2 gap-px border border-b-0 border-line bg-line md:grid-cols-3 lg:grid-cols-6"
          data-reveal
        >
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cn(
                "min-h-[62px] px-4 py-3 font-display text-[18px] font-semibold uppercase leading-none tracking-[0.02em] transition-colors",
                tab === item.id
                  ? "bg-red text-white"
                  : "bg-surface text-text hover:bg-line",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="overflow-hidden border border-line" data-reveal>
          <table className="w-full border-collapse">
            <thead className="bg-surface">
              <tr className="border-b border-line text-left">
                <th className="px-5 py-5 font-display text-[16px] font-semibold uppercase tracking-[0.06em] sm:px-7">
                  Услуга
                </th>
                <th className="hidden px-5 py-5 font-display text-[16px] font-semibold uppercase tracking-[0.06em] sm:table-cell sm:px-7">
                  Единица
                </th>
                <th className="px-5 py-5 text-right font-display text-[16px] font-semibold uppercase tracking-[0.06em] sm:px-7">
                  Цена
                </th>
              </tr>
            </thead>
            <tbody>
              {current.rows.map((row) => (
                <tr
                  key={`${row.name}-${row.unit}`}
                  className="border-b border-line last:border-b-0"
                >
                  <td className="px-5 py-5 pr-4 text-[17px] sm:px-7 sm:text-[18px]">
                    {row.name}
                    <span className="mt-1 block text-[13px] text-muted sm:hidden">
                      {row.unit}
                    </span>
                  </td>
                  <td className="hidden px-5 py-5 text-[15px] text-muted sm:table-cell sm:px-7">
                    {row.unit}
                  </td>
                  <td className="max-w-[260px] px-5 py-5 text-right font-display text-[20px] font-medium tabular-nums sm:px-7 sm:text-[23px]">
                    {row.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-[15px] text-muted">
          Тарифы утверждены приказом учреждения. Актуальный прейскурант можно
          уточнить у администратора.
        </p>

        <div
          className="mt-10 flex flex-col justify-between gap-7 bg-ink p-7 text-white sm:p-9 lg:flex-row lg:items-center"
          data-reveal
        >
          <div>
            <h3 className="font-display text-[clamp(30px,4vw,48px)] uppercase leading-none">
              НЕ НАШЛИ ТО, ЧТО ИСКАЛИ? <br />СВЯЖИТЕСЬ С НАМИ!
            </h3>
            <p className="mt-3 max-w-[52ch] text-[16px] text-white/60">
              Расскажите, как планируете заниматься — администратор подберёт
              подходящий формат и свободное время.
            </p>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              type="button"
              onClick={() => setLeadTariff("Помощь с выбором тарифа")}
              className="w-full"
            >
              Перезвоните мне
            </Button>
            <Button href="tel:+73912369333" variant="outline" className="w-full">
              +7 (391) 236-93-33
            </Button>
          </div>
        </div>
      </Container>
      <AnimatePresence>
        {leadTariff ? (
          <LeadModal
            tariff={leadTariff}
            onClose={() => setLeadTariff(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
