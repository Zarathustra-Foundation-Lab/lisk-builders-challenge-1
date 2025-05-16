import { useReadContract, useWriteContract } from "wagmi";
import { HertanateABI } from "@/constants/abi";
import { Address } from "abitype";
import {
  erc20Abi,
  formatUnits,
  encodeFunctionData,
  createWalletClient,
  custom,
} from "viem";
import { CONFIG } from "@/config";

import { liskSepolia } from "viem/chains";

import {
  GelatoRelay,
  CallWithERC2771Request,
} from "@gelatonetwork/relay-sdk-viem";

export function getAccountBalance(userAddress: Address) {
  const { data, isLoading, error } = useReadContract({
    address: CONFIG.LISK_SEPOLIA.IDRX_ADDRESS,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [userAddress],
  });

  return { data, isLoading, error };
}

export function allowanceIDRX(userAddress: Address) {
  const { data, isLoading, error } = useReadContract({
    address: CONFIG.LISK_SEPOLIA.IDRX_ADDRESS,
    abi: erc20Abi,
    functionName: "allowance",
    args: [userAddress, CONFIG.LISK_SEPOLIA.HERTANATE_ADDRESS],
  });

  return { data, isLoading, error };
}

export function getCreatorByAddress(creatorAddress: Address) {
  const { data, isLoading, error } = useReadContract({
    address: CONFIG.LISK_SEPOLIA.HERTANATE_ADDRESS,
    abi: HertanateABI,
    functionName: "getCreatorByAddress",
    args: [creatorAddress],
  });

  return { creator: data, isLoading, error };
}

export function getCreatorByUsername(username: string) {
  const { data, isLoading, error } = useReadContract({
    address: CONFIG.LISK_SEPOLIA.HERTANATE_ADDRESS,
    abi: HertanateABI,
    functionName: "getCreatorByUsername",
    args: [username.toLowerCase()],
  });

  return { creator: data, isLoading, error };
}

//
interface SignupParams {
  userAddress: Address;
  username: string;
  displayName: string;
  image: string;
  description: string;
  socials: string;
  // walletClient: any;
}

export async function signupCreator({
  userAddress,
  username,
  displayName,
  image,
  description,
  socials,
}: // walletClient,
SignupParams) {
  try {
    // get gealto relay instance
    const relay = new GelatoRelay();

    // get etherium provider
    const _window = window as unknown as any;

    const walletClient = createWalletClient({
      account: userAddress,
      chain: liskSepolia,
      transport: custom(_window.ethereum!),
    });

    // encode function
    const data = encodeFunctionData({
      abi: HertanateABI,
      functionName: "signupCreator",
      args: [username.toLowerCase(), displayName, "", description, socials],
    });

    if (!CONFIG.GELATO_API_KEY) {
      throw new Error("Gelato API key is not configured");
    }

    // payload for gelato sponsor gass
    const request: CallWithERC2771Request = {
      chainId: BigInt(liskSepolia.id),
      target: CONFIG.LISK_SEPOLIA.HERTANATE_ADDRESS,
      data: data,
      user: userAddress,
    };

    console.log(walletClient);

    // triger function to smart contract using gelato as relayer for gassless transaction
    const response = await relay.sponsoredCallERC2771(
      request,
      walletClient,
      CONFIG.GELATO_API_KEY
    );

    console.log("response");
    console.log(response);

    return {
      error: null,
      isLoading: false,
      taskId: response.taskId,
    };
  } catch (error) {
    console.error("Gelato relay error:", error);
    return {
      error: error instanceof Error ? error : new Error("Gelato relay failed"),
      isLoading: false,
    };
  }
}
