import { Button } from "@/components/Button";
import { HallCarousel } from "@/components/HallCarousel";

const halls = [
  {
    id: "court",
    title: "Игровой зал",
    href: "/?f=court#schedule",
    text: "Профессиональное покрытие с разметкой под волейбол, баскетбол и мини-футбол. Тот самый паркет, на котором проходят всероссийские соревнования. Аренда почасовая: тренировка, турнир, корпоративная игра.",
    photos: [
      {
        src: "/photos/volley-hall/volleyball-hall-01.jpg",
        alt: "Игровой зал Дома спорта с профессиональной разметкой",
      },
      {
        src: "/photos/volley-hall/volleyball-court.jpg",
        alt: "Волейбольная сетка и паркет игрового зала",
      },
      {
        src: "/photos/volley-hall/volleyball-hall-02.jpg",
        alt: "Трибуны и поле игрового зала",
      },
      {
        src: "/photos/volley-hall/volleyball-hall-03.jpg",
        alt: "Общий вид игрового зала",
      },
      {
        src: "/photos/volley-hall/volleyball-hall-04.jpg",
        alt: "Игровой зал с разметкой под несколько видов спорта",
      },
      {
        src: "/photos/volley-hall/volleyball-facilities-01.jpg",
        alt: "Инфраструктура игрового зала",
      },
      {
        src: "/photos/volley-hall/volleyball-locker-room.jpg",
        alt: "Раздевалка игрового зала",
      },
      {
        src: "/photos/volley-hall/volleyball-showers.jpg",
        alt: "Душевые игрового зала",
      },
    ],
  },
  {
    id: "gym",
    title: "Тренажёрный зал",
    href: "/?f=gym#schedule",
    text: "Силовые тренажёры, кардио, свободные веса и зона для функционального тренинга. Инструктор в зале поставит технику и соберёт программу. Днём почти пусто — можно работать спокойно.",
    photos: [
      {
        src: "/photos/gym/gym-hall-01.jpg",
        alt: "Тренажёрный зал: стойка, штанга и свободные веса",
      },
      {
        src: "/photos/gym/gym-hall-02.jpg",
        alt: "Велотренажёры у зеркала",
      },
      {
        src: "/photos/gym/gym-hall-03.jpg",
        alt: "Стойка со штангами и дисками",
      },
      {
        src: "/photos/gym/gym-dumbbells.jpg",
        alt: "Ряд гантелей в тренажёрном зале",
      },
      {
        src: "/photos/gym/gym-equipment-01.png",
        alt: "Беговые дорожки и эллипс в тренажёрном зале",
      },
    ],
  },
  {
    id: "tennis",
    title: "Настольный теннис",
    href: "/?f=tennis#schedule",
    text: "Несколько столов, ракетки и мячи выдаём на месте. Час на двоих выходит дешевле двух чашек кофе. Подходит и для разминки перед турниром, и просто чтобы поиграть.",
    photos: [
      {
        src: "/photos/tennis/table-tennis-hall-01.jpg",
        alt: "Ряд столов для настольного тенниса в галерее зала",
      },
      {
        src: "/photos/tennis/table-tennis-hall-02.jpg",
        alt: "Зал настольного тенниса",
      },
      {
        src: "/photos/tennis/table-tennis-hall-03.jpg",
        alt: "Столы для настольного тенниса вдоль галереи",
      },
      {
        src: "/photos/tennis/table-tennis-equipment.png",
        alt: "Ракетки и мячи для настольного тенниса",
      },
    ],
  },
  {
    id: "sauna",
    title: "Сауна",
    href: "/?f=sauna#schedule",
    text: "Сауна и зона отдыха. Мышцы отпускает, пульс приходит в норму, из комплекса выходите не выжатым. Бронируется отдельно, удобно ставить сразу после тренировки.",
    photos: [
      {
        src: "/photos/rehab/recovery-sauna.jpg",
        alt: "Деревянная сауна с каменкой в зоне восстановления",
      },
      {
        src: "/photos/rehab/recovery-room-01.jpg",
        alt: "Комната отдыха у сауны с деревянными столами",
      },
      {
        src: "/photos/rehab/recovery-room-02.jpg",
        alt: "Банные шапки на деревянной вешалке",
      },
      {
        src: "/photos/rehab/recovery-room-03.jpg",
        alt: "Зона восстановления",
      },
      {
        src: "/photos/rehab/recovery-room-04.jpg",
        alt: "Комната отдыха в зоне сауны",
      },
      {
        src: "/photos/rehab/recovery-shower.jpg",
        alt: "Душевая кабина в зоне восстановления",
      },
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-paper">
      {halls.map((hall, index) => (
        <article
          key={hall.id}
          id={hall.id}
          className="grid scroll-mt-24 overflow-hidden lg:h-[680px] lg:grid-cols-12"
        >
          <div className="flex flex-col justify-center px-5 py-12 sm:px-10 sm:py-16 lg:col-span-5 lg:px-12 xl:px-16">
            <h2 className="h2 text-red">{hall.title}</h2>
            <p className="mt-5 max-w-[38ch] text-[16px] leading-[1.55] text-muted sm:text-[17px]">
              {hall.text}
            </p>
            <Button href={hall.href} className="mt-8 self-start">
              Забронировать
            </Button>
          </div>
          <div className="relative h-[320px] overflow-hidden sm:h-[420px] lg:col-span-7 lg:h-full">
            <HallCarousel photos={hall.photos} priority={index === 0} />
          </div>
        </article>
      ))}
    </section>
  );
}
