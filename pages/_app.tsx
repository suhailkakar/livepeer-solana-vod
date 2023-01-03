import "../styles/globals.css";
import React, { useEffect, useMemo } from "react";
import {
  ConnectionProvider,
  useWallet,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react/solana";
import {
  LivepeerConfig,
  ThemeConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import { Toaster } from "react-hot-toast";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

export default function App({ Component, pageProps }: AppProps) {
  const network = WalletAdapterNetwork.Devnet;
  const { publicKey, connected } = useWallet();

  const client = createReactClient({
    provider: studioProvider({
      apiKey: "7d0ffcfb-bba2-4e7c-b1db-8dceaf7b9ce7",
    }),
  });

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <ThirdwebProvider network={"devnet"}>
            <LivepeerConfig client={client}>
              <Component {...pageProps} />
              <Toaster />
            </LivepeerConfig>
          </ThirdwebProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
