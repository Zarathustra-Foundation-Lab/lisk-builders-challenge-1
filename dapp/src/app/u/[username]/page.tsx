import React from "react";

import {
  BiCoin,
  BiCrown,
  BiDiamond,
  BiHeart,
  BiImageAdd,
  BiLink,
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTwitter,
  BiLogoYoutube,
  BiMedal,
  BiStar,
  BiUser,
} from "react-icons/bi";

export default function CreatorPage() {
  return (
    <div className="w-full min-h-dvh flex justify-center bg-primary/5">
      <div className="w-full min-h-dvh flex flex-col md:grid grid-cols-[1fr_3fr] grid-rows-1 gap-4 p-4 md:p-8">
        {/* <!-- User Profile Section --> */}
        <div className="w-full bg-white rounded-lg shadow-lg p-4 h-fit">
          <div className="flex flex-col items-center gap-4">
            {/* <!-- Banner --> */}
            <div className="md:hidden w-full h-32 bg-gradient-to-r from-primary to-light rounded-lg shadow-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white"></div>
              </div>
            </div>
            <div className="max-md:-translate-y-20 flex items-center flex-col gap-4">
              <label className="w-32 h-32 rounded-full bg-primary/20 overflow-hidden cursor-pointer hover:bg-primary/30 transition-colors relative group">
                <img
                  src="https://placehold.co/400"
                  alt="profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <BiImageAdd className="bx bx-image-add text-3xl text-white" />
                </div>
                <input type="file" accept="image/*" className="hidden" />
              </label>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-darker">Hertanate</h1>
                <p className="text-sm text-gray-500">@hertanate</p>
              </div>
              <p className="text-sm text-center text-gray-600">
                Hai! Aku adalah content creator yang suka membuat konten tentang
                anime dan game!
              </p>

              <div className="w-full flex flex-col gap-2">
                <div className="flex-1 bg-primary/5 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">Total Donasi</p>
                  <p className="text-lg font-bold text-primary">Rp 1.000.000</p>
                </div>
                <div className="flex-1 bg-primary/5 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">Total Supporter</p>
                  <p className="text-xl font-bold text-primary">50</p>
                </div>
              </div>

              <div className="w-full flex flex-col gap-2">
                <a
                  href="#"
                  className="w-full px-4 py-2 flex items-center gap-2 rounded-md bg-primary/5 hover:bg-primary/10 transition-colors"
                >
                  <BiLogoFacebook className="bx bxl-facebook text-xl text-primary"></BiLogoFacebook>
                  <span className="text-sm text-gray-600">@hertanate</span>
                </a>
                <a
                  href="#"
                  className="w-full px-4 py-2 flex items-center gap-2 rounded-md bg-primary/5 hover:bg-primary/10 transition-colors"
                >
                  <BiLogoInstagram className="bx bxl-instagram text-xl text-primary"></BiLogoInstagram>
                  <span className="text-sm text-gray-600">@hertanate</span>
                </a>
                <a
                  href="#"
                  className="w-full px-4 py-2 flex items-center gap-2 rounded-md bg-primary/5 hover:bg-primary/10 transition-colors"
                >
                  <BiLogoTwitter className="bx bxl-twitter text-xl text-primary"></BiLogoTwitter>
                  <span className="text-sm text-gray-600">@hertanate</span>
                </a>
                <a
                  href="#"
                  className="w-full px-4 py-2 flex items-center gap-2 rounded-md bg-primary/5 hover:bg-primary/10 transition-colors"
                >
                  <BiLogoYoutube className="bx bxl-youtube text-xl text-primary"></BiLogoYoutube>
                  <span className="text-sm text-gray-600">Hertanate Ch.</span>
                </a>

                {/* <!-- Additional Links --> */}
                <div className="w-full mt-2">
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Additional Links
                  </p>
                  <a
                    href="#"
                    className="w-full px-4 py-2 flex items-center gap-2 rounded-md bg-primary/5 hover:bg-primary/10 transition-colors"
                  >
                    <BiLink className="bx bx-link text-xl text-primary"></BiLink>
                    <span className="text-sm text-gray-600">My Website</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Main Content Section --> */}
        <div className="flex flex-col gap-4">
          {/* <!-- Banner --> */}
          <div className="max-md:hidden w-full h-48 bg-gradient-to-r from-primary to-light rounded-lg shadow-lg overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-4">
            <div>
              {/* <!-- About --> */}
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h3 className="text-xl font-bold text-darker mb-4">About Me</h3>
                <p className="text-gray-600">
                  Konnichiwa! Aku adalah seorang content creator yang fokus pada
                  konten anime dan game. Aku suka berbagi pengalaman dan
                  pengetahuan tentang hobi yang aku sukai. Support dari kalian
                  sangat berarti untukku! Arigatou gozaimasu! ✨
                </p>
              </div>

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

              <div>
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
                          <span className="text-sm text-gray-500">
                            1 month ago
                          </span>
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
                          Keep up the great work! Your content always makes my
                          day!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* <!-- Leaderboard --> */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-max">
                <div className="bg-gradient-to-br from-[#806699] to-[#6451AB] p-4">
                  <h3 className="text-xl font-bold text-white text-center">
                    Top Supporters
                  </h3>
                </div>
                <div className="flex flex-col divide-y divide-gray-200">
                  <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#B9F2FF] to-[#87CEEB] rounded-full flex items-center justify-center">
                        <BiDiamond className="bx bxs-diamond text-xl text-white"></BiDiamond>
                      </div>
                      <span className="font-medium">Madam Herta</span>
                    </div>
                    <span className="text-[#6451AB] font-bold">
                      82.500.000 IDRX
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center">
                        <BiStar className="bx bxs-star text-xl text-white"></BiStar>
                      </div>
                      <span className="font-medium">Firefly</span>
                    </div>
                    <span className="text-[#6451AB] font-bold">
                      48.000.000 IDRX
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#C0C0C0] to-[#A8A8A8] rounded-full flex items-center justify-center">
                        <BiCrown className="bx bxs-crown text-xl text-white"></BiCrown>
                      </div>
                      <span className="font-medium">Silver Wolf</span>
                    </div>
                    <span className="text-[#6451AB] font-bold">
                      31.500.000 IDRX
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#CD7F32] to-[#B87333] rounded-full flex items-center justify-center">
                        <BiMedal className="bx bxs-medal text-xl text-white"></BiMedal>
                      </div>
                      <span className="font-medium">March 7th</span>
                    </div>
                    <span className="text-[#6451AB] font-bold">
                      15.000.000 IDRX
                    </span>
                  </div>
                  {/* <!-- if wallet adress too long --> */}
                  <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="min-w-12 min-h-12 bg-gradient-to-br from-[#CD7F32] to-[#B87333] rounded-full flex items-center justify-center">
                        <BiMedal className="bx bxs-medal text-xl text-white"></BiMedal>
                      </div>
                      <span className="font-medium truncate">
                        0x7F3e2B3c5D6A8f9B0E1D2c4F5e6B7A8C9D0E1F2
                      </span>
                    </div>
                    <span className="text-[#6451AB] font-bold whitespace-nowrap">
                      7.500.000 IDRX
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-max">
                <div className="bg-gradient-to-br from-[#806699] to-[#6451AB] p-4">
                  <h3 className="text-xl font-bold text-white text-center">
                    Recent Donate
                  </h3>
                </div>
                <div className="flex flex-col divide-y divide-gray-200">
                  <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-row gap-2">
                      <BiUser className="bx bxs-user text-3xl text-primary bg-primary/10 p-2 h-max rounded-full"></BiUser>
                      <div className="flex flex-col">
                        <span className="font-medium">Madam Herta</span>
                        <span className="text-sm text-gray-500">
                          2 days ago
                        </span>
                      </div>
                    </div>
                    <span className="text-[#6451AB] font-bold">
                      82.500.000 IDRX
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-row gap-2">
                      <BiUser className="bx bxs-user text-3xl text-primary bg-primary/10 p-2 h-max rounded-full"></BiUser>
                      <div className="flex flex-col">
                        <span className="font-medium">Firefly</span>
                        <span className="text-sm text-gray-500">
                          3 days ago
                        </span>
                      </div>
                    </div>
                    <span className="text-[#6451AB] font-bold">
                      48.000.000 IDRX
                    </span>
                  </div>
                  {/* <!-- if wallet address is too long --> */}
                  <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-row gap-2 min-w-0">
                      <BiUser className="bx bxs-user text-3xl text-primary bg-primary/10 p-2 h-max rounded-full"></BiUser>
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium truncate">
                          0x7F3e2B3c5D6A8f9B0E1D2c4F5e6B7A8C9D0E1F2
                        </span>
                        <span className="text-sm text-gray-500">
                          3 days ago
                        </span>
                      </div>
                    </div>
                    <span className="text-[#6451AB] font-bold whitespace-nowrap">
                      48.000.000 IDRX
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
