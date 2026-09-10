import Image from "next/image";

const items = [
  {
    title: "С 9:00 до 21:00 без выходных",
    text: "Комплекс открыт каждый день, включая праздники. Утро до смены или вечер после работы.",
    icon: "/blocks/features/icons/hours.svg",
  },
  {
    title: "Спортивное покрытие по ГОСТ",
    text: "Паркет игрового зала соответствует требованиям ГОСТ. Разметка под волейбол, баскетбол и мини-футбол — тот зал, где играет «Енисей».",
    icon: "/blocks/features/icons/court.svg",
  },
  {
    title: "Доступно маломобильным посетителям",
    text: "Вход, залы и раздевалки без барьеров. Предупредите по телефону — встретим и проводим.",
    icon: "/blocks/features/icons/access.svg",
  },
  {
    title: "Оплата картой, наличными и QR",
    text: "На ресепшен за полминуты. Для организаций выставим счёт. Бронь подтверждаем звонком.",
    icon: "/blocks/features/icons/payment.svg",
  },
];

export function Features() {
  return (
    <section className="bg-paper py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid w-full max-w-[1280px] gap-6 px-4 sm:px-6 lg:grid-cols-12 lg:items-stretch lg:gap-x-5">
        <div className="relative z-0 mx-auto w-full max-w-sm lg:col-span-5 lg:mx-0 lg:flex lg:h-full lg:max-w-none lg:items-center lg:justify-center lg:overflow-hidden">
          <Image
            src="/blocks/features/creative.png"
            alt="Волейболистка в игровом амплуа"
            width={1086}
            height={1448}
            sizes="(min-width: 1024px) 520px, 384px"
            className="pointer-events-none h-auto w-full lg:h-full lg:w-auto lg:max-w-full"
          />
        </div>

        <div className="relative z-10 flex min-h-0 flex-col lg:col-span-7">
          <h2 className="font-script mb-6 text-[clamp(40px,6.5vw,72px)] font-bold italic leading-[1.05] lg:mb-8">
            Один комплекс.{" "}
            <span className="text-red">Все, что нужно.</span>
          </h2>
          <div className="grid min-h-0 flex-1 grid-cols-1 border-l border-t border-line sm:grid-cols-2">
            {items.map((item) => (
              <article
                key={item.title}
                className="perk-card group relative flex min-h-[240px] cursor-pointer flex-col border-b border-r border-line bg-paper p-6 text-text transition-colors duration-300 hover:border-red hover:bg-red hover:text-white focus-within:border-red focus-within:bg-red focus-within:text-white sm:min-h-[280px] lg:min-h-0 lg:p-7"
                tabIndex={0}
              >
                <span
                  className="absolute right-4 top-4 text-current opacity-70"
                  aria-hidden
                >
                  <ArrowIcon />
                </span>
                <FeatureIcon src={item.icon} />
                <div className="mt-auto pt-8">
                  <h3 className="h3 pr-8 leading-[1.1]">{item.title}</h3>
                  <div className="perk-extra">
                    <p className="pt-3 text-[14px] leading-[1.55]">
                      {item.text}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureIcon({ src }: { src: string }) {
  return (
    <span
      aria-hidden
      className="block size-12 bg-red group-hover:bg-white group-focus-within:bg-white lg:size-14"
      style={{
        maskImage: `url(${src})`,
        maskRepeat: "no-repeat",
        maskPosition: "center",
        maskSize: "contain",
        WebkitMaskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        WebkitMaskSize: "contain",
      }}
    />
  );
}

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M5 15L15 5M7 5h8v8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}
