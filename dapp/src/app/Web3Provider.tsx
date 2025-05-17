"use client";

import React from "react";
import { Config, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { XellarKitProvider, defaultConfig, darkTheme } from "@xellar/kit";

import { polygonAmoy, liskSepolia, lisk } from "viem/chains";

const walletConnectProjectId = process.env
  .NEXT_PUBLIC_XELLAR_CLIENT_SECRET as string;
const xellarAppId = process.env.NEXT_PUBLIC_XELLAR_PROJECT_ID as string;

export const config = defaultConfig({
  appName: "Hertanet",
  walletConnectProjectId: walletConnectProjectId,
  xellarAppId: xellarAppId,
  xellarEnv: "sandbox",
  chains: [liskSepolia],
  // ssr: true,
}) as Config;

export const queryClient = new QueryClient({
  defaultOptions: {},
});

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <XellarKitProvider showConfirmationModal theme={darkTheme}>
          {children}
        </XellarKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
