import Image from "next/image";

const photos = [
  {
    src: "/photos/gym/gym-dumbbells.jpg",
    alt: "Ряд гантелей в тренажёрном зале",
    caption: "Свободные веса",
    aspect: "aspect-[16/10]",
  },
  {
    src: "/photos/rehab/recovery-shower.jpg",
    alt: "Душевая кабина в зоне восстановления",
    caption: "Душевые",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/photos/tennis/table-tennis-hall-03.jpg",
    alt: "Столы для настольного тенниса вдоль галереи зала",
    caption: "Настольный теннис",
    aspect: "aspect-[16/10]",
  },
  {
    src: "/photos/gym/gym-hall-03.jpg",
    alt: "Стойка со штангами и дисками",
    caption: "Силовая зона",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/photos/rehab/recovery-room-02.jpg",
    alt: "Банные шапки на деревянной вешалке",
    caption: "Сауна",
    aspect: "aspect-[16/10]",
  },
  {
    src: "/photos/gym/gym-equipment-01.png",
    alt: "Беговые дорожки и эллипс в тренажёрном зале",
    caption: "Кардио",
    aspect: "aspect-[16/10]",
  },
  {
    src: "/photos/volley-hall/volleyball-showers.jpg",
    alt: "Общие душевые игрового зала",
    caption: "Раздевалки и душ",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/photos/rehab/recovery-room-01.jpg",
    alt: "Комната отдыха у сауны с деревянными столами",
    caption: "Зона отдыха",
    aspect: "aspect-[16/10]",
  },
  {
    src: "/photos/gym/gym-hall-02.jpg",
    alt: "Велотренажёры у зеркала",
    caption: "Кардиозона",
    aspect: "aspect-[16/10]",
  },
  {
    src: "/photos/tennis/table-tennis-equipment.png",
    alt: "Ракетки и мячи для настольного тенниса",
    caption: "Инвентарь на месте",
    aspect: "aspect-[4/5]",
  },
];

export function Gallery() {
  return (
    <section aria-label="Галерея" className="bg-paper">
      <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2">
        {photos.map((photo) => (
          <figure key={photo.src} className="bg-paper">
            <div className={`relative ${photo.aspect}`}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <figcaption className="px-4 py-3 font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
