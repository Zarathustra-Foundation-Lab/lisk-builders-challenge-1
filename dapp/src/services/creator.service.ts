import { Address, encodeFunctionData, custom, createWalletClient } from "viem";

import { liskSepolia } from "viem/chains";
import { HertanateABI } from "@/constants/abi";

import { CONFIG } from "@/config";
import { CallWithERC2771Request } from "@gelatonetwork/relay-sdk-viem";
import { relay } from "./gelato";
import { publicClient, walletClient } from "./client";

if (!CONFIG.LISK_SEPOLIA.HERTANATE_ADDRESS) {
  throw new Error("NEXT_PUBLIC_HERTANATE_CONTRACT is not set");
}

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

async function checkCreatorAlreadyRegistred({
  userAddress,
  username,
}: {
  username: string;
  userAddress: Address;
}) {
  const usernameIsRegistered = (await getCreatorByUsername(username)).data
    .isActive;
  const addressIsRegistered = (await getCreatorByAddress(userAddress)).data
    .isActive;

  if (usernameIsRegistered) {
    throw new Error(
      "username is Already Registered, please use another username"
    );
    return true;
  }

  if (addressIsRegistered) {
    throw new Error("address is Already Registered, please use another wallet");
    return true;
  }

  return false;
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
    // get etherium provider
    const _window = window as unknown as any;

    // get wallet client
    const walletClient = createWalletClient({
      account: params.userAddress,
      chain: liskSepolia,
      transport: custom(_window.ethereum!),
    });

    if (!walletClient) throw new Error("Wallet not connected");

    // check if the user with this username or address is already registered
    await checkCreatorAlreadyRegistred({
      userAddress: params.userAddress,
      username: params.username,
    });

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

interface EditCreatorParams {
  userAddress: Address;
  displayName: string;
  image: string;
  description: string;
  socials: string;
}

export const EditCreatorDetail = async (params: EditCreatorParams) => {
  // get etherium provider
  const _window = window as unknown as any;

  // get wallet client
  const walletClient = createWalletClient({
    account: params.userAddress,
    chain: liskSepolia,
    transport: custom(_window.ethereum!),
  });

  if (!walletClient) throw new Error("Wallet not connected");

  // encode function data
  const data = encodeFunctionData({
    abi: HertanateABI,
    functionName: "editCreatorProfile",
    args: [
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
};
