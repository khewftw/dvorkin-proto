"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/Container";
import { articles } from "@/data/news";

export function News() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="news" className="scroll-mt-24 bg-surface py-16 sm:py-24">
      <Container>
        <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <h2
            className="font-script text-[clamp(38px,6vw,68px)] font-bold italic leading-none"
            data-reveal
          >
            Новости <span className="text-red">и полезное</span>
          </h2>
          <Link
            href="/news"
            className="self-start border-b border-text pb-1 text-[15px] font-medium hover:border-red hover:text-red sm:self-auto"
          >
            Все публикации →
          </Link>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3" data-stagger>
          {articles.map((article) => (
            <motion.article
              key={article.title}
              className="group flex min-h-full flex-col border border-line bg-paper"
              data-stagger-item
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -9,
                      boxShadow: "0 18px 36px rgba(19,25,33,0.14)",
                    }
              }
              whileTap={reduceMotion ? undefined : { scale: 0.99 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <Link
                href={`/news/${article.slug}`}
                className="relative block aspect-video overflow-hidden bg-line"
                aria-label={article.title}
              >
                <Image
                  src={article.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                />
                <span className="absolute left-3 top-3 bg-red px-2.5 py-1 font-display text-[12px] uppercase tracking-[0.06em] text-white">
                  {article.category}
                </span>
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <time className="text-[12px] uppercase tracking-[0.08em] text-muted">
                  {article.date}
                </time>
                <h3 className="mt-3 font-display text-[clamp(25px,3vw,34px)] uppercase leading-[1.02]">
                  <Link href={`/news/${article.slug}`} className="hover:text-red">
                    {article.title}
                  </Link>
                </h3>
                <p className="mt-4 text-[15px] leading-[1.55] text-muted">
                  {article.excerpt}
                </p>
                <Link
                  href={`/news/${article.slug}`}
                  className="mt-6 self-start font-display text-[17px] uppercase tracking-[0.04em] text-red"
                >
                  Читать статью →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
