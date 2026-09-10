import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { articles } from "@/data/news";

export const metadata: Metadata = {
  title: "Новости и полезное | Дом спорта им. М. Дворкина",
  description:
    "Полезные материалы о тренировках, аренде спортивных залов и восстановлении в Красноярске.",
};

export default function NewsPage() {
  return (
    <div className="flex min-h-svh flex-col bg-surface">
      <Header />
      <main className="flex-1 py-12 sm:py-20">
        <Container>
          <Link
            href="/"
            className="border-b border-text pb-1 text-[15px] hover:border-red hover:text-red"
          >
            ← На главную
          </Link>
          <h1 className="font-script mt-9 text-[clamp(48px,8vw,88px)] font-bold leading-none">
            Новости <span className="text-red">и полезное</span>
          </h1>

          <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="group flex flex-col border border-line bg-paper"
              >
                <Link
                  href={`/news/${article.slug}`}
                  className="relative block aspect-video overflow-hidden bg-line"
                >
                  <Image
                    src={article.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[12px] uppercase tracking-[0.08em] text-muted">
                    {article.category} · {article.date}
                  </p>
                  <h2 className="mt-3 font-display text-[clamp(27px,3vw,36px)] uppercase leading-none">
                    <Link href={`/news/${article.slug}`} className="hover:text-red">
                      {article.title}
                    </Link>
                  </h2>
                  <p className="mt-4 flex-1 text-[15px] leading-[1.55] text-muted">
                    {article.excerpt}
                  </p>
                  <Link
                    href={`/news/${article.slug}`}
                    className="mt-6 self-start font-display text-[18px] uppercase text-red"
                  >
                    Читать статью →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
