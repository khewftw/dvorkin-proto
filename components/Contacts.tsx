import { Container } from "@/components/Container";

export function Contacts() {
  return (
    <section id="contacts" className="scroll-mt-24 bg-surface py-16 sm:py-24">
      <Container>
        <h2 className="h2 mb-10">Контакты</h2>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <div>
              <p className="font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                Адрес
              </p>
              <p className="mt-2 text-[18px]">
                Красноярск, остров Отдыха, 15
              </p>
            </div>
            <div>
              <p className="font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                Телефон
              </p>
              <a href="tel:+73912668610" className="mt-2 block text-[18px]">
                +7 (391) 266-86-10
              </a>
            </div>
            <div>
              <p className="font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                Режим работы
              </p>
              <p className="mt-2 text-[18px]">Ежедневно 9:00–21:00</p>
            </div>
            <div>
              <p className="font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                Учреждение
              </p>
              <p className="mt-2 max-w-md text-[15px] leading-[1.55]">
                КГАУ ДО «СШОР по волейболу «Енисей» имени Э.А. Носкова»
              </p>
            </div>
          </div>
          <div className="flex min-h-[320px] items-center justify-center border border-line bg-paper lg:min-h-[420px]">
            <div className="px-6 text-center">
              <p className="font-display text-[14px] font-semibold uppercase tracking-[0.12em]">
                Яндекс.Карты
              </p>
              <p className="mt-2 text-[13px] text-muted">
                Красноярск, остров Отдыха, 15
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
