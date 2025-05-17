import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { queryClient } from "@/config/queryClient";
import { getAccountBalance, getAllowanceIDRX } from "@/services/idrx.service";
import { getCreatorByAddress } from "@/services/creator.service";

export function useNavbarData() {
  const { address } = useAccount();

  // Fetch creator data
  const creatorQuery = useQuery({
    queryKey: ["creator", address],
    queryFn: async () => {
      if (!address) return null;
      try {
        const res = await getCreatorByAddress(address);
        return res.creator;
      } catch (error) {
        console.error("Error fetching creator:", error);
        return null;
      }
    },
    enabled: !!address,
  });

  // Fetch balance
  const balanceQuery = useQuery({
    queryKey: ["balance", address],
    queryFn: async () => {
      if (!address) return null;
      const res = await getAccountBalance(address);
      return res?.data || null;
    },
    enabled: !!address,
  });

  // Fetch allowance
  const allowanceQuery = useQuery({
    queryKey: ["allowance", address],
    queryFn: async () => {
      if (!address) return null;
      const res = await getAllowanceIDRX(address);
      return res?.data || null;
    },
    enabled: !!address,
  });

  return {
    creatorQuery,
    balanceQuery,
    allowanceQuery,
    refetch: () => queryClient.invalidateQueries(),
  };
}
