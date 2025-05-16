import { useReadContract, useWriteContract } from "wagmi";
import { HertanateABI } from "@/constants/abi";
import { Address } from "abitype";
import { erc20Abi, formatUnits } from "viem";
import { CONFIG } from "@/config";

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

export async function signupCreator(
  username: string,
  displayName: string,
  image: string,
  description: string,
  socials: string
) {
  const { writeContract, error, isPending, status } = useWriteContract();

  writeContract({
    address: CONFIG.LISK_SEPOLIA.HERTANATE_ADDRESS,
    abi: HertanateABI,
    functionName: "signupCreator",
    args: [username.toLowerCase(), displayName, image, description, socials],
  });

  return {
    error,
    isLoading: isPending,
  };
}
