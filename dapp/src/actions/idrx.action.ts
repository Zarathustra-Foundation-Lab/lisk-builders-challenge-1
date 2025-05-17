import { useReadContract, useWriteContract } from "wagmi";
import { readContract } from "@wagmi/core";

import { Address } from "abitype";
import { erc20Abi, formatUnits, parseUnits } from "viem";
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

export function getAllowanceIDRX(userAddress: Address) {
  const { data, isLoading, error } = useReadContract({
    address: CONFIG.LISK_SEPOLIA.IDRX_ADDRESS,
    abi: erc20Abi,
    functionName: "allowance",
    args: [userAddress, CONFIG.LISK_SEPOLIA.HERTANATE_ADDRESS],
  });

  return { data, isLoading, error };
}

export async function approveIDRX(userAddress: Address, amount: number) {
  const parsedAmount = parseUnits(amount.toString(), 2); // IDRX = 2 decimals

  const { writeContract } = useWriteContract();

  const tx = await writeContract({
    abi: erc20Abi,
    address: CONFIG.LISK_SEPOLIA.IDRX_ADDRESS,
    functionName: "approve",
    args: [CONFIG.LISK_SEPOLIA.HERTANATE_ADDRESS as Address, parsedAmount],
    account: userAddress,
  });

  return tx;
}
