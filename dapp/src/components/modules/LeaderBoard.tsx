import Image from "next/image";
import { BiUser } from "react-icons/bi";

interface LeaderBoardProps {
  type: "dummy" | "activate";
  title: string;
  data?: {
    image: string;
    key: string;
    value: string;
  }[];
}

export default function LeaderBoardCard(props: LeaderBoardProps) {
  if (props.type == "dummy") {
    return <LandingLeaderBoard />;
  }

  return (
    <div className="hidden md:block w-full bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-br from-[#806699] to-[#6451AB] p-4">
        <h3 className="text-xl font-bold text-white text-center">
          {props.title ? props.title : "Top Supporters"}
        </h3>
      </div>
      <div className="divide-y divide-gray-200">
        {[0, 1, 2, 3].map((i) => {
          return (
            <div
              key={i}
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                {props.data?.length && props.data[0].image ? (
                  <Image
                    height={100}
                    width={100}
                    src="https://upload-os-bbs.hoyolab.com/upload/2025/01/14/256651796/b78c1d2ed8c05bba57e2735d23329975_3892500857571519465.webp?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70"
                    alt="Madam Herta"
                    className="w-12 aspect-square rounded-full object-cover object-center"
                  />
                ) : (
                  <BiUser className="bx bxs-user text-3xl text-primary bg-primary/10 p-2 h-max rounded-full"></BiUser>
                )}

                <span className="font-medium">Madam Herta {i + 1}</span>
              </div>
              <span className="text-[#6451AB] font-bold">100.000.00 IDRX</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LandingLeaderBoard() {
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
            <img
              src="https://upload-os-bbs.hoyolab.com/upload/2025/01/14/256651796/b78c1d2ed8c05bba57e2735d23329975_3892500857571519465.webp?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70"
              alt="Madam Herta"
              className="w-12 aspect-square rounded-full object-cover object-center"
            />
            <span className="font-medium">Madam Herta</span>
          </div>
          <span className="text-[#6451AB] font-bold">100.000.00 IDRX</span>
        </div>
        <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-4">
            <img
              src="https://i.pinimg.com/736x/56/f0/da/56f0daadd0102bf51ab7bfcd9df80526.jpg"
              alt="Firefly"
              className="w-12 rounded-full object-cover"
            />
            <span className="font-medium">Firefly</span>
          </div>
          <span className="text-[#6451AB] font-bold">100.000.00 IDRX</span>
        </div>
        <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-4">
            <img
              src="https://i.pinimg.com/736x/b4/b1/b0/b4b1b065c3e6c5c3978bc21dcacc7b39.jpg"
              alt="Firefly"
              className="w-12 rounded-full object-cover"
            />
            <span className="font-medium">Silver Wolf</span>
          </div>
          <span className="text-[#6451AB] font-bold">50.000.00 IDRX</span>
        </div>
      </div>
    </div>
  );
}
