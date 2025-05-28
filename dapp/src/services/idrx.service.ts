import { Address, createPublicClient, erc20Abi, http } from "viem";
import { liskSepolia } from "viem/chains";
import { HertanateABI } from "@/constants/abi";
import { CONFIG } from "@/config";
import { useReadContract } from "wagmi";

if (!CONFIG.LISK_SEPOLIA.HERTANATE_ADDRESS) {
  throw new Error("NEXT_PUBLIC_HERTANATE_CONTRACT is not set");
}

const publicClient = createPublicClient({
  chain: liskSepolia,
  transport: http(),
});

export async function getAccountBalance(address: Address) {
  const data = await publicClient.readContract({
    address: CONFIG.LISK_SEPOLIA.IDRX_ADDRESS,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address],
  });

  // Currently using mock value since ABI doesn't expose balance function
  return {
    // data: BigInt(1000000000000000000), // Mock 1 IDRX
    data: data,
  };
}

export async function getAllowanceIDRX(address: Address) {
  const data = await publicClient.readContract({
    address: CONFIG.LISK_SEPOLIA.IDRX_ADDRESS,
    abi: erc20Abi,
    functionName: "allowance",
    args: [address, CONFIG.LISK_SEPOLIA.HERTANATE_ADDRESS],
  });

  // Currently using mock value since ABI doesn't expose allowance function
  return {
    // data: BigInt(500000000000000000), // Mock 0.5 IDRX
    data: data,
  };
}
