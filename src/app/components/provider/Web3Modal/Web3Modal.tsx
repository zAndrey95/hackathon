"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";

// 1. Get projectId
const projectId: string = process.env["NEXT_PUBLIC_PROJECT_ID"]!;

// 2. Set chains
export const testnet = {
  chainId: 1891,
  name: "Lightlink Pegasus Testnet",
  currency: "ETH",
  explorerUrl: "https://pegasus.lightlink.io",
  rpcUrl: "https://replicator.pegasus.lightlink.io/rpc/v1",
};

// 3. Create modal
const metadata = {
  name: "Cards Against Formality",
  description: "Cards Against Formality by Lightlink Games",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [testnet],
  projectId,
  enableAnalytics: false, // Optional - defaults to your Cloud configuration
});

export function Web3ModalProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
