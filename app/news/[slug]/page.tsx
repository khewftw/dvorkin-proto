import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { articles, getArticle } from "@/data/news";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};

  return {
    title: `${article.title} | Дом спорта им. М. Дворкина`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  return (
    <div className="flex min-h-svh flex-col bg-paper">
      <Header />
      <main className="flex-1">
        <article>
          <div className="relative min-h-[460px] overflow-hidden bg-ink text-white sm:min-h-[560px]">
            <Image
              src={article.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-ink/70" aria-hidden />
            <Container className="relative z-10 flex min-h-[460px] flex-col justify-end py-12 sm:min-h-[560px] sm:py-16">
              <Link
                href="/#news"
                className="mb-8 self-start border-b border-white/60 pb-1 text-[15px] hover:border-red hover:text-red"
              >
                ← Все публикации
              </Link>
              <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-red">
                {article.category} · {article.date}
              </p>
              <h1 className="mt-4 max-w-[980px] font-display text-[clamp(46px,8vw,96px)] uppercase leading-[0.9]">
                {article.title}
              </h1>
            </Container>
          </div>

          <Container className="py-12 sm:py-20">
            <p className="max-w-[760px] text-[clamp(20px,2.5vw,28px)] font-medium leading-[1.4]">
              {article.excerpt}
            </p>
            <div className="mt-10 max-w-[760px] space-y-6 text-[17px] leading-[1.75] text-muted sm:text-[19px]">
              {article.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-12 border-t border-line pt-8">
              <Link
                href="/#schedule"
                className="inline-flex bg-red px-8 py-4 font-display text-[20px] uppercase tracking-[0.05em] text-white transition-shadow hover:shadow-[0_0_30px_rgba(43,103,243,0.75)]"
              >
                Выбрать время
              </Link>
            </div>
          </Container>
        </article>
      </main>
      <Footer />
    </div>
  );
}
