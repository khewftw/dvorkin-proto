import Image from "next/image";
import { Button } from "@/components/Button";

export function Hero() {
  return (
    <section className="relative h-[78vh] min-h-[560px] w-full overflow-hidden bg-ink text-white">
      <Image
        src="/photos/volley-hall/volleyball-court.jpg"
        alt="Игровой зал Дома спорта им. М. Дворкина с профессиональной разметкой и сеткой"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_40%]"
      />
      <div className="absolute inset-0 bg-black/45" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/25"
        aria-hidden
      />

      <div className="absolute inset-0 z-10 flex items-center justify-center p-5 sm:p-8">
        <div className="w-full max-w-[16rem] text-center sm:max-w-[920px]">
          <p className="font-script text-[24px] font-bold italic leading-none text-red sm:text-[36px]">
            Платные услуги
          </p>
          <h1 className="h1 mt-2 sm:mt-3">
            Залы, в
            <br className="sm:hidden" />{" "}
            которых
            <br />
            играет
            <br className="sm:hidden" />{" "}
            «Енисей»
          </h1>
          <p className="hero-lead mt-4 text-[15px] leading-[1.55] text-white/90 sm:mt-5 sm:text-[17px]">
            Игровой и тренажёрный залы, настольный теннис и сауна на острове
            Отдыха. Почасовая аренда и абонементы.
          </p>
          <div className="mx-auto mt-5 flex w-full flex-col items-center justify-center gap-3 sm:mt-6 sm:flex-row">
            <Button
              href="#schedule"
              size="lg"
              className="w-full max-w-[320px] sm:w-auto sm:max-w-none"
            >
              Посмотреть свободное время
            </Button>
            <Button
              href="#pricing"
              size="lg"
              variant="outline"
              className="w-full max-w-[320px] sm:w-auto sm:max-w-none sm:min-w-[140px]"
            >
              Цены
            </Button>
          </div>
          <p className="mt-5 font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70 sm:mt-6 sm:text-[12px] sm:tracking-[0.14em]">
            остров Отдыха, 15
            <span className="mx-2 hidden sm:inline">·</span>
            <span className="block sm:inline">Ежедневно 9:00–21:00</span>
            <span className="mx-2 hidden sm:inline">·</span>
            <a href="tel:+73912668610" className="block sm:inline">
              +7 (391) 266-86-10
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
