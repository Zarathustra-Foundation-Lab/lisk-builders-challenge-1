"use client";
import Image from "next/image";
import Link from "next/link";

import { ConnectButton } from "@xellar/kit";
import { truncateAddress } from "@/utils/utils";

import { useAccount } from "wagmi";
import { Address } from "viem";

import {
  getAccountBalance,
  getCreatorByAddress,
} from "@/actions/hertanate.action";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [username, setUsername] = useState<string>("");
  const { address } = useAccount();

  // get user IDRX balance
  const { data: balance } = getAccountBalance(address as Address);
  const { creator } = getCreatorByAddress(address as Address);

  useEffect(() => {
    setUsername(creator?.username as string);
  }, [address]);

  return (
    <header className="w-full pt-2 bg-white z-50 relative">
      <nav className="flex justify-between items-center px-8 py-4 text-black">
        <div className="font-semibold md:text-xl">
          <Image
            width={200}
            height={100}
            src={"/hertanate-assets/hertanate-icon.svg"}
            alt="Hertanate Icon"
            className="w-[100px] md:w-[120px] lg:w-[200px]"
          />
        </div>

        <div className="flex gap-x-7">
          {address && username && (
            <ul className="">
              <Link
                href={`/u/${username}`}
                className="font-montserrat text-xl font-medium hover:cursor-pointer hover:text-primary/70 transition-colors"
              >
                Profile
              </Link>
            </ul>
          )}

          {/* connect button */}
          <div className="flex items-center ">
            <ConnectButton.Custom
              children={({
                isConnected,
                account,
                disconnect,
                openConnectModal,
              }) => {
                if (isConnected && account) {
                  return (
                    <>
                      <div className="flex gap-x-3 lg:gap-x-12 items-center content-center">
                        <div className=" text-primary lg:text-center ">
                          <h6 className="hidden md:block text-sm lg:text-md line-clamp-1">
                            {truncateAddress(account?.address!)}
                          </h6>
                          <h6 className=" font-bold text-lg">
                            {balance ?? 0} IRDX
                          </h6>
                        </div>
                        <button
                          onClick={() => disconnect()}
                          className="w-fit px-4 py-3 max-md:text-sm bg-[#6451AB] text-white rounded-lg font-medium shadow-lg hover:shadow-[#6451AB]/50 transition-all hover:-translate-y-0.5"
                        >
                          Disconnect
                        </button>
                      </div>
                    </>
                  );
                }

                return (
                  <>
                    <button
                      onClick={() => openConnectModal()}
                      className="w-fit px-4 py-3 max-md:text-sm bg-[#6451AB] text-white rounded-lg font-medium shadow-lg hover:shadow-[#6451AB]/50 transition-all hover:-translate-y-0.5"
                    >
                      Connect Wallet
                    </button>
                  </>
                );
              }}
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
