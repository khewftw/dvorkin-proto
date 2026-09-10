import Image from "next/image";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

const cards = [
  {
    title: "Соревнования",
    src: "/photos/volley-hall/volleyball-hall-03.jpg",
    alt: "Игровой зал со зрительскими трибунами и рекламными баннерами",
  },
  {
    title: "Тренировочные сборы",
    src: "/photos/volley-hall/volleyball-locker-room.jpg",
    alt: "Раздевалка с деревянными шкафчиками и сиденьями",
  },
  {
    title: "Корпоративные игры",
    src: "/photos/volley-hall/volleyball-hall-02.jpg",
    alt: "VIP-трибуна игрового зала",
  },
  {
    title: "Реклама в зале",
    src: "/photos/volley-hall/volleyball-hall-04.jpg",
    alt: "Зрительские трибуны игрового зала",
  },
];

export function Business() {
  return (
    <section id="business" className="scroll-mt-24 bg-ink py-16 text-white sm:py-24">
      <Container>
        <h2 className="h2-xl">Зал под ваше мероприятие</h2>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <figure key={card.title}>
              <div className="relative aspect-[4/3]">
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 font-display text-[14px] font-semibold uppercase tracking-[0.08em]">
                {card.title}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-10">
          <Button href="#contacts" variant="outline">
            Запросить условия
          </Button>
        </div>
      </Container>
    </section>
  );
}
