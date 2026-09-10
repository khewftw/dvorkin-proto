"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import {
  facilities,
  HOURS,
  hourLabel,
  isFacilityId,
  week,
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
  const [facility, setFacility] = useState<FacilityId>(initial);
  const [dayIndex, setDayIndex] = useState(0);
  const [selected, setSelected] = useState<{ day: number; hour: number } | null>(
    null,
  );

  const current = facilities.find((item) => item.id === facility)!;
  const activeDay = week[dayIndex];
  const selectedDay = selected ? week[selected.day] : null;
  const selectedBooked = selected
    ? week[selected.day].booked[facility].includes(selected.hour)
    : false;

  const summary = useMemo(() => {
    if (!selected || !selectedDay || selectedBooked) return null;
    return `Выбрано: ${selectedDay.label}, ${hourLabel(selected.hour)} — ${formatPrice(current.price)}`;
  }, [selected, selectedDay, selectedBooked, current.price]);

  function toggleSlot(day: number, hour: number) {
    if (week[day].booked[facility].includes(hour)) return;
    setSelected((prev) =>
      prev && prev.day === day && prev.hour === hour ? null : { day, hour },
    );
  }

  return (
    <section id="schedule" className="scroll-mt-24 bg-paper py-16 sm:py-24">
      <Container>
        <h2 className="h2 mb-8">Расписание</h2>
        <div className="flex flex-wrap gap-px bg-line">
          {facilities.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setFacility(item.id);
                setSelected(null);
              }}
              className={cn(
                "flex-1 px-3 py-3 font-display text-[12px] font-semibold uppercase tracking-[0.06em] sm:text-[13px]",
                facility === item.id
                  ? "bg-red text-white"
                  : "bg-paper text-text hover:bg-surface",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-6 hidden lg:block">
          <div className="grid grid-cols-[72px_repeat(7,minmax(0,1fr))] gap-1">
            <div />
            {week.map((day) => (
              <div
                key={day.iso}
                className="px-1 pb-2 text-center font-display text-[11px] font-semibold uppercase tracking-[0.08em]"
              >
                {day.weekdayShort}
                <div className="mt-1 text-muted">{day.iso.slice(8)}</div>
              </div>
            ))}
            {HOURS.map((hour) => (
              <HourRow
                key={hour}
                hour={hour}
                facility={facility}
                selected={selected}
                onSelect={toggleSlot}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 lg:hidden">
          <div className="mb-4 flex items-center justify-between border border-line">
            <button
              type="button"
              className="px-4 py-3 font-display text-lg"
              aria-label="Предыдущий день"
              onClick={() => setDayIndex((i) => Math.max(0, i - 1))}
              disabled={dayIndex === 0}
            >
              ←
            </button>
            <p className="px-2 text-center font-display text-[13px] font-semibold uppercase tracking-[0.06em]">
              {activeDay.label}
            </p>
            <button
              type="button"
              className="px-4 py-3 font-display text-lg"
              aria-label="Следующий день"
              onClick={() => setDayIndex((i) => Math.min(6, i + 1))}
              disabled={dayIndex === 6}
            >
              →
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {HOURS.map((hour) => {
              const booked = activeDay.booked[facility].includes(hour);
              const isSelected =
                selected?.day === dayIndex && selected.hour === hour;
              return (
                <button
                  key={hour}
                  type="button"
                  disabled={booked}
                  onClick={() => toggleSlot(dayIndex, hour)}
                  className={slotClass(booked, isSelected) + " w-full py-3 text-left px-4"}
                >
                  {hourLabel(hour)}
                  {booked ? " — занято" : ""}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 border border-line bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[14px] sm:text-[15px]">
            {summary ?? "Выберите свободный слот в сетке"}
          </p>
          {summary ? (
            <Button href="tel:+73912668610">Забронировать</Button>
          ) : (
            <Button disabled className="opacity-40">
              Забронировать
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}

function HourRow({
  hour,
  facility,
  selected,
  onSelect,
}: {
  hour: number;
  facility: FacilityId;
  selected: { day: number; hour: number } | null;
  onSelect: (day: number, hour: number) => void;
}) {
  return (
    <>
      <div className="flex items-center font-display text-[11px] font-semibold tabular-nums text-muted">
        {`${hour.toString().padStart(2, "0")}:00`}
      </div>
      {week.map((day, dayIndex) => {
        const booked = day.booked[facility].includes(hour);
        const isSelected = selected?.day === dayIndex && selected.hour === hour;
        return (
          <button
            key={`${day.iso}-${hour}`}
            type="button"
            disabled={booked}
            onClick={() => onSelect(dayIndex, hour)}
            aria-label={`${day.label}, ${hourLabel(hour)}${booked ? ", занято" : ""}`}
            className={slotClass(booked, isSelected)}
          />
        );
      })}
    </>
  );
}

function slotClass(booked: boolean, isSelected: boolean) {
  if (isSelected) return "min-h-10 bg-red text-white";
  if (booked) return "min-h-10 cursor-not-allowed bg-surface text-muted";
  return "min-h-10 border border-line bg-white hover:border-text";
}
