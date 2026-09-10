"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";

const nav = [
  { href: "/#services", label: "Услуги" },
  { href: "/#schedule", label: "Расписание" },
  { href: "/#gallery", label: "Галерея" },
  { href: "/#news", label: "Новости" },
  { href: "/#pricing", label: "Цены" },
  { href: "/#faq", label: "Вопросы" },
  { href: "/#contacts", label: "Контакты" },
];

export function Header() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-ink text-white">
        <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between gap-3 px-4 sm:h-[88px] sm:px-6">
          <div className="flex shrink-0 items-center">
            <Logo />
            <div className="ml-4 hidden items-center gap-4 lg:flex">
              <span className="h-12 w-px bg-white/35" aria-hidden />
              <p className="text-[10px] font-medium leading-[1.2] tracking-[0.04em] text-white/65">
                Дом спорта имени
                <br />
                Михаила Дворкина
                <br />
                г. Красноярск,
                <br />
                остров Отдыха
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-4 sm:gap-7">
            <div className="hidden text-center sm:block">
              <a
                href="tel:+73912369333"
                className="mt-1 block text-[24px] font-semibold leading-none hover:text-red"
              >
                +7 (391) 236-93-33
              </a>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/60">
                Сейчас работаем · до 21:00
              </p>
            </div>
            <Button
              href="/#schedule"
              size="sm"
            >
              <span className="sm:hidden">Записаться</span>
              <span className="hidden sm:inline">Записаться на тренировку</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-red text-white">
        <div className="mx-auto flex h-10 max-w-[1280px] items-center px-4 sm:px-6">
          <button
            type="button"
            className="flex h-10 shrink-0 items-center gap-2 font-sans text-[16px] font-medium lg:hidden"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              {open ? (
                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.5" />
              ) : (
                <>
                  <path d="M4 7h16" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M4 12h16" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M4 17h16" stroke="currentColor" strokeWidth="1.5" />
                </>
              )}
            </svg>
            <span>Меню</span>
          </button>
          <nav className="hidden h-full w-full items-center justify-between gap-3 lg:flex xl:gap-7" aria-label="Основное меню">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex h-full items-center font-sans text-[16px] font-medium hover:text-white/75"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col bg-ink text-white lg:hidden"
          initial={reduceMotion ? false : { opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 32 }}
        >
          <div className="flex h-16 items-center justify-between px-4">
            <Logo />
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center"
              aria-label="Закрыть меню"
              onClick={() => setOpen(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-3 overflow-y-auto px-6 py-4" aria-label="Мобильное меню">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-display text-[clamp(28px,9vw,42px)] uppercase leading-none"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-3 border-t border-white/15 px-6 py-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white/60">
              Ежедневно с 9:00 до 21:00
            </p>
            <a href="tel:+73912369333" className="text-lg font-medium">
              +7 (391) 236-93-33
            </a>
            <p className="text-white/70">остров Отдыха, 15</p>
            <Button href="/#schedule" onClick={() => setOpen(false)}>
              Записаться на тренировку
            </Button>
          </div>
        </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
