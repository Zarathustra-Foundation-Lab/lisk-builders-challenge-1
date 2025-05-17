"use client";
import LeaderBoardCard from "@/components/modules/LeaderBoard";
import { truncateAddress } from "@/utils/utils";
import { BiCoin, BiHeart, BiUser } from "react-icons/bi";

import { Supporter } from "@/stores/creator.store";

import { useAccount, useWriteContract } from "wagmi";
import { Address, erc20Abi, isAddressEqual, parseUnits } from "viem";
import { useState } from "react";
import { DonateIDRXToCreator } from "@/actions/creator.action";
import { approveIDRX, getAllowanceIDRX } from "@/actions/idrx.action";
import { CONFIG } from "@/config";

interface Props {
  topSupporters: Supporter[];
  recentDonations: any[];
  creatorAddress: Address;
}

interface OptionDonate {
  title: string;
  value: number;
}

const optionsDonate: OptionDonate[] = [
  { title: "10k IDRX", value: 10_000 },
  { title: "20k IDRX", value: 20_000 },
  { title: "30k IDRX", value: 30_000 },
  { title: "50k IDRX", value: 50_000 },
  { title: "100k IDRX", value: 1000_000 },
];

export default function DestopProfile({
  recentDonations,
  topSupporters,
  creatorAddress,
}: Props) {
  // state
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [optionActive, setOptionActive] = useState<number>(-1);

  // hooks data
  const { address } = useAccount();
  const { data: allowance } = getAllowanceIDRX(address!);
  const { writeContract } = useWriteContract();

  const handleSelectOption = ({
    idxOption,
    _amount,
  }: {
    idxOption: number;
    _amount: number;
  }) => {
    setOptionActive(idxOption);
    setAmount(_amount);
  };

  // here
  const handleDonate = async () => {
    if (!address) {
      alert("User must Connect wallet before donate");
    } else {
      const parsedAmount = parseUnits(amount.toString(), 2);
      console.log(allowance);

      // check if amount bigger than allowance
      const needsApprove = !allowance || allowance < parsedAmount;

      if (needsApprove) {
        const tx = await writeContract({
          abi: erc20Abi,
          address: CONFIG.LISK_SEPOLIA.IDRX_ADDRESS,
          functionName: "approve",
          args: [
            CONFIG.LISK_SEPOLIA.HERTANATE_ADDRESS as Address,
            parsedAmount,
          ],
          account: address,
        });

        console.log(tx);
      }

      // donate to cretar
      const res = await DonateIDRXToCreator({
        amount: amount,
        creatorAddress: creatorAddress,
        message: message,
        userAddress: address!,
      });
      console.log(res);

      if (res.error) {
        console.log(res.error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* <!-- Banner --> */}
      <div className="hidden lg:block w-full h-48 bg-gradient-to-r from-primary to-light rounded-lg shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-4">
        {/* donation option */}
        <div className="h-max col-span-2 row-span-1 bg-white rounded-lg shadow-lg p-4 mt-4">
          <h3 className="text-xl font-bold text-darker mb-4">Support Me!</h3>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {/* options donate */}
            {optionsDonate.map(({ title, value }, idx) => {
              return (
                <button
                  key={idx}
                  onClick={() =>
                    handleSelectOption({
                      _amount: value,
                      idxOption: idx,
                    })
                  }
                  className={`${
                    optionActive == idx ? "bg-primary/30" : "bg-primary/10 "
                  } px-4 py-2  hover:bg-primary/20 rounded-lg flex items-center justify-center gap-2 transition-all`}
                >
                  <BiCoin className="bx bx-coin text-xl text-primary"></BiCoin>
                  <span>{title}</span>
                </button>
              );
            })}
            {/* custom donate */}
            <div className="relative rounded-lg flex items-center gap-2">
              <BiCoin className="absolute left-2 bx bx-coin text-xl text-primary"></BiCoin>
              <input
                onChange={(e) => {
                  setAmount(Number(e.target.value));
                  setOptionActive(-1);
                }}
                type="number"
                placeholder="Custom IDRX"
                className="w-full px-4 py-2 focus:outline-none text-center bg-primary/10 focus:bg-primary/30"
              />
              <h6 className="hidden lg:block absolute right-2">IDRX</h6>
            </div>
          </div>
          {/* message input */}
          <div className="py-4">
            <input
              type="text"
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message To Creator"
              className="w-full border-none px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg text-center gap-2 transition-colors outline-0"
            />
          </div>
          {/* button submit */}
          <button
            onClick={() => handleDonate()}
            className="w-full px-4 py-3 bg-gradient-to-r from-primary to-[#d33f6e] text-white rounded-lg font-medium shadow-lg hover:shadow-primary/50 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <BiHeart className="bx bx-heart text-xl"></BiHeart>
            Support Now!
          </button>
        </div>

        {/* leaderboards */}
        <div className="hidden lg:flex gap-4 col-span-2">
          <LeaderBoardCard
            type="activate"
            title="Top Supporters"
            data={topSupporters.map((supporter) => ({
              image: "",
              key: truncateAddress(supporter.address),
              value: supporter.amount,
            }))}
          />

          <LeaderBoardCard
            type="activate"
            title="Recent Donate"
            data={recentDonations.map((donation) => ({
              image: "",
              key: truncateAddress(donation.from || "0x"),
              value: donation.amount || "0",
            }))}
          />
        </div>

        {/* history donate */}
        {address && isAddressEqual(address, creatorAddress) && (
          <div className="col-span-2 row-span-1 bg-white rounded-lg shadow-lg p-4 mt-4">
            <h3 className="text-xl font-bold text-darker mb-4">
              Recent Donations
            </h3>
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((_, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex gap-4 p-4 bg-primary/5 rounded-lg"
                  >
                    <BiUser className="bx bxs-user text-3xl text-primary bg-primary/10 p-2 rounded-full h-max"></BiUser>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Madam Herta</span>
                        <span className="text-sm text-gray-500">
                          2 months ago
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        0x1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0
                      </div>
                      <p className="text-gray-600 mt-2 text-sm">
                        Kuru kuru~ Arigatou for the amazing content!
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
