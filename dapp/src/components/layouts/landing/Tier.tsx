import { BiMedal, BiCrown, BiStar, BiDiamond } from "react-icons/bi";

export default function TierSection() {
  return (
    <div className="w-full h-screen py-20 bg-[#fef7ff] flex justify-center items-center">
      <div className="flex flex-col items-center w-full md:space-y-12 max-md:py-20">
        <h2 className="text-4xl font-bold text-[#6451AB]">Tier Rewards</h2>

        <div className="grid grid-cols-2 grid-rows-2 md:flex flex-col md:flex-row items-center justify-center gap-8 w-full">
          <div className="flex flex-col items-center text-center space-y-4 max-w-xs scale-90">
            <div className="w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-[#CD7F32] to-[#B87333] rounded-full flex items-center justify-center group-hover:scale-110 transition-all">
              <BiMedal className="bx bxs-medal text-lg md:text-4xl text-white"></BiMedal>
            </div>
            <h3 className="text-xl font-semibold text-[#CD7F32]">
              Bronze Tier
            </h3>
            <p className="text-sm text-gray-600">
              Special Bronze Badge, Basic Profile Customization, Monthly
              Newsletter
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 max-w-xs scale-95">
            <div className="w-14 h-14 md:w-24 md:h-24 bg-gradient-to-br from-[#C0C0C0] to-[#A8A8A8] rounded-full flex items-center justify-center group-hover:scale-110 transition-all">
              <BiCrown className="bx bxs-crown text-xl md:text-5xl text-white"></BiCrown>
            </div>
            <h3 className="text-xl font-semibold text-[#C0C0C0]">
              Silver Tier
            </h3>
            <p className="text-sm text-gray-600">
              Exclusive Silver Badge, Premium Chat Access, Early Access to
              Events
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 max-w-xs scale-100">
            <div className="w-16 h-16 md:w-28 md:h-28 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center group-hover:scale-110 transition-all">
              <BiStar className="bx bxs-star text-2xl md:text-6xl text-white"></BiStar>
            </div>
            <h3 className="text-xl font-semibold text-[#FFD700]">Gold Tier</h3>
            <p className="text-sm text-gray-600">
              Premium Gold Badge, Limited Edition Merch, VIP Community Access
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 max-w-xs scale-105">
            <div className="w-[4.5rem] h-[4.5rem] md:w-32 md:h-32 bg-gradient-to-br from-[#B9F2FF] to-[#87CEEB] rounded-full flex items-center justify-center group-hover:scale-110 transition-all">
              <BiDiamond className="bx bxs-diamond text-3xl md:text-7xl text-white"></BiDiamond>
            </div>
            <h3 className="text-xl font-semibold text-[#87CEEB]">
              Crystal Tier
            </h3>
            <p className="text-sm text-gray-600">
              Legendary Crystal Badge, Exclusive Events, Custom Profile Themes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
