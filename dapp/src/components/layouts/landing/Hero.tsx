"use client";
import Image from "next/image";
import Link from "next/link";
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
      staggerChildren: 0.1,
    },
  },
};

export default function HeroSection() {
  return (
    <div className="w-full h-[80vh] lg:h-screen bg-[#ffeff9fa]" id="hero">
      <motion.div
        className="h-full flex items-center px-8 z-40 lg:-translate-y-20"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div
          className="w-full lg:w-1/2 max-md:h-full flex flex-col justify-center max-md:items-center gap-6"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <motion.h1 className="text-3xl md:text-5xl font-semibold text-center md:text-left">
              Hertanate <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-[#806699] to-[#846ae4] text-transparent bg-clip-text">
                Decentralized{"\u00A0"}
              </span>
              <span className="md:hidden">Donation</span>
              <span className="hidden md:inline">Donation for Creators</span>
            </motion.h1>
            <motion.p
              className="text-base md:text-xl font-light text-gray-600 text-center md:text-left"
              variants={fadeInUp}
            >
              Dukung kreator favoritmu dengan transparansi dan teknologi
              blockchain
            </motion.p>
          </motion.div>

          <motion.div
            className="relative z-10 group w-max"
            variants={fadeInUp}
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 400, damping: 10 },
            }}
          >
            <Image
              width={48}
              height={48}
              src="/herta_hold_hat.gif"
              alt="Herta Hold Hat"
              className="w-12 left-full -translate-x-1 rotate-90 group-hover: absolute -z-10"
            />
            <Link
              href={"/sign-up"}
              className="w-fit px-8 py-3 bg-[#6451AB] text-white rounded-lg font-medium shadow-lg hover:shadow-[#6451AB]/50 transition-all"
            >
              Get Started
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full max-w-fit mx-auto hidden md:w-1/2 max-md:order-first lg:flex justify-center items-center relative"
          variants={fadeInUp}
          animate={{
            y: [0, -15, 0],
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          {/* herta */}
          <div className="max-md:hidden absolute right-30 -bottom-15 z-10">
            <Image
              unoptimized
              height={270}
              width={270}
              src="/hero-hertanate.png"
              alt="The Herta"
              className="max-md:hidden -translate-x-10 "
            />
          </div>

          {/* eth card */}
          <motion.div className="relative w-lg h-60">
            <div className="w-72 h-32 md:w-70 md:h-38 absolute -bottom-10 left-0 animate-floating bg-gradient-to-br from-[#806699]/85 to-[#6451AB]/85 rounded-2xl p-6  overflow-hidden shadow-xl z-30 hover:shadow-[#6451AB]/50 transition-all hover:-translate-y-1">
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>

              <div className="flex flex-col justify-between h-full text-white">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-light">Current Balance</p>
                  <div className="w-12 h-8 bg-white/20 rounded-lg backdrop-blur-sm flex items-center justify-center p-2">
                    <Image
                      width={12}
                      height={12}
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1200px-Ethereum_logo_2014.svg.png"
                      className="w-3"
                      alt="IDRX"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="font-semibold tracking-wider">
                    150.000.00 IDRX
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-light tracking-widest">
                      **** **** **** 1234
                    </p>
                    <p className="text-xs font-light">HERTANATE</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-72 h-32 md:w-70 md:h-38 absolute top-15 -right-2 animate-delay-floating z-20 bg-gradient-to-br from-[#487A92]/85 to-[#3FD3CC]/85 rounded-2xl p-6 overflow-hidden shadow-xl hover:shadow-[#3FD3CC]/50 transition-all hover:-translate-y-1">
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#465E6A]/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-[#E1620C]/20 rounded-full blur-2xl"></div>

              <div className="flex flex-col justify-between h-full text-white">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-light">Current Balance</p>
                  <div className="w-12 h-8 bg-white/20 rounded-lg backdrop-blur-sm flex items-center justify-center p-2">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1200px-Ethereum_logo_2014.svg.png"
                      className="w-3"
                      alt="IDRX"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="font-semibold tracking-wider">
                    100.000.00 IDRX
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-light tracking-widest">
                      **** **** **** 0275
                    </p>
                    <p className="text-xs font-light">FIREFLY</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
