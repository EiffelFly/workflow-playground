import { Html } from "next/document";
import { Inter, Roboto_Mono } from "next/font/google";
import { ReactNode } from "react";

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

export type RootProps = {
  children?: ReactNode;
};

export const Root = ({ children }: RootProps) => {
  return (
    <div className={`${inter.variable} ${roboto_mono.variable}`}>
      {children}
    </div>
  );
};
