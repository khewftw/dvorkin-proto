import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/#top" className={cn("block", className)} aria-label="На главную">
      <Image
        src="/logo.svg"
        alt="Дом спорта имени М. Дворкина"
        width={1061}
        height={404}
        priority
        className="h-auto w-[122px] sm:w-[150px]"
      />
    </Link>
  );
}
