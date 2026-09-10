"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";

const passes = [
  { title: "Разовое", price: 300, text: "Один визит в тренажёрный зал" },
  {
    title: "8 занятий",
    price: 1800,
    text: "Абонемент на восемь посещений",
    featured: true,
  },
  { title: "Месяц", price: 2000, text: "Безлимит в течение 30 дней" },
];

const tabs = [
  {
    id: "all",
    label: "Все услуги",
    rows: [
      ["Игровой зал, аренда часа", 2000],
      ["Игровой зал, детские группы", 1200],
      ["Тренажёрный зал, разовое", 300],
      ["Тренажёрный зал, 8 занятий", 1800],
      ["Тренажёрный зал, месяц", 2000],
      ["Настольный теннис, стол/час", 300],
      ["Настольный теннис, 10 часов", 2400],
      ["Сауна, час", 1000],
      ["Занятие с инструктором", 900],
    ],
  },
  {
    id: "court",
    label: "Игровой зал",
    rows: [
      ["Игровой зал, аренда часа", 2000],
      ["Игровой зал, детские группы", 1200],
    ],
  },
  {
    id: "gym",
    label: "Тренажёрный",
    rows: [
      ["Тренажёрный зал, разовое", 300],
      ["Тренажёрный зал, 8 занятий", 1800],
      ["Тренажёрный зал, месяц", 2000],
      ["Занятие с инструктором", 900],
    ],
  },
  {
    id: "tennis",
    label: "Теннис",
    rows: [
      ["Настольный теннис, стол/час", 300],
      ["Настольный теннис, 10 часов", 2400],
    ],
  },
  {
    id: "sauna",
    label: "Сауна",
    rows: [["Сауна, час", 1000]],
  },
] as const;

export function Pricing() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("all");
  const current = tabs.find((item) => item.id === tab)!;

  return (
    <section id="pricing" className="scroll-mt-24 bg-paper py-16 sm:py-24">
      <Container>
        <h2 className="h2 mb-10">Цены</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {passes.map((pass) => (
            <article
              key={pass.title}
              className={cn(
                "relative flex flex-col bg-surface p-8",
                pass.featured ? "border-2 border-red" : "border border-line",
              )}
            >
              {pass.featured ? (
                <p className="mb-4 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-red">
                  Чаще всего выбирают
                </p>
              ) : (
                <p className="mb-4 h-[14px]" aria-hidden />
              )}
              <h3 className="h3">{pass.title}</h3>
              <p className="price-xl mt-4 font-display font-bold leading-none">
                {formatPrice(pass.price)}
              </p>
              <p className="mt-3 text-[14px] text-muted">{pass.text}</p>
              <Button href="#schedule" className="mt-8 self-start">
                Забронировать
              </Button>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-px bg-line">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cn(
                "px-4 py-3 font-display text-[12px] font-semibold uppercase tracking-[0.06em]",
                tab === item.id ? "bg-red text-white" : "bg-paper hover:bg-surface",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-line text-left">
              <th className="py-4 font-display text-[12px] font-semibold uppercase tracking-[0.08em]">
                Услуга
              </th>
              <th className="py-4 text-right font-display text-[12px] font-semibold uppercase tracking-[0.08em]">
                Цена
              </th>
            </tr>
          </thead>
          <tbody>
            {current.rows.map(([name, price]) => (
              <tr key={name} className="border-b border-line">
                <td className="py-4 pr-4 text-[15px]">{name}</td>
                <td className="py-4 text-right font-medium tabular-nums">
                  {formatPrice(price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-6 text-[13px] text-muted">
          Тарифы утверждены приказом учреждения. Актуальный прейскурант —{" "}
          <a href="#faq" className="underline underline-offset-2">
            по ссылке
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
