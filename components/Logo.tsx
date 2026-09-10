import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  inverted?: boolean;
};

export function Logo({ className, inverted = false }: LogoProps) {
  return (
    <a
      href="#top"
      className={cn(
        "flex flex-col leading-[0.95] tracking-[-0.02em]",
        inverted ? "text-white" : "text-white",
        className,
      )}
    >
      <span className="font-display text-[18px] font-bold uppercase sm:text-[22px]">
        Дом спорта
      </span>
      <span className="font-display text-[9px] font-semibold uppercase tracking-[0.16em] text-white/70 sm:text-[11px]">
        Им. М. Дворкина
      </span>
    </a>
  );
}
