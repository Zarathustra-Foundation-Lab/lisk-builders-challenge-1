"use client";
import Image from "next/image";
import Link from "next/link";

import { ConnectButton } from "@xellar/kit";
import { truncateAddress } from "@/utils/utils";
import useNavbar from "@/hooks/useNavbar";

export default function Navbar() {
  const { address, creator, idrxBalance, isLoading, error } = useNavbar();

  return (
    <header className="w-full pt-2 bg-white z-50 relative">
      <nav className="flex justify-between items-center px-8 py-4 text-black">
        <Link href={"/"} className="font-semibold md:text-xl">
          <Image
            width={200}
            height={100}
            src={"/hertanate-assets/hertanate-icon.svg"}
            alt="Hertanate Icon"
            className="w-[100px] md:w-[120px] lg:w-[200px]"
          />
        </Link>

        <div className="flex gap-x-7">
          {address && creator?.username && (
            <ul className="translate-y-2.5 hidden md:block">
              <Link
                href={`/u/${creator.username}`}
                className="w-fit px-4 py-3 max-md:text-sm bg-[#6451AB] text-white rounded-lg font-medium shadow-lg hover:shadow-[#6451AB]/50 transition-all"
              >
                Profile
              </Link>
            </ul>
          )}

          <div className="flex items-center">
            <ConnectButton.Custom
              children={({
                isConnected,
                account,
                disconnect,
                openConnectModal,
              }) => {
                if (isConnected && account) {
                  return (
                    <div className="flex gap-x-3 lg:gap-x-12 items-center content-center">
                      <div className="text-primary lg:text-center">
                        <h6 className="hidden md:block text-sm lg:text-md line-clamp-1">
                          {truncateAddress(account.address)}
                        </h6>
                        <h6 className="font-bold text-lg">
                          {isLoading ? (
                            <span className="inline-block h-4 w-20 bg-gray-200 rounded animate-pulse"></span>
                          ) : (
                            `${idrxBalance} IDRX`
                          )}
                        </h6>
                      </div>
                      <button
                        onClick={() => disconnect()}
                        className="w-fit px-4 py-3 max-md:text-sm bg-[#6451AB] text-white rounded-lg font-medium shadow-lg hover:shadow-[#6451AB]/50 transition-all hover:-translate-y-0.5"
                      >
                        Disconnect
                      </button>
                    </div>
                  );
                }

                return (
                  <button
                    onClick={() => openConnectModal()}
                    className="w-fit px-4 py-3 max-md:text-sm bg-[#6451AB] text-white rounded-lg font-medium shadow-lg hover:shadow-[#6451AB]/50 transition-all hover:-translate-y-0.5"
                  >
                    Connect Wallet
                  </button>
                );
              }}
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
