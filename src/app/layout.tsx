import { Monda, Montserrat, Oswald, Roboto } from "next/font/google";
import "./globals.css";
import React from "react";
import RouteTitle from "./RouteTitle";

const monda = Monda({
  subsets: ["latin"],
  variable: "--font-monda",
  weight: ["400", "700"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["200", "300", "400", "500", "600", "700"],
});
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${monda.variable} ${montserrat.variable} ${oswald.variable} ${roboto.variable} p-5`}
      >
        <RouteTitle />
        <div className="flex  gap-5">
          <p
            style={{
              fontFamily: "var(--font-roboto)",
              writingMode: "vertical-rl",
              transform: "rotate(-180deg)",
            }}
          >
           Lucas Borges
          </p>
          {children}
        </div>
      </body>
    </html>
  );
}
