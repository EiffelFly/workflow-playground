import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Inter, Roboto_Mono } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  subsets: ["latin"],
});

const roboto_mono = Roboto_Mono({
  variable: "--font-roboto-mono",
  display: "swap",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} ${roboto_mono.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
