import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/ui/Header";
import { Web3ModalProvider } from "./components/provider/Web3Modal/Web3Modal";
import { GameProvider } from "./components/provider/GameContext/GameContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cards",
  description: "Cards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <GameProvider>
          <Web3ModalProvider>
            <Header />
            {children}
            <footer className="p-8 bg-slate-800">Powered by UA Team  💙💛</footer>
          </Web3ModalProvider>
        </GameProvider>
      </body>
    </html >
  );
}
