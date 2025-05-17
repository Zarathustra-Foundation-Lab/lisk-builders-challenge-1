import { Address, createPublicClient, http, encodeFunctionData } from "viem";
import { getWalletClient } from "@wagmi/core";
import { wagmiConfig } from "@/config/wagmi";

import { liskSepolia } from "viem/chains";
import { HertanateABI } from "@/constants/abi";

import { CONFIG } from "@/config";
import { CallWithERC2771Request } from "@gelatonetwork/relay-sdk-viem";
import { relay } from "./gelato";
import { publicClient } from "./client";

if (!CONFIG.LISK_SEPOLIA.HERTANATE_ADDRESS) {
  throw new Error("NEXT_PUBLIC_HERTANATE_CONTRACT is not set");
}

// const publicClient = createPublicClient({
//   chain: liskSepolia,
//   transport: http(),
// });

export async function getCreatorByAddress(address: Address) {
  const creator = await publicClient.readContract({
    address: CONFIG.LISK_SEPOLIA.HERTANATE_ADDRESS as Address,
    abi: HertanateABI,
    functionName: "getCreatorByAddress",
    args: [address],
  });

  return { data: creator };
}

export async function getCreatorByUsername(username: string) {
  const creator = await publicClient.readContract({
    address: CONFIG.LISK_SEPOLIA.HERTANATE_ADDRESS as Address,
    abi: HertanateABI,
    functionName: "getCreatorByUsername",
    args: [username],
  });

  return { data: creator };
}

interface SignupCreatorParams {
  userAddress: Address;
  username: string;
  displayName: string;
  image: string;
  description: string;
  socials: string;
}

export const signupCreator = async (params: SignupCreatorParams) => {
  try {
    const walletClient = await getWalletClient(wagmiConfig);
    if (!walletClient) throw new Error("Wallet not connected");

    // encode function data
    const data = encodeFunctionData({
      abi: HertanateABI,
      functionName: "signupCreator",
      args: [
        params.username,
        params.displayName,
        params.image,
        params.description,
        params.socials,
      ],
    });

    // payload for gelato sponsor gass
    const request: CallWithERC2771Request = {
      chainId: BigInt(liskSepolia.id),
      target: CONFIG.LISK_SEPOLIA.HERTANATE_ADDRESS,
      data: data,
      user: params.userAddress,
    };

    // triger function to smart contract using gelato as relayer for gassless transaction
    const response = await relay.sponsoredCallERC2771(
      request,
      walletClient,
      CONFIG.GELATO_API_KEY
    );

    return {
      success: true,
      txHash: response.taskId,
    };
  } catch (error) {
    console.error("Error signing up creator:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
