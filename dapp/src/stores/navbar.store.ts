import { create } from "zustand";
import { useEffect } from "react";
import { useQuery, QueryClient } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { Address, formatUnits } from "viem";

import { getAccountBalance, getAllowanceIDRX } from "@/services/idrx.service";
import { getCreatorByAddress } from "@/services/creator.service";

// Buat instance queryClient baru
const queryClient = new QueryClient();

interface Creator {
  creatorAddress: Address;
  username: string;
  detail: {
    image: string;
    name: string;
    bio: string;
    socials: string;
  };
  totalReceived: bigint;
  isActive: boolean;
}

interface NavbarStore {
  creator: Creator | null;
  idrxBalance: string;
  idrxAllowance: string;
  isLoading: boolean;
  error: Error | null;
  setCreator: (creator: Creator | null) => void;
  setBalance: (balance: bigint) => void;
  setAllowance: (allowance: bigint) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
}

export const useNavbarStore = create<NavbarStore>((set) => ({
  creator: null,
  idrxBalance: "0",
  idrxAllowance: "0",
  isLoading: false,
  error: null,
  setCreator: (creator) => set({ creator }),
  setBalance: (balance) => set({ idrxBalance: formatUnits(balance, 18) }),
  setAllowance: (allowance) =>
    set({ idrxAllowance: formatUnits(allowance, 18) }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));

export function useNavbarData() {
  const { setCreator, setBalance, setAllowance, setLoading, setError } =
    useNavbarStore();
  const { address } = useAccount();

  // Fetch creator data
  const creatorQuery = useQuery({
    queryKey: ["creator", address],
    queryFn: async () => {
      if (!address) return null;
      const res = await getCreatorByAddress(address);
      return res.data || null;
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

  // Update store state when queries change
  useEffect(() => {
    if (creatorQuery.data) setCreator(creatorQuery.data);
    if (balanceQuery.data) setBalance(balanceQuery.data);
    if (allowanceQuery.data) setAllowance(allowanceQuery.data);
    setLoading(
      creatorQuery.isLoading ||
        balanceQuery.isLoading ||
        allowanceQuery.isLoading
    );
    setError(creatorQuery.error || balanceQuery.error || allowanceQuery.error);
  }, [
    creatorQuery.data,
    balanceQuery.data,
    allowanceQuery.data,
    creatorQuery.isLoading,
    balanceQuery.isLoading,
    allowanceQuery.isLoading,
    creatorQuery.error,
    balanceQuery.error,
    allowanceQuery.error,
  ]);

  return { refetch: () => queryClient.invalidateQueries() };
}
