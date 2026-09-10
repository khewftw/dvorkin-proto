import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const productSans = localFont({
  src: [
    {
      path: "../fonts/ProductSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/ProductSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/ProductSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/ProductSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-product-sans",
  display: "swap",
});

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const bebas = localFont({
  src: "../fonts/Bebas Neue Cyrillic.ttf",
  variable: "--font-bebas",
  display: "swap",
  weight: "400",
});

const alwaysAngry = localFont({
  src: [
    {
      path: "../fonts/AlwaysAngry-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/AlwaysAngry-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/AlwaysAngry-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/AlwaysAngry-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-always-angry",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dvrkin.ru"),
  title: "Дом спорта им. М. Дворкина — платные услуги | Красноярск",
  description:
    "Игровой и тренажёрный залы, настольный теннис и сауна на острове Отдыха, 15. Почасовая аренда и абонементы. Ежедневно 9:00–21:00.",
  openGraph: {
    locale: "ru_RU",
    type: "website",
    title: "Дом спорта им. М. Дворкина — платные услуги",
    description:
      "Залы, в которых играет «Енисей». Аренда игрового и тренажёрного залов, настольный теннис и сауна в Красноярске.",
    images: [
      {
        url: "/photos/volley-hall/volleyball-court.jpg",
        width: 1600,
        height: 1200,
        alt: "Игровой зал Дома спорта им. М. Дворкина",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${productSans.variable} ${nunito.variable} ${bebas.variable} ${alwaysAngry.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-paper font-sans text-text">
        {children}
      </body>
    </html>
  );
}
