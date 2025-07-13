import NavBar from "@/components/reuseables/NavBar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/reuseables/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kim Coffee - Premium Nigerian Coffee | Authentic Coffee Experience",
  description:
    "Discover the rich heritage of Nigerian coffee with Kim Coffee. Premium coffee beans from local farms, expertly roasted for the perfect flavor. Order online today!",
  keywords:
    "Nigerian coffee, premium coffee, coffee beans, Kim Coffee, Lagos coffee, African coffee, coffee delivery Nigeria",
  openGraph: {
    title: "Kim Coffee - Premium Nigerian Coffee",
    description:
      "Experience the finest coffee beans grown in the heart of Nigeria. From our farms to your cup.",
    type: "website",
    locale: "en_NG",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <div className="max-w-[100vw] overflow-hidden relative">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
