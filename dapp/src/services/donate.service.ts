import { Address, encodeFunctionData } from "viem";
import { walletClient } from "@/services/client";
import { HertanateABI } from "@/constants/abi";
import { CONFIG } from "@/config";
import { CallWithERC2771Request } from "@gelatonetwork/relay-sdk-viem";
import { liskSepolia } from "viem/chains";
import { relay } from "./gelato";

export async function donateToCreator(params: {
  creatorAddress: Address;
  userAddress: Address;
  amount: number;
  message: string;
}) {
  try {
    if (!walletClient) throw new Error("Wallet client not initialized");

    if (
      !CONFIG.LISK_SEPOLIA.HERTANATE_ADDRESS ||
      !CONFIG.LISK_SEPOLIA.IDRX_ADDRESS
    ) {
      throw new Error("Contract addresses not configured");
    }

    // encode function data
    const data = encodeFunctionData({
      abi: HertanateABI,
      functionName: "donateToCreator",
      args: [
        params.creatorAddress,
        BigInt(params.amount),
        CONFIG.LISK_SEPOLIA.IDRX_ADDRESS as Address,
        params.message,
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

    return { txHash: response.taskId };
  } catch (error) {
    console.error("Donation failed:", error);
    return {
      error: error instanceof Error ? error.message : "Donation failed",
    };
  }
}
