import Image from "next/image";
import { Button } from "@/components/Button";

export function Hero() {
  return (
    <section className="relative h-[calc(100svh-108px)] w-full overflow-hidden bg-ink text-white sm:h-[calc(100svh-128px)]">
      <Image
        src="/photos/volley-hall/volleyball-court.jpg"
        alt="Игровой зал Дома спорта им. М. Дворкина с профессиональной разметкой и сеткой"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[58%_40%] sm:object-[center_40%]"
        data-hero-image
      />
      <div className="absolute inset-0 bg-ink/50 sm:bg-ink/45" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/45 to-ink/10 sm:bg-gradient-to-t sm:from-ink/80 sm:via-ink/35 sm:to-ink/25"
        aria-hidden
      />

      <div className="absolute inset-0 z-10 flex items-center px-4 py-5 sm:justify-center sm:p-8">
        <div className="w-full max-w-[580px] text-left sm:max-w-[920px] sm:text-center">
          <p
            className="hidden font-script text-[24px] font-bold italic leading-none text-red sm:block sm:text-[36px]"
            data-hero-item
          >
            Платные услуги
          </p>
          <h1
            className="font-display text-[clamp(42px,14vw,58px)] font-bold uppercase leading-[0.88] tracking-[-0.02em] sm:mt-3 sm:text-[clamp(64px,8vw,110px)]"
            data-hero-item
          >
            Залы, в которых
            <br /> играет «Енисей»
          </h1>
          <p
            className="hero-lead mt-4 text-[14px] leading-[1.45] text-white/90 sm:mt-5 sm:text-[17px]"
            data-hero-item
          >
            Игровой и тренажёрный залы, настольный теннис и сауна на острове
            Отдыха. Почасовая аренда и абонементы.
          </p>
          <div
            className="mt-5 flex w-full flex-col gap-2.5 sm:mt-6 sm:flex-row sm:items-center sm:justify-center sm:gap-3"
            data-hero-actions
          >
            <Button
              href="#schedule"
              size="lg"
              className="w-full sm:w-auto"
            >
              Посмотреть свободное время
            </Button>
            <Button
              href="#pricing"
              size="lg"
              variant="outline"
              className="w-full sm:w-auto sm:min-w-[140px]"
            >
              Цены
            </Button>
          </div>
          <p
            className="mt-4 font-sans text-[12px] font-medium leading-[1.5] text-white/75 sm:mt-6 sm:font-display sm:text-[12px] sm:font-semibold sm:uppercase sm:tracking-[0.14em]"
            data-hero-item
          >
            остров Отдыха, 15
            <span className="mx-2 hidden sm:inline">·</span>
            <span className="block sm:inline">Ежедневно 9:00–21:00</span>
            <span className="mx-2 hidden sm:inline">·</span>
            <a href="tel:+73912369333" className="block sm:inline">
              +7 (391) 236-93-33
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
