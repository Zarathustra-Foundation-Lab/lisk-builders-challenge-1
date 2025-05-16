"use client";
import React from "react";
import { BiCoin, BiHeart, BiUser } from "react-icons/bi";
import Profile from "@/components/layouts/creator/profile";
import LeaderBoardCard from "@/components/modules/LeaderBoard";
import { truncateAddress } from "@/utils/utils";
import { useCreatorStore, useCreatorData } from "@/stores/creator.store";

export default function CreatorPage({
  params,
}: {
  params: { username: string };
}) {
  const {
    creator,
    donationLogs,
    topSupporters,
    recentDonations,
    totalSupporters,
    isLoading,
    error,
  } = useCreatorStore();

  useCreatorData(params.username);

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <h2 className="font-medium text-2xl text-center">Loading...</h2>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="h-full flex justify-center items-center">
  //       <h2 className="font-medium text-2xl text-center">Error loading data</h2>
  //     </div>
  //   );
  // }

  // if (!creator) {
  //   return (
  //     <div className="h-full flex justify-center items-center">
  //       <h2 className="font-medium text-2xl text-center">Creator Not Found</h2>
  //     </div>
  //   );
  // }

  return (
    <>
      {/* <div className="hidden lg:block"><Navbar /></div> */}
      <div className="w-full min-h-dvh flex justify-center bg-primary/5">
        <div className="w-full min-h-dvh flex flex-col lg:grid grid-cols-[1fr_3fr] grid-rows-1 gap-4 p-4 md:p-8">
          {/* <!-- User Profile Section & Mobile show --> */}
          <Profile />

          {/* <!-- Main Content Section & Destop Show --> */}
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
                <h3 className="text-xl font-bold text-darker mb-4">
                  Support Me!
                </h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <button className="px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <BiCoin className="bx bx-coin text-xl text-primary"></BiCoin>
                    <span>10K</span>
                  </button>
                  <button className="px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <BiCoin className="bx bx-coin text-xl text-primary"></BiCoin>
                    <span>20K</span>
                  </button>
                  <button className="px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <BiCoin className="bx bx-coin text-xl text-primary"></BiCoin>
                    <span>30K</span>
                  </button>
                  <button className="px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <BiCoin className="bx bx-coin text-xl text-primary"></BiCoin>
                    <span>50K</span>
                  </button>
                  <button className="px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <BiCoin className="bx bx-coin text-xl text-primary"></BiCoin>
                    <span>100K</span>
                  </button>
                  <div className="px-4 py-2 bg-primary/10 rounded-lg flex items-center gap-2">
                    <BiCoin className="bx bx-coin text-xl text-primary"></BiCoin>
                    <input
                      type="number"
                      placeholder="Custom"
                      className="w-full bg-transparent focus:outline-none text-center"
                    />
                  </div>
                </div>
                <button className="w-full px-4 py-3 bg-gradient-to-r from-primary to-[#d33f6e] text-white rounded-lg font-medium shadow-lg hover:shadow-primary/50 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
