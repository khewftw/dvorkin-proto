import { Logo } from "@/components/Logo";

const serviceLinks = [
  { href: "/#court", label: "Игровой зал" },
  { href: "/#gym", label: "Тренажёрный зал" },
  { href: "/#tennis", label: "Настольный теннис" },
  { href: "/#sauna", label: "Сауна" },
];

const infoLinks = [
  { href: "/#schedule", label: "Расписание" },
  { href: "/#pricing", label: "Цены" },
  { href: "/#news", label: "Новости" },
  { href: "/#faq", label: "Вопросы" },
];

const legalDocs = [
  "Политика обработки персональных данных",
  "Согласие на обработку персональных данных",
  "Пользовательское соглашение",
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div
        className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:gap-7 lg:py-16"
        data-reveal
      >
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-6 max-w-[38ch] text-[14px] leading-[1.6] text-white/65">
            Платные спортивные и восстановительные услуги в Красноярске.
            Остров Отдыха, 15.
          </p>
          <a
            href="tel:+73912369333"
            className="mt-5 block font-display text-[26px] hover:text-red"
          >
            +7 (391) 236-93-33
          </a>
        </div>
        <div className="lg:col-span-2">
          <FooterCol title="Услуги" links={serviceLinks} />
        </div>
        <div className="lg:col-span-2">
          <FooterCol title="Информация" links={infoLinks} />
        </div>
        <div className="lg:col-span-4">
          <h3 className="font-display text-[22px] uppercase">Документы</h3>
          <ul className="mt-5 space-y-3">
            {legalDocs.map((document) => (
              <li key={document}>
                <span className="block text-[14px] leading-[1.4] text-white/65">
                  {document}
                </span>
                <span className="text-[11px] uppercase tracking-[0.08em] text-white/35">
                  Ссылка будет добавлена
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto grid max-w-[1280px] gap-4 px-4 py-6 text-[12px] leading-[1.55] text-white/45 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p>
              КГАУ ДО «СШОР по волейболу „Енисей“ имени Э.А. Носкова»
            </p>
            <p className="mt-1">
              ИНН: будет добавлен · КПП: будет добавлен · ОГРН: будет добавлен
            </p>
          </div>
          <p className="flex flex-wrap gap-x-4 gap-y-1 lg:justify-end">
            <a
              href="https://сшор-енисей.рф"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Официальный сайт
            </a>
            <span>© 2026</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="font-display text-[22px] uppercase text-white">{title}</h3>
      <ul className="mt-5 flex flex-col gap-2.5 text-[14px] text-white/65">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
