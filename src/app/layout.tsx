import type { Metadata } from "next";
import { Montserrat, Geist } from "next/font/google";
import "./globals.css";
import Banner from "@/components/Banner/page";
import Header from "@/components/Header/page";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecommerce Website",
  description: "This is a ecommerce website built with next.js",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <Banner />
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
