import React from "react";

import { BiCoin, BiHeart, BiUser } from "react-icons/bi";

import _Profile from "./profile";
import LeaderBoardCard from "@/components/modules/LeaderBoard";

export default function CreatorPage() {
  return (
    <div className="w-full min-h-dvh flex justify-center bg-primary/5">
      <div className="w-full min-h-dvh flex flex-col lg:grid grid-cols-[1fr_3fr] grid-rows-1 gap-4 p-4 md:p-8">
        {/* <!-- User Profile Section & Mobile show --> */}
        <_Profile />

        {/* <!-- Main Content Section & Destop Show --> */}
        <div className="flex flex-col gap-4">
          {/* <!-- Banner --> */}
          <div className="hidden lg:block w-full h-48 bg-gradient-to-r from-primary to-light rounded-lg shadow-lg overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-4">
            {/* <!-- About --> */}
            <div className="hidden lg:block bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-xl font-bold text-darker mb-4">About Me</h3>
              <p className="text-gray-600">
                Konnichiwa! Aku adalah seorang content creator yang fokus pada
                konten anime dan game. Aku suka berbagi pengalaman dan
                pengetahuan tentang hobi yang aku sukai. Support dari kalian
                sangat berarti untukku! Arigatou gozaimasu! ✨
              </p>
            </div>

            {/* donation option */}
            <div className="bg-white rounded-lg shadow-lg p-4 mt-4">
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

            {/* history donate */}
            <div className="bg-white rounded-lg shadow-lg p-4 mt-4">
              <h3 className="text-xl font-bold text-darker mb-4">
                Recent Donations
              </h3>
              <div className="flex flex-col gap-4">
                {/* <!-- Donation Card --> */}
                <div className="flex gap-4 p-4 bg-primary/5 rounded-lg">
                  <BiUser className="bx bxs-user text-3xl text-primary bg-primary/10 p-2 rounded-full h-max"></BiUser>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Melisa avesluna</span>
                      <span className="text-sm text-gray-500">1 month ago</span>
                    </div>
                    <div className="text-sm text-gray-500 truncate">
                      0x7F3e2B3c5D6A8f9B0E1D2c4F5e6B7A8C9D0E1F2
                    </div>
                    <p className="text-gray-600 mt-2 text-sm">Yatta</p>
                  </div>
                </div>

                {/* <!-- Donation Card --> */}
                <div className="flex gap-4 p-4 bg-primary/5 rounded-lg">
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

                {/* <!-- Donation Card --> */}
                <div className="flex gap-4 p-4 bg-primary/5 rounded-lg">
                  <BiUser className="bx bxs-user text-3xl text-primary bg-primary/10 p-2 rounded-full h-max"></BiUser>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Firefly</span>
                      <span className="text-sm text-gray-500">
                        2 months ago
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 truncate">
                      0x9S8R7Q6P5O4N3M2L1K0J9I8H7G6F5E4D3C2B1A
                    </div>
                    <p className="text-gray-600 mt-2 text-sm">
                      Keep up the great work! Your content always makes my day!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* leaderboards */}
            <div className="hidden lg:flex flex-col gap-4">
              <LeaderBoardCard
                type="activate"
                title="Top Supporters"
                data={[
                  {
                    image: "trest",
                    key: "Herman",
                    value: "2000",
                  },
                ]}
              />

              <LeaderBoardCard
                type="activate"
                title="Recent Donate"
                data={[
                  {
                    image: "",
                    key: "Herman",
                    value: "2000",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
