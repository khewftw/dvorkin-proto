import { Button } from "@/components/Button";

export function Cta() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-red px-4 py-16 text-center text-white">
      <div>
        <h2 className="h2-cta">
          Приходите
          <br />
          тренироваться
        </h2>
        <div className="mt-8 flex flex-col items-center gap-6">
          <Button href="#schedule" variant="inverted">
            Забронировать
          </Button>
          <a
            href="tel:+73912668610"
            className="phone-xl font-display font-semibold tracking-[-0.02em]"
          >
            +7 (391) 266-86-10
          </a>
        </div>
      </div>
    </section>
  );
}
