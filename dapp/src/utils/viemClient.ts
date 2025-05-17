import { createPublicClient, http } from "viem";
import { liskSepolia } from "viem/chains";

export const viemClient = createPublicClient({
  chain: liskSepolia,
  transport: http(),
});
