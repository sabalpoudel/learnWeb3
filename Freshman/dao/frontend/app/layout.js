import "@rainbow-me/rainbowkit/styles.css";
import "../styles/Home.module.css";

import { sepolia } from "wagmi/chains";
import { Inter } from "next/font/google";
import { publicProvider } from "wagmi/providers/public";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CryptoDevs DAO",
  description:
    "Build an NFT-powered fully on-chain DAO to invest in NFT collections as a group",
};

const { chains, publicClient } = configureChains([sepolia], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "CryptoDevs DAO",
  projectId: "46c1c9b226e62517bcb73f72f86e2243",
  chains,
});

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
          <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
