import Image from "next/image";
import { Container } from "@/components/Container";

const reviews = [
  {
    name: "Антон К.",
    text: "Берём стол после работы — ракетки на месте, ждать не пришлось. Час на двоих выходит дешевле кофе внизу по острову.",
    service: "Настольный теннис",
    image: "/photos/tennis/table-tennis-hall-01.jpg",
    alt: "Столы для настольного тенниса",
  },
  {
    name: "Мария С.",
    text: "Днём зал почти пустой, можно спокойно делать жим и не стоять к стойке. Инструктор поправил хват с первого раза.",
    service: "Тренажёрный зал",
    image: "/photos/gym/gym-hall-01.jpg",
    alt: "Тренажёрный зал",
  },
  {
    name: "Дмитрий П.",
    text: "Арендовали игровой на корпоратив. Покрытие как на трансляциях «Енисея», сетку поставили за пять минут, раздевалки чистые.",
    service: "Аренда игрового зала",
    image: "/photos/volley-hall/volleyball-hall-01.jpg",
    alt: "Игровой зал",
  },
  {
    name: "Ольга В.",
    text: "После вечерней тренировки сразу в сауну. Дерево сухое, не перегрето — из комплекса выходишь человеком, а не выжатым.",
    service: "Сауна",
    image: "/photos/rehab/recovery-sauna.jpg",
    alt: "Сауна",
  },
];

export function Reviews() {
  return (
    <section className="bg-paper py-16 sm:py-24">
      <Container>
        <h2 className="h2 mb-8">Отзывы</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="flex min-w-[280px] flex-1 flex-col bg-surface p-6 lg:min-w-0"
            >
              <p className="text-red" aria-label="Оценка 5 из 5">
                {"★★★★★"}
              </p>
              <p className="mt-4 flex-1 text-[14px] leading-[1.55]">{review.text}</p>
              <p className="mt-5 text-[13px] text-muted">{review.name}</p>
              <div className="mt-4 flex items-center gap-3 border-t border-line pt-4">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden">
                  <Image
                    src={review.image}
                    alt={review.alt}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <p className="font-display text-[11px] font-semibold uppercase tracking-[0.08em]">
                  {review.service}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
