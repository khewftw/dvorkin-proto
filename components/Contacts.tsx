"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/Button";

export function Contacts() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setStatus("sending");
    const form = new FormData(formElement);
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        phone: form.get("phone"),
        comment: form.get("comment"),
        tariff: "Форма обратной связи — контакты",
      }),
    }).catch(() => null);

    if (response?.ok) {
      formElement.reset();
      setStatus("sent");
    } else {
      setStatus("error");
    }
  }

  return (
    <section id="contacts" className="scroll-mt-24 bg-ink">
      <div className="relative lg:min-h-[780px]">
        <div className="contacts-panel relative z-10 flex items-center bg-ink px-4 py-16 text-white sm:px-6 sm:py-20 lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2 lg:bg-ink/92 lg:py-24">
          <div className="w-full max-w-[620px] lg:ml-auto">
            <h2
              className="font-script text-[clamp(38px,6vw,68px)] font-bold italic leading-none text-white"
              data-reveal
            >
              Контакты <span className="text-red">и как нас найти</span>
            </h2>

            <div
              className="mt-8 grid gap-5 border-y border-white/15 py-6 sm:grid-cols-2"
              data-reveal
            >
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/45">
                  Адрес
                </p>
                <p className="mt-1.5 text-[17px]">
                  Красноярск, остров Отдыха, 15
                </p>
              </div>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/45">
                  Телефон
                </p>
                <a
                  href="tel:+73912369333"
                  className="mt-1.5 block text-[17px] font-semibold hover:text-red"
                >
                  +7 (391) 236-93-33
                </a>
              </div>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/45">
                  Режим работы
                </p>
                <p className="mt-1.5 text-[17px]">Ежедневно 9:00–21:00</p>
              </div>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/45">
                  Учреждение
                </p>
                <p className="mt-1.5 text-[14px] leading-[1.45]">
                  КГАУ ДО «СШОР по волейболу „Енисей“ имени Э.А. Носкова»
                </p>
              </div>
            </div>

            <form onSubmit={onSubmit} className="mt-8" data-reveal>
              <h3 className="font-display text-[30px] uppercase leading-none text-white">
                Заказать обратный звонок
              </h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <label>
                  <span className="sr-only">Ваше имя</span>
                  <input
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Ваше имя"
                    className="h-14 w-full border border-line bg-paper px-4 text-[16px] outline-none placeholder:text-muted focus:border-red"
                  />
                </label>
                <label>
                  <span className="sr-only">Телефон</span>
                  <input
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="+7"
                    className="h-14 w-full border border-line bg-paper px-4 text-[16px] outline-none placeholder:text-muted focus:border-red"
                  />
                </label>
              </div>
              <label className="mt-3 block">
                <span className="sr-only">Комментарий</span>
                <textarea
                  name="comment"
                  rows={3}
                  placeholder="Какая услуга вас интересует?"
                  className="w-full resize-none border border-line bg-paper px-4 py-3 text-[16px] outline-none placeholder:text-muted focus:border-red"
                />
              </label>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Отправляем…" : "Перезвоните мне"}
                </Button>
                {status === "sent" ? (
                  <p className="text-[14px] font-medium text-red">
                    Заявка отправлена. Мы свяжемся с вами.
                  </p>
                ) : null}
                {status === "error" ? (
                  <p className="text-[14px] text-red">
                    Не удалось отправить. Позвоните нам напрямую.
                  </p>
                ) : null}
              </div>
              <p className="mt-3 text-[12px] leading-[1.45] text-white/45">
                Нажимая кнопку, вы соглашаетесь на обработку персональных
                данных.
              </p>
            </form>
          </div>
        </div>

        <div
          className="relative z-0 h-[460px] lg:absolute lg:inset-0 lg:h-auto"
          data-reveal
        >
          <iframe
            title="Дом спорта имени М. Дворкина на Яндекс Картах"
            src="https://yandex.ru/map-widget/v1/?ll=92.883206%2C55.996612&z=16&pt=92.883206%2C55.996612%2Cpm2blm"
            width="100%"
            height="100%"
            loading="lazy"
            className="block h-full min-h-[460px] w-full border-0 lg:min-h-[780px]"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
