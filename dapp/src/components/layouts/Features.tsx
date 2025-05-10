import Image from "next/image";
import React from "react";

export default function FeatureSection() {
  return (
    <div className="section bg-[#fef7ff]">
      <div className="max-md:h-full grid grid-cols-1 grid-flow-row md:grid-cols-3 md:gap-8 gap-2 max-md:py-20">
        {DATA.map((item, idx) => {
          return (
            <FeatureCard
              title={item.title}
              icon={item.icon}
              description={item.description}
              key={idx}
            />
          );
        })}
      </div>
    </div>
  );
}

interface FeatureProp {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard = (props: FeatureProp) => {
  return (
    <div className="bg-gradient-to-br max-md:h-max from-[#806699]/10 to-[#6451AB]/10 p-4 md:p-8 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-[#6451AB]/50 transition-all group">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all">
          <Image
            alt=""
            src={props.icon ?? "/hertanate-assets/features/feature-1.png"}
            width={100}
            height={100}
          />
        </div>
        <h3 className="md:text-xl font-semibold text-[#6451AB]">
          {props.title}
        </h3>
        <p className="text-sm text-gray-600">{props.description}</p>
      </div>
    </div>
  );
};

const DATA: FeatureProp[] = [
  {
    icon: "/hertanate-assets/features/feature-1.png",
    title: "Connect Wallet",
    description: `Hubungkan wallet IDRX kamu untuk mulai berdonasi dan dapatkan berbagai keuntungan eksklusif`,
  },
  {
    icon: "/hertanate-assets/features/feature-2.png",
    title: "Leaderboard Donator",
    description: `Jadilah top donator dan dapatkan pengakuan spesial dari komunitas serta rewards menarik`,
  },
  {
    icon: "/hertanate-assets/features/feature-3.png",
    title: "Tier Benefits",
    description: `Nikmati berbagai keuntungan eksklusif seperti badge spesial, akses konten premium, dan merchandise limited edition`,
  },
];
