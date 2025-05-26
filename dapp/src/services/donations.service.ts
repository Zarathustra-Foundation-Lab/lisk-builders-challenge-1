import { Address, createPublicClient, http, parseAbi } from "viem";
import { liskSepolia } from "viem/chains";
import { HertanateABI } from "@/constants/abi";
import { CONFIG } from "@/config";

if (!CONFIG.LISK_SEPOLIA.HERTANATE_ADDRESS) {
  throw new Error("NEXT_PUBLIC_HERTANATE_CONTRACT is not set");
}

const publicClient = createPublicClient({
  chain: liskSepolia,
  transport: http(),
});

export interface Donation {
  from: Address;
  amount: bigint;
  message: string;
  timestamp: number;
}

export interface Supporter {
  address: Address;
  amount: string;
}

const abi = parseAbi([
  "event DonationSent(address indexed from, address indexed creator, uint256 amount, uint256 feeAmount, string message, uint256 timestamp)",
]);

export async function getRecentDonations(creatorAddress?: Address) {
  if (!creatorAddress) return [];

  // get logs from blockchain
  const logs = await publicClient.getLogs({
    address: CONFIG.LISK_SEPOLIA.HERTANATE_ADDRESS,
    event: abi[0],
    fromBlock: BigInt(0),
    toBlock: "latest",
  });

  // adjust
  const recentDonate = logs
    .map(({ args: log }) => ({
      from: log.from as Address,
      amount: log.amount,
      message: log.message,
      timestamp: Number(log.timestamp),
    }))
    .reverse();

  // Mock data for now
  return recentDonate as Donation[];
}

export async function getTopSupporters(creatorAddress?: Address) {
  if (!creatorAddress) return [];

  // get logs from blockchain
  const logs = await publicClient.getLogs({
    address: CONFIG.LISK_SEPOLIA.HERTANATE_ADDRESS,
    event: abi[0],
    fromBlock: BigInt(0),
    toBlock: "latest",
  });

  // make new Map for mapping
  const supporterMap = new Map<
    Address,
    { totalAmount: bigint; donations: number }
  >();

  for (const log of logs) {
    const { from, amount } = log.args;
    const existing = supporterMap.get(from!) || {
      totalAmount: BigInt(0),
      donations: 0,
    };
    supporterMap.set(from!, {
      totalAmount: existing.totalAmount + amount!,
      donations: existing.donations + 1,
    });
  }

  // convert map to array
  const supporters: Supporter[] = Array.from(supporterMap.entries()).map(
    ([address, data]) => ({
      address,
      amount: data.totalAmount.toString(),
    })
  );

  // sort descending by amount
  const topSupporters = supporters.sort((a, b) =>
    Number(BigInt(b.amount) - BigInt(a.amount))
  );

  // Mock data for now
  return topSupporters as Supporter[];
}
