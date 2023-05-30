import {
  Inter,
  Bai_Jamjuree as Jamjuree,
  Roboto_Flex as RobotoFlex,
} from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const robotoFlex = RobotoFlex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
});

const baiJamjuree = Jamjuree({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-bai-jamjuree",
});

export const metadata = {
  title: "NLW Spacetime",
  description:
    "uma cápsula do tempo construída com React, Next.js, TailwindCSS e TypeScript.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body
        className={`${robotoFlex.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
