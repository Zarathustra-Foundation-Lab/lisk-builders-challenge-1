import Image from "next/image";
import React from "react";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import LeaderBoardCard from "../modules/LeaderBoard";

export default function HowItWorkSection() {
  return (
    <div className="section flex-col justify-center gap-4 bg-[#fef7ff]">
      <h2 className="text-4xl font-bold text-[#6451AB]">How It Works</h2>
      <div className="flex justify-between items-center gap-8">
        <div className="flex flex-col md:flex-row items-center justify-center">
          {StepData.map((item, idx) => {
            return (
              <StepWork
                key={idx}
                title={item.title}
                subTitile={item.subTitile}
                icon={item.icon}
                isLast={StepData.length - 1 == idx}
              />
            );
          })}

          {/* leader board */}
          <LeaderBoardCard />
          {/* <div className="hidden md:block w-lg bg-white rounded-xl shadow-lg overflow-hidden">
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
                <span className="text-[#6451AB] font-bold">
                  100.000.00 IDRX
                </span>
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
                <span className="text-[#6451AB] font-bold">
                  100.000.00 IDRX
                </span>
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
          </div> */}
        </div>
      </div>
    </div>
  );
}

interface StepProps {
  title: string;
  subTitile: string;
  icon: string;
}

// NOTE HERE
const StepWork = (props: StepProps & { isLast: boolean }) => {
  return (
    <>
      <div className="flex flex-col items-center text-center gap-2 max-w-xs">
        <div className="rounded-full bg-[#dec5fb]/50 p-1">
          <Image
            src={props.icon ?? "/hertanate-assets/how-work/hw-1.png"}
            alt=""
            width={100}
            height={100}
            className="w-[60px] lg:w-[100px]"
          />
        </div>
        <h3 className="text-xl font-semibold text-[#6451AB]">{props.title}</h3>
        <p className="text-sm text-gray-600">{props.subTitile}</p>
      </div>

      <div className="">
        {!props.isLast && (
          <div className="flex items-center justify-center">
            <BiChevronRight
              size={40}
              className="text-3xl text-[#6451AB] hidden md:block"
            />
            <BiChevronDown
              size={40}
              className="text-3xl text-[#6451AB] block md:hidden"
            />
          </div>
        )}
      </div>
    </>
  );
};

const StepData: StepProps[] = [
  {
    title: "Connect Wallet",
    subTitile: "Connect your IDRX wallet to start your donation journey",
    icon: "/hertanate-assets/how-work/hw-1.png",
  },
  {
    title: "Choose Amount",
    subTitile: "select the amount of IDRX you want to donate",
    icon: "/hertanate-assets/how-work/hw-2.png",
  },
  {
    title: "Join Leaderboard",
    subTitile:
      "Your donation will be recorded and displayed on the leaderboard",
    icon: "/hertanate-assets/how-work/hw-3.png",
  },
];
