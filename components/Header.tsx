"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/cn";

const nav = [
  { href: "#services", label: "Услуги" },
  { href: "#schedule", label: "Расписание" },
  { href: "#pricing", label: "Цены" },
  { href: "#business", label: "Для организаций" },
  { href: "#contacts", label: "Контакты" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          "overflow-hidden bg-ink text-white transition-[max-height] duration-300",
          scrolled ? "max-h-0" : "max-h-24",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-4 sm:h-24 sm:px-6">
          <Logo />
          <div className="hidden items-center gap-6 lg:flex">
            <a
              href="tel:+73912668610"
              className="text-[13px] font-medium tracking-wide"
            >
              +7 (391) 266-86-10
            </a>
            <span className="text-[13px] text-white/70">остров Отдыха, 15</span>
            <Button href="#schedule" size="lg">
              Забронировать
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-red text-white">
        <div className="mx-auto flex h-12 max-w-[1280px] items-center gap-3 px-4 sm:h-14 sm:px-6">
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center lg:hidden"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Меню</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
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
          </button>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Основное меню">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-sans text-[16px] font-medium hover:text-white/80"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#schedule" className="header-week lg:hidden">
            Расписание →
          </a>
          <a href="#schedule" className="header-week hidden lg:inline">
            Расписание на неделю →
          </a>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[60] flex flex-col bg-ink text-white lg:hidden">
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
          <nav className="flex flex-1 flex-col justify-center gap-6 px-6" aria-label="Мобильное меню">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="h2 font-bold leading-[0.95]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-4 px-6 pb-10">
            <a href="tel:+73912668610" className="text-lg font-medium">
              +7 (391) 266-86-10
            </a>
            <p className="text-white/70">остров Отдыха, 15</p>
            <Button href="#schedule" onClick={() => setOpen(false)}>
              Забронировать
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
