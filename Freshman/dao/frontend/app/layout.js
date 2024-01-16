"use client";
import "@rainbow-me/rainbowkit/styles.css";
import "../styles/Home.module.css";

import { sepolia } from "wagmi/chains";
import { Inter } from "next/font/google";
import { publicProvider } from "wagmi/providers/public";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  getDefaultWallets,
  RainbowKitProvider,
  // connectorsForWallets,
} from "@rainbow-me/rainbowkit";

const inter = Inter({ subsets: ["latin"] });

const demoAppInfo = {
  appName: '"CryptoDevs DAO',
};

const { chains, publicClient } = configureChains([sepolia], [publicProvider()]);

// const { wallets } = getDefaultWallets({
const { connectors } = getDefaultWallets({
  appName: "CryptoDevs DAO",
  projectId: "46c1c9b226e62517bcb73f72f86e2243",
  chains,
});

// const connectors = connectorsForWallets([
//   ...wallets,
//   {
//     groupName: "Other",
//     wallets: [
//       argentWallet({ projectId, chains }),
//       trustWallet({ projectId, chains }),
//       ledgerWallet({ projectId, chains }),
//     ],
//   },
// ]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider appInfo={demoAppInfo} chains={chains}>
            {children}
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
