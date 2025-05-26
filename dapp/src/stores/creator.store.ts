import { create } from "zustand";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";

import { getDonationLogs } from "@/utils/getDonationLogs";
import { getCreatorByUsername } from "@/services/creator.service";

interface CreatorDetail {
  image: string;
  name: string;
  bio: string;
  socials: string;
}

export interface Creator {
  creatorAddress: Address;
  username: string;
  detail: CreatorDetail;
  totalReceived: bigint;
  isActive: boolean;
}

interface DonationLog {
  from?: Address;
  creator?: Address;
  amount?: string;
  fee?: string;
  message?: string;
  timestamp: number;
  txHash: Address;
}

export interface Supporter {
  address: Address;
  amount: string;
}

interface CreatorStore {
  username: string;
  creator: Creator | null;
  donationLogs: DonationLog[];
  topSupporters: Supporter[];
  recentDonations: DonationLog[];
  totalSupporters: number;
  isLoading: boolean;
  error: Error | null;
  setCreator: (creator: Creator | null) => void;
  setDonationLogs: (logs: DonationLog[]) => void;
  setTopSupporters: (supporters: Supporter[]) => void;
  setRecentDonations: (donations: DonationLog[]) => void;
  setTotalSupporters: (count: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
}

export const useCreatorStore = create<CreatorStore>((set) => ({
  username: "",
  creator: null,
  donationLogs: [],
  topSupporters: [],
  recentDonations: [],
  totalSupporters: 0,
  isLoading: false,
  error: null,
  setCreator: (creator) => set({ creator }),
  setDonationLogs: (donationLogs) => set({ donationLogs }),
  setTopSupporters: (topSupporters) => set({ topSupporters }),
  setRecentDonations: (recentDonations) => set({ recentDonations }),
  setTotalSupporters: (totalSupporters) => set({ totalSupporters }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));

export function useCreatorData(username: string) {
  const {
    setCreator,
    setDonationLogs,
    setTopSupporters,
    setRecentDonations,
    setTotalSupporters,
    setLoading,
    setError,
  } = useCreatorStore();

  // Fetch creator data
  const creatorQuery = useQuery({
    queryKey: ["creator", username],
    queryFn: async () => {
      setLoading(true);
      try {
        const res = await getCreatorByUsername(username);
        setCreator({
          creatorAddress: res.data?.creatorAddress!,
          detail: res.data?.detail!,
          isActive: res.data?.isActive!,
          username: res.data?.username!,
          totalReceived: BigInt(0),
        });
        return res;
      } catch (error) {
        setError(error as Error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    enabled: !!username,
  });

  // Fetch and process donation logs
  const logsQuery = useQuery({
    queryKey: ["donationLogs", username],
    queryFn: async () => {
      setLoading(true);
      try {
        const logs = await getDonationLogs();
        setDonationLogs(logs);

        // Process top supporters
        const supporterMap = new Map<Address, number>();
        logs.forEach((log) => {
          if (log.from && log.amount) {
            const current = supporterMap.get(log.from) || 0;
            supporterMap.set(log.from, current + Number(log.amount));
          }
        });

        const topSupporters = Array.from(supporterMap.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([address, amount]) => ({
            address,
            amount: amount.toString(),
          }));
        setTopSupporters(topSupporters);

        // Process recent donations
        const recentDonations = logs
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, 5);
        setRecentDonations(recentDonations);

        // Calculate total unique supporters
        const uniqueSupporters = new Set(
          logs.map((log) => log.from).filter(Boolean) as Address[]
        );
        setTotalSupporters(uniqueSupporters.size);

        return logs;
      } catch (error) {
        setError(error as Error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    enabled: !!username,
  });

  return {
    isLoading: creatorQuery.isLoading || logsQuery.isLoading,
    error: creatorQuery.error || logsQuery.error,
  };
}
