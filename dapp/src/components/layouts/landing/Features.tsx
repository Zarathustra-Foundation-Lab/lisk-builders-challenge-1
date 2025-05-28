"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const hoverSpring = {
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

export default function FeatureSection() {
  return (
    <motion.div
      className="w-full h-full lg:h-[80vh] flex items-center px-8 py-20 md:py-12 bg-[#fef7ff]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div
        className="lg:h-max grid grid-cols-1 grid-flow-row md:grid-cols-3 gap-8 lg:gap-5 place-items-center place-content-center"
        variants={staggerContainer}
      >
        {DATA.map((item, idx) => {
          return (
            <motion.div
              key={`feature-card-${idx}`}
              initial={fadeInUp.hidden}
              whileInView={fadeInUp.visible}
            >
              <FeatureCard
                title={item.title}
                icon={item.icon}
                description={item.description}
                key={idx}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

interface FeatureProp {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard = (props: FeatureProp) => {
  return (
    <motion.div
      className="bg-gradient-to-br max-md:h-max from-[#806699]/10 to-[#6451AB]/10 p-4 md:p-8 rounded-2xl lg:backdrop-blur-sm border border-white/10 hover:border-[#6451AB]/50 transition-all group"
      whileHover={hoverSpring}
    >
      <div className="flex flex-col items-center text-center gap-4">
        <motion.div
          className="w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center"
          whileHover={{
            y: [-5, 0, -5],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <Image
            alt=""
            src={props.icon ?? "/hertanate-assets/features/feature-1.png"}
            width={100}
            height={100}
          />
        </motion.div>
        <h3 className="md:text-xl font-semibold text-[#6451AB]">
          {props.title}
        </h3>
        <p className="text-sm text-gray-600">{props.description}</p>
      </div>
    </motion.div>
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
