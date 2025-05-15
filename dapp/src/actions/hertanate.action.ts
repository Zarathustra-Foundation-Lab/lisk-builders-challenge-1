import { useReadContract } from "wagmi";
import { HertanateABI } from "@/constants/abi";
import { Address } from "abitype";
import { erc20Abi, formatUnits } from "viem";
import { CONFIG } from "@/config";

export function getAccountBalance(userAddress: Address) {
  const { data } = useReadContract({
    address: CONFIG.LISK_SEPOLIA.IDRX_ADDRESS,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [userAddress],
  });

  return data;
}

export function getCreatorByAddress(creatorAddress: Address) {
  const { data } = useReadContract({
    address: CONFIG.LISK_SEPOLIA.HERTANATE_ADDRESS,
    abi: HertanateABI,
    functionName: "getCreator",
    args: [creatorAddress],
  });

  return {
    username: data?.[0] ?? "",
    name: data?.[1] ?? "",
    bio: data?.[2] ?? "",
    socials: data?.[3] ?? "",
    totalReceived: data?.[4] ?? BigInt(0),
  };
}

export function getCreatorByUsername(username: string) {}
