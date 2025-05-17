import Image from "next/image";
import { IMAGE_URLS } from "@/constants/images";

export default function LandingLeaderBoard() {
  return (
    <div className="hidden md:block w-md bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-br from-[#806699] to-[#6451AB] p-4">
        <h3 className="text-xl font-bold text-white text-center">
          Top Supporters
        </h3>
      </div>
      <div className="divide-y divide-gray-200">
        <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-4">
            <Image
              height={100}
              width={100}
              src={IMAGE_URLS.MADAM_HERTA}
              alt="Madam Herta"
              className="w-12 aspect-square rounded-full object-cover object-center"
            />
            <span className="font-medium">Madam Herta</span>
          </div>
          <span className="text-[#6451AB] font-bold">100.000.00 IDRX</span>
        </div>
        <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-4">
            <Image
              height={100}
              width={100}
              src={IMAGE_URLS.FIREFLY}
              alt="Firefly"
              className="w-12 aspect-square rounded-full object-cover object-center"
            />
            <span className="font-medium">Firefly</span>
          </div>
          <span className="text-[#6451AB] font-bold">100.000.00 IDRX</span>
        </div>
        <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-4">
            <Image
              height={100}
              width={100}
              src={IMAGE_URLS.SILVER_WOLF}
              alt="Silver Wolf"
              className="w-12 aspect-square rounded-full object-cover object-center"
            />
            <span className="font-medium">Silver Wolf</span>
          </div>
          <span className="text-[#6451AB] font-bold">50.000.00 IDRX</span>
        </div>
      </div>
    </div>
  );
}
