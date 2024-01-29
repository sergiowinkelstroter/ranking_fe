import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "./components/footer";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Conquistadores JA",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: {
    item: string;
  };
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <header className="relative flex items-center bg-white justify-center p-2 ">
          <Image src="/logo_conquistadores.jpg" width={50} height={50} alt="" />
        </header>
        {children}
        <Footer />
      </body>
    </html>
  );
}
