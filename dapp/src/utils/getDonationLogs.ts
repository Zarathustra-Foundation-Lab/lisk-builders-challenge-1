import { parseAbi } from "viem";
import { viemClient } from "./viemClient";
import { CONFIG } from "@/config";

const abi = parseAbi([
  "event DonationSent(address indexed from, address indexed creator, uint256 amount, uint256 feeAmount, string message, uint256 timestamp)",
]);

export async function getDonationLogs() {
  const logs = await viemClient.getLogs({
    address: CONFIG.LISK_SEPOLIA.HERTANATE_ADDRESS,
    event: abi[0],
    fromBlock: BigInt(0),
    toBlock: "latest",
  });

  return logs.map((log) => ({
    from: log.args.from,
    creator: log.args.creator,
    amount: log.args.amount?.toString(),
    fee: log.args.feeAmount?.toString(),
    message: log.args.message,
    timestamp: Number(log.args.timestamp),
    txHash: log.transactionHash,
  }));
}
