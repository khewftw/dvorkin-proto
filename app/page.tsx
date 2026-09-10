import { Suspense } from "react";
import { Contacts } from "@/components/Contacts";
import { Cta } from "@/components/Cta";
import { Faq } from "@/components/Faq";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { News } from "@/components/News";
import { Pricing } from "@/components/Pricing";
import { Reviews } from "@/components/Reviews";
import { Schedule } from "@/components/Schedule";
import { Services } from "@/components/Services";
import { PageMotion } from "@/components/animations/PageMotion";

export default function Home() {
  return (
    <div id="top" className="flex flex-1 flex-col bg-paper">
      <PageMotion />
      <Header />
      <main>
        <Hero />
        <Features />
        <Services />
        <Suspense fallback={<ScheduleFallback />}>
          <Schedule />
        </Suspense>
        <Gallery />
        <News />
        <Pricing />
        <div
          className="bg-red bg-cover bg-center"
          style={{ backgroundImage: "url('/cta-bg.png')" }}
        >
          <Reviews />
          <Cta />
        </div>
        <Faq />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
}

function ScheduleFallback() {
  return (
    <section className="bg-paper py-16 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="h-10 w-48 bg-surface" />
        <div className="mt-8 h-80 bg-surface" />
      </div>
    </section>
  );
}
