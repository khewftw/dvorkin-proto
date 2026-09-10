"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { LeadModal } from "@/components/LeadModal";
import {
  facilities,
  HOURS,
  hourLabel,
  isFacilityId,
  monthName,
  monthStartOffset,
  scheduleDays,
  todayIso,
  type FacilityId,
} from "@/data/schedule";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";

export function Schedule() {
  const searchParams = useSearchParams();
  const requested = searchParams.get("f");
  const initial = isFacilityId(requested) ? requested : "court";
  return <ScheduleBoard key={initial} initial={initial} />;
}

function ScheduleBoard({ initial }: { initial: FacilityId }) {
  const reduceMotion = useReducedMotion();
  const [facility, setFacility] = useState<FacilityId>(initial);
  const [dayIndex, setDayIndex] = useState(() =>
    Math.max(
      0,
      scheduleDays.findIndex((day) => day.iso === todayIso),
    ),
  );
  const [selected, setSelected] = useState<{ day: number; hour: number }[]>([]);
  const [leadOpen, setLeadOpen] = useState(false);

  const current = facilities.find((item) => item.id === facility)!;
  const activeDay = scheduleDays[dayIndex];

  const selectedSorted = useMemo(
    () => [...selected].sort((a, b) => a.day - b.day || a.hour - b.hour),
    [selected],
  );
  const total = selected.length * current.price;
  const month = scheduleDays[0].label.split(" ").at(-1);
  const year = scheduleDays[0].iso.slice(0, 4);
  const bookingDetails = selectedSorted
    .map(
      (slot) =>
        `${scheduleDays[slot.day].label}, ${hourLabel(slot.hour)}`,
    )
    .join("; ");

  function toggleSlot(day: number, hour: number) {
    if (scheduleDays[day].booked[facility].includes(hour)) return;
    setSelected((prev) => {
      const exists = prev.some((slot) => slot.day === day && slot.hour === hour);
      return exists
        ? prev.filter((slot) => slot.day !== day || slot.hour !== hour)
        : [...prev, { day, hour }];
    });
  }

  return (
    <section id="schedule" className="scroll-mt-24 bg-ink py-16 sm:py-24">
      <Container>
        <h2
          className="font-script mb-8 text-[clamp(38px,6vw,68px)] font-bold italic leading-none text-white"
          data-reveal
        >
          Расписание <span className="text-red">и запись</span>
        </h2>
        <div className="grid grid-cols-2 gap-px border border-b-0 border-line bg-line md:grid-cols-4">
          {facilities.map((item) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => {
                setFacility(item.id);
                setSelected([]);
              }}
              className={cn(
                "relative min-h-[62px] overflow-hidden px-4 py-3 font-display text-[20px] font-semibold uppercase leading-none tracking-[0.02em] transition-colors",
                facility === item.id
                  ? "text-white"
                  : "bg-paper text-text hover:bg-surface",
              )}
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
            >
              {facility === item.id ? (
                <motion.span
                  layoutId="active-facility"
                  className="absolute inset-0 bg-red"
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 32,
                    duration: reduceMotion ? 0 : undefined,
                  }}
                />
              ) : null}
              <span className="relative z-10">{item.label}</span>
            </motion.button>
          ))}
        </div>

        <div
          className="grid overflow-hidden border border-line bg-paper text-text lg:grid-cols-2"
          data-reveal
        >
          <div className="border-b border-line p-5 sm:p-7 lg:border-b-0 lg:border-r">
            <div>
              <p className="font-display text-[13px] uppercase tracking-[0.1em] text-muted">
                Выберите дату
              </p>
              <h3 className="mt-2 font-display text-[clamp(30px,4vw,48px)] uppercase leading-none">
                {monthName} {year}
              </h3>
            </div>

            <div className="mt-7 grid grid-cols-7 text-center">
              {["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"].map((weekday) => (
                <span
                  key={weekday}
                  className="pb-3 text-[11px] font-medium tracking-[0.08em] text-muted"
                >
                  {weekday}
                </span>
              ))}
              {Array.from({ length: monthStartOffset }, (_, index) => (
                <span key={`empty-${index}`} aria-hidden />
              ))}
              {scheduleDays.map((day, index) => {
                const isActive = index === dayIndex;
                const isToday = day.iso === todayIso;
                const isPast = day.iso < todayIso;
                return (
                  <motion.button
                    key={day.iso}
                    type="button"
                    aria-pressed={isActive}
                    aria-current={isToday ? "date" : undefined}
                    disabled={isPast}
                    onClick={() => setDayIndex(index)}
                    className={cn(
                      "relative mx-auto flex size-10 items-center justify-center font-display text-[20px] tabular-nums transition-colors",
                      isActive
                        ? "bg-red text-white"
                        : isPast
                          ? "cursor-not-allowed text-muted/35"
                          : "text-text hover:bg-surface",
                      isToday && !isActive ? "border border-red text-text" : "",
                    )}
                    whileHover={
                      reduceMotion || isPast ? undefined : { scale: 1.08 }
                    }
                    whileTap={
                      reduceMotion || isPast ? undefined : { scale: 0.9 }
                    }
                  >
                    {Number(day.iso.slice(8))}
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-7 flex flex-wrap gap-5 text-[12px] text-muted">
              <span className="flex items-center gap-2">
                <i className="size-3 bg-red" /> Выбранный день
              </span>
              <span className="flex items-center gap-2">
                <i className="size-3 border border-red" /> Сегодня
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-7">
            <p className="font-display text-[13px] uppercase tracking-[0.1em] text-muted">
              Свободное время
            </p>
            <h3 className="mt-2 font-display text-[clamp(30px,4vw,48px)] uppercase leading-none">
              {activeDay.label}
            </h3>
            <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {HOURS.map((hour) => {
                const booked = activeDay.booked[facility].includes(hour);
                const isSelected = selected.some(
                  (slot) => slot.day === dayIndex && slot.hour === hour,
                );
                return (
                  <motion.button
                    key={hour}
                    type="button"
                    disabled={booked}
                    aria-pressed={isSelected}
                    onClick={() => toggleSlot(dayIndex, hour)}
                    className={cn(
                      "min-h-[74px] border px-3 py-3 text-left transition-colors",
                      isSelected
                        ? "border-red bg-red text-white"
                        : booked
                          ? "cursor-not-allowed border-line bg-surface text-muted/45"
                          : "border-line bg-transparent text-text hover:border-red hover:bg-surface",
                    )}
                    whileHover={
                      reduceMotion || booked
                        ? undefined
                        : { y: -3, scale: 1.015 }
                    }
                    whileTap={
                      reduceMotion || booked ? undefined : { scale: 0.96 }
                    }
                    transition={{ type: "spring", stiffness: 380, damping: 24 }}
                  >
                    <span className="block font-display text-[25px] leading-none tabular-nums">
                      {hour.toString().padStart(2, "0")}:00
                    </span>
                    <span className="mt-1 block text-[11px] uppercase tracking-[0.08em] opacity-55">
                      {booked ? "Занято" : isSelected ? "Выбрано" : "Свободно"}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border border-t-0 border-red bg-red p-5 text-white sm:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-4">
                <h3 className="font-display text-[24px] uppercase leading-none">
                  Ваш выбор
                </h3>
                {selected.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => setSelected([])}
                    className="text-[13px] text-white/65 underline underline-offset-4 hover:text-white"
                  >
                    Очистить
                  </button>
                ) : null}
              </div>
              {selected.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  <AnimatePresence initial={false}>
                    {selectedSorted.map((slot) => (
                      <motion.button
                        key={`${slot.day}-${slot.hour}`}
                        type="button"
                        onClick={() => toggleSlot(slot.day, slot.hour)}
                        className="border border-white bg-white px-3 py-2 text-left text-[13px] text-text hover:bg-surface"
                        aria-label={`Убрать ${scheduleDays[slot.day].label}, ${hourLabel(slot.hour)}`}
                        initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={reduceMotion ? undefined : { opacity: 0, scale: 0.8 }}
                        layout
                      >
                        <span className="font-medium">
                          {scheduleDays[slot.day].weekdayShort},{" "}
                          {scheduleDays[slot.day].iso.slice(8)}{" "}
                          {month}
                        </span>
                        <span className="ml-2 text-muted">
                          {hourLabel(slot.hour)}
                        </span>
                        <span className="ml-2 text-red" aria-hidden>
                          ×
                        </span>
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <p className="mt-3 text-[14px] text-white/70">
                  Можно выбрать несколько свободных слотов в разные дни.
                </p>
              )}
            </div>

            <div className="flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center">
              <div className="sm:text-right">
                <p className="text-[12px] uppercase tracking-[0.08em] text-white/65">
                  {selected.length > 0
                    ? `${selected.length} сл. × ${formatPrice(current.price)}`
                    : "Итого"}
                </p>
                <p className="mt-1 font-display text-[36px] leading-none">
                  {formatPrice(total)}
                </p>
              </div>
              {selected.length > 0 ? (
                <Button
                  type="button"
                  variant="invertedGlow"
                  className="w-full sm:w-auto"
                  onClick={() => setLeadOpen(true)}
                >
                  Записаться
                </Button>
              ) : (
                <Button disabled variant="inverted" className="w-full opacity-40 sm:w-auto">
                  Записаться
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
      <AnimatePresence>
        {leadOpen ? (
          <LeadModal
            tariff={`Бронирование: ${current.label}`}
            details={bookingDetails}
            onClose={() => setLeadOpen(false)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
