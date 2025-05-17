import { createPublicClient, createWalletClient, custom, http } from "viem";
import { liskSepolia } from "viem/chains";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const publicClient = createPublicClient({
  chain: liskSepolia,
  transport:
    typeof window !== "undefined" && window.ethereum
      ? custom(window.ethereum)
      : http(),
});

export const walletClient = createWalletClient({
  chain: liskSepolia,
  transport:
    typeof window !== "undefined" && window.ethereum
      ? custom(window.ethereum)
      : http(),
});
