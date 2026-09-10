"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/Container";

const questions = [
  {
    id: "booking",
    q: "Как забронировать зал или тренировку?",
    a: "Выберите услугу и свободное время в расписании, затем оставьте заявку. Администратор перезвонит, подтвердит слот и расскажет, как оплатить посещение.",
  },
  {
    id: "address",
    q: "Где находится Дом спорта?",
    a: "Мы находимся в Красноярске по адресу: остров Отдыха, 15. Вход в комплекс отмечен на Яндекс Картах в блоке контактов ниже.",
  },
  {
    id: "transport",
    q: "Как добраться из центра Красноярска?",
    a: "Удобнее всего ехать в сторону острова Отдыха и Центрального стадиона. Постройте маршрут в Яндекс Картах с учётом текущих перекрытий и дорожной обстановки.",
  },
  {
    id: "parking",
    q: "Есть ли рядом парковка?",
    a: "Рядом с комплексом есть парковочные места. В дни соревнований и крупных мероприятий они заполняются быстрее, поэтому рекомендуем приезжать заранее.",
  },
  {
    id: "hours",
    q: "В какое время работает комплекс?",
    a: "Комплекс работает ежедневно. Основной режим — с 9:00 до 21:00, отдельные услуги тренажёрного зала доступны по расширенному расписанию. Точное время подтвердит администратор.",
  },
  {
    id: "payment",
    q: "Как можно оплатить услуги?",
    a: "Оплата доступна на месте. Для организаций возможен безналичный расчёт по счёту. Способ и срок оплаты конкретной брони уточняются при подтверждении заявки.",
  },
  {
    id: "cancel",
    q: "Можно перенести или отменить бронь?",
    a: "Да, сообщите об изменении планов по телефону +7 (391) 236-93-33 как можно раньше. Возможность переноса зависит от свободных слотов.",
  },
  {
    id: "equipment",
    q: "Можно прийти со своим инвентарём?",
    a: "Да, можно использовать личные ракетки, мячи и другой подходящий инвентарь. Прокат доступного оборудования оплачивается отдельно по действующему прейскуранту.",
  },
  {
    id: "clothes",
    q: "Что взять с собой на тренировку?",
    a: "Возьмите спортивную форму, чистую сменную обувь, полотенце и воду. Для занятий с инструктором заранее сообщите об ограничениях по здоровью.",
  },
  {
    id: "doctor",
    q: "Нужна ли справка от врача?",
    a: "Требования зависят от формата занятий, возраста и выбранной программы. Для детских групп и регулярных тренировок медицинский допуск может потребоваться — уточните это при записи.",
  },
  {
    id: "children",
    q: "Можно ли записать ребёнка?",
    a: "Возраст, наличие мест и формат детских занятий уточняются у администратора. В заявке укажите возраст ребёнка и интересующее направление.",
  },
  {
    id: "trainer",
    q: "Есть ли занятия с инструктором?",
    a: "Да, в прейскуранте предусмотрены занятия с инструктором по волейболу и настольному теннису. Свободное время и состав группы согласуются заранее.",
  },
  {
    id: "team",
    q: "Можно арендовать игровой зал всей командой?",
    a: "Да. Игровой зал подходит для тренировок, любительских игр и соревнований. В заявке укажите вид спорта, число участников и желаемую продолжительность.",
  },
  {
    id: "tennis",
    q: "Сколько человек может играть в настольный теннис?",
    a: "Стоимость самостоятельного занятия указана за одного человека. Если планируете играть вдвоём или группой, сообщите количество участников администратору.",
  },
  {
    id: "recovery",
    q: "На сколько человек рассчитан восстановительный центр?",
    a: "Базовый тариф рассчитан на группу до 6 человек. Для групп от 7 до 10 человек действует доплата за каждого дополнительного посетителя.",
  },
  {
    id: "accessibility",
    q: "Зал доступен для маломобильных посетителей?",
    a: "Комплекс принимает маломобильных посетителей. Если потребуется сопровождение или дополнительная помощь, укажите это в заявке, чтобы сотрудники подготовились к вашему приезду.",
  },
  {
    id: "locker",
    q: "Есть ли раздевалки и душевые?",
    a: "Да, в комплексе есть раздевалки и душевые. Возьмите личные средства гигиены, сменную обувь и полотенце.",
  },
  {
    id: "organizations",
    q: "Работаете ли вы с организациями?",
    a: "Да, возможна аренда площадок и дополнительные услуги для организаций. Оставьте заявку с реквизитами и описанием мероприятия — администратор уточнит расчёт.",
  },
  {
    id: "subscription",
    q: "Сколько действует абонемент?",
    a: "Абонементы на 8 и 12 самостоятельных занятий рассчитаны на посещения в течение месяца. Каждое занятие длится один час.",
  },
];

export function Faq() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState<Set<string>>(
    () => new Set([questions[0].id]),
  );

  function toggle(id: string) {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <section id="faq" className="scroll-mt-24 bg-paper py-16 sm:py-24">
      <Container>
        <h2
          className="font-script mb-9 text-[clamp(34px,5vw,56px)] font-bold italic leading-none"
          data-reveal
        >
          Вопросы <span className="text-red">и ответы</span>
        </h2>
        <div className="grid gap-x-10 lg:grid-cols-2" data-reveal>
          {[0, 1].map((column) => (
            <div key={column}>
              {questions
                .filter((_, index) => index % 2 === column)
                .map((item) => {
                  const isOpen = open.has(item.id);
                  return (
                    <motion.article
                      key={item.id}
                      className="border-b border-line"
                      layout="position"
                    >
                      <motion.button
                        type="button"
                        className="flex w-full items-start justify-between gap-5 py-5 text-left"
                        onClick={() => toggle(item.id)}
                        aria-expanded={isOpen}
                        aria-controls={`answer-${item.id}`}
                        whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                      >
                        <span className="font-display text-[clamp(20px,2.2vw,27px)] font-semibold uppercase leading-[1.05]">
                          {item.q}
                        </span>
                        <span
                          className="mt-0.5 flex size-8 shrink-0 items-center justify-center border border-line font-display text-[22px] leading-none text-red transition-transform duration-300"
                          aria-hidden
                        >
                          {isOpen ? "−" : "+"}
                        </span>
                      </motion.button>
                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.div
                            id={`answer-${item.id}`}
                            className="overflow-hidden"
                            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={
                              reduceMotion
                                ? undefined
                                : { height: 0, opacity: 0 }
                            }
                            transition={{ duration: reduceMotion ? 0 : 0.3 }}
                          >
                          <p className="max-w-[58ch] pb-5 pr-10 text-[15px] leading-[1.65] text-muted sm:text-[16px]">
                            {item.a}
                          </p>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </motion.article>
                  );
                })}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
