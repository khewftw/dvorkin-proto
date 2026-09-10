"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";

const serviceLinks = [
  { href: "#services", label: "Игровой зал" },
  { href: "#services", label: "Тренажёрный зал" },
  { href: "#services", label: "Настольный теннис" },
  { href: "#services", label: "Сауна" },
];

const infoLinks = [
  { href: "#schedule", label: "Расписание" },
  { href: "#pricing", label: "Цены" },
  { href: "#faq", label: "Вопросы" },
  { href: "#faq", label: "Правила посещения" },
];

const orgLinks = [
  { href: "#business", label: "Для организаций" },
  { href: "#contacts", label: "Контакты" },
  { href: "https://сшор-енисей.рф", label: "сшор-енисей.рф", external: true },
  { href: "#", label: "Политика ПДн" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  }

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs text-[14px] text-white/70">
            Новости комплекса, свободные окна и сборы — на почту, без рекламы.
          </p>
          <form onSubmit={onSubmit} className="mt-5 flex">
            <label className="sr-only" htmlFor="footer-email">
              Электронная почта
            </label>
            <input
              id="footer-email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setSent(false);
              }}
              placeholder="Эл. почта"
              className="min-w-0 flex-1 rounded-none border border-white/20 bg-transparent px-3 py-3 text-[14px] text-white outline-none placeholder:text-white/40"
            />
            <Button type="submit" className="shrink-0">
              Ок
            </Button>
          </form>
          {sent ? (
            <p className="mt-2 text-[13px] text-white/70">Заявка принята.</p>
          ) : null}
        </div>
        <FooterCol title="Услуги" links={serviceLinks} />
        <FooterCol title="Информация" links={infoLinks} />
        <FooterCol title="Учреждение" links={orgLinks} />
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-4 py-6 text-[12px] text-white/55 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <p>
            КГАУ ДО «СШОР по волейболу «Енисей» имени Э.А. Носкова». ИНН 0000000000,
            ОГРН 0000000000000
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <a href="https://сшор-енисей.рф" className="hover:text-white">
              сшор-енисей.рф
            </a>
            <a href="#" className="hover:text-white">
              Политика обработки персональных данных
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string; external?: boolean }[];
}) {
  return (
    <div>
      <h3 className="text-[18px] text-white">{title}</h3>
      <ul className="mt-5 flex flex-col gap-2 text-[14px] text-white/75">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
