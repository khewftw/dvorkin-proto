export type FacilityId = "court" | "gym" | "tennis" | "sauna";

export type Facility = {
  id: FacilityId;
  label: string;
  price: number;
};

export const facilities: Facility[] = [
  { id: "court", label: "Игровой зал", price: 2000 },
  { id: "gym", label: "Тренажёрный", price: 300 },
  { id: "tennis", label: "Настольный теннис", price: 300 },
  { id: "sauna", label: "Сауна", price: 1000 },
];

export const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] as const;

const WEEKDAYS = [
  "воскресенье",
  "понедельник",
  "вторник",
  "среда",
  "четверг",
  "пятница",
  "суббота",
];

const WEEKDAY_SHORT = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

const MONTHS = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export type ScheduleDay = {
  iso: string;
  weekday: string;
  weekdayShort: string;
  label: string;
  booked: Record<FacilityId, number[]>;
};

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function toIso(date: Date) {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

function isBooked(facility: FacilityId, dayIndex: number, hour: number) {
  if (facility === "court" && hour >= 17 && hour <= 19 && dayIndex < 5) return true;
  if (facility === "gym" && (hour === 12 || hour === 13) && dayIndex % 2 === 0) return true;
  if (facility === "tennis" && hour === 18 && dayIndex !== 6) return true;
  if (facility === "sauna" && (hour === 10 || hour === 20) && dayIndex % 3 === 0) return true;
  return (dayIndex * 13 + hour + facility.length) % 7 === 0;
}

export function buildWeek(fromUtc = Date.UTC(2026, 8, 10)): ScheduleDay[] {
  return Array.from({ length: 7 }, (_, dayIndex) => {
    const date = new Date(fromUtc + dayIndex * 86_400_000);
    const weekday = WEEKDAYS[date.getUTCDay()];
    const booked = Object.fromEntries(
      facilities.map((f) => [
        f.id,
        HOURS.filter((hour) => isBooked(f.id, dayIndex, hour)),
      ]),
    ) as Record<FacilityId, number[]>;

    return {
      iso: toIso(date),
      weekday,
      weekdayShort: WEEKDAY_SHORT[date.getUTCDay()],
      label: `${weekday}, ${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]}`,
      booked,
    };
  });
}

export function isFacilityId(value: string | null): value is FacilityId {
  return facilities.some((f) => f.id === value);
}

export function hourLabel(hour: number) {
  return `${pad(hour)}:00–${pad(hour + 1)}:00`;
}

export const week = buildWeek();
