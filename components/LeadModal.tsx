"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/Button";

type LeadModalProps = {
  tariff: string;
  details?: string;
  onClose: () => void;
};

export function LeadModal({ tariff, details, onClose }: LeadModalProps) {
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        phone: form.get("phone"),
        comment: form.get("comment"),
        tariff: details ? `${tariff}. ${details}` : tariff,
      }),
    }).catch(() => null);

    setStatus(response?.ok ? "sent" : "error");
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
      className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/90 p-4"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0 }}
      transition={{ duration: 0.2 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        className="relative max-h-[calc(100svh-2rem)] w-full max-w-[560px] overflow-y-auto bg-paper p-6 text-text sm:p-9"
        initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: 16, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex size-10 items-center justify-center border border-line text-[25px] hover:border-red hover:text-red"
          aria-label="Закрыть форму"
        >
          ×
        </button>

        {status === "sent" ? (
          <div className="py-10 text-center">
            <p className="font-display text-[clamp(34px,6vw,54px)] uppercase leading-none">
              Заявка отправлена
            </p>
            <p className="mx-auto mt-4 max-w-[38ch] text-[16px] text-muted">
              Администратор свяжется с вами и уточнит детали.
            </p>
            <Button type="button" onClick={onClose} className="mt-8">
              Закрыть
            </Button>
          </div>
        ) : (
          <>
            <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-red">
              Заявка на услугу
            </p>
            <h2
              id="lead-modal-title"
              className="mt-3 pr-10 font-display text-[clamp(34px,6vw,54px)] uppercase leading-none"
            >
              {tariff}
            </h2>
            <p className="mt-4 text-[15px] text-muted">
              Оставьте номер — администратор перезвонит и подтвердит стоимость
              и время.
            </p>
            {details ? (
              <p className="mt-4 border-l-2 border-red pl-4 text-[14px] leading-[1.5]">
                {details}
              </p>
            ) : null}

            <form onSubmit={onSubmit} className="mt-7 space-y-4">
              <label className="block">
                <span className="mb-2 block text-[14px] font-medium">Имя</span>
                <input
                  name="name"
                  required
                  autoComplete="name"
                  className="h-14 w-full border border-line bg-surface px-4 text-[17px] outline-none focus:border-red"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-[14px] font-medium">
                  Телефон
                </span>
                <input
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="+7"
                  className="h-14 w-full border border-line bg-surface px-4 text-[17px] outline-none placeholder:text-muted focus:border-red"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-[14px] font-medium">
                  Комментарий
                </span>
                <textarea
                  name="comment"
                  rows={3}
                  className="w-full resize-none border border-line bg-surface px-4 py-3 text-[16px] outline-none focus:border-red"
                />
              </label>

              {status === "error" ? (
                <p className="text-[14px] text-red">
                  Не удалось отправить заявку. Позвоните нам по номеру +7 (391)
                  236-93-33.
                </p>
              ) : null}

              <Button
                type="submit"
                disabled={status === "sending"}
                className="w-full disabled:opacity-60"
              >
                {status === "sending" ? "Отправляем…" : "Отправить заявку"}
              </Button>
              <p className="text-[12px] leading-[1.45] text-muted">
                Нажимая кнопку, вы соглашаетесь на обработку персональных
                данных.
              </p>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
