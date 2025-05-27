"use client";
import Image from "next/image";
import React from "react";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import LeaderBoardCard from "../../modules/LeaderBoard";

import { motion } from "framer-motion";

export default function HowItWorkSection() {
  return (
    <div className="w-full h-full lg:h-[80vh] py-20 md:py-12 flex flex-col justify-center px-8 gap-4 bg-[#fef7ff]">
      <h2 className="text-3xl lg:text-4xl font-bold text-[#6451AB] mt-20 mx-auto lg:mx-10">
        How It Works
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full lg:gap-x-5">
        <motion.div
          initial={{
            translateX: -40,
          }}
          whileInView={{
            translateX: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="flex flex-col md:flex-row items-center justify-center col-span-1 "
        >
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
        </motion.div>

        {/* leader board */}
        <motion.div
          initial={{
            translateX: 40,
          }}
          whileInView={{
            translateX: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="hidden lg:block w-fit mx-auto"
        >
          <LeaderBoardCard type="dummy" title="Top Supporters" />
        </motion.div>
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
      <motion.div className="w-full flex flex-col items-center text-center gap-2 max-w-xs">
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
      </motion.div>

      <motion.div className="">
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
      </motion.div>
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
