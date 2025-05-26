import { useAccount } from "wagmi";
import { useNavbarStore, useNavbarData } from "@/stores/navbar.store";

export default function useNavbar() {
  const { address } = useAccount();
  const { creator, idrxBalance, isLoading, error } = useNavbarStore();

  useNavbarData(); // Initialize data fetching

  return {
    address,
    creator,
    idrxBalance,
    isLoading,
    error,
  };
}
