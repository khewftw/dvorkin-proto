"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function PageMotion() {
  useEffect(() => {
    let media: ReturnType<typeof gsap.matchMedia> | null = null;
    const frame = window.requestAnimationFrame(() => {
      media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
      const heroTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      heroTimeline
        .from("[data-hero-item]", {
          autoAlpha: 0,
          y: 34,
          duration: 0.8,
          stagger: 0.1,
        })
        .from(
          "[data-hero-actions]",
          { autoAlpha: 0, y: 20, duration: 0.65 },
          "-=0.35",
        );

      const heroImage = document.querySelector<HTMLElement>(
        "[data-hero-image]",
      );
      if (heroImage) {
        gsap.fromTo(
          heroImage,
          { scale: 1.04, yPercent: 0 },
          {
            scale: 1.1,
            yPercent: 7,
            ease: "none",
            scrollTrigger: {
              trigger: heroImage.closest("section"),
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      }

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 42,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        const children = group.querySelectorAll<HTMLElement>(
          "[data-stagger-item]",
        );
        if (!children.length) return;

        gsap.from(children, {
          autoAlpha: 0,
          y: 32,
          duration: 0.7,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: group,
            start: "top 85%",
            once: true,
          },
        });
      });
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      media?.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
