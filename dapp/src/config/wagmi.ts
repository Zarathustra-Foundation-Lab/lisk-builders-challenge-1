import { Config } from "wagmi";
import { defaultConfig } from "@xellar/kit";
import { liskSepolia } from "viem/chains";

export const walletConnectProjectId = process.env
  .NEXT_PUBLIC_XELLAR_CLIENT_SECRET as string;
export const xellarAppId = process.env.NEXT_PUBLIC_XELLAR_PROJECT_ID as string;

export const wagmiConfig = defaultConfig({
  appName: "Hertanate",
  walletConnectProjectId,
  xellarAppId,
  xellarEnv: "sandbox",
  chains: [liskSepolia],
}) as Config;
