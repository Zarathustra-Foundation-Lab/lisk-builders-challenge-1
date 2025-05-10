import Image from "next/image";
import React from "react";

import {
  BiWallet,
  BiImageAdd,
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTwitter,
  BiLogoYoutube,
  BiLink,
} from "react-icons/bi";

export default function SignUpPage() {
  return (
    <div className="w-full min-h-dvh flex justify-center bg-primary/5 md:py-14">
      <div className="w-full md:w-lg bg-white rounded-lg shadow-lg flex flex-col gap-8 p-4">
        <div>
          <h1 className="text-2xl font-bold">
            Connect <span className="text-primary">Wallet</span>
          </h1>
          <p className="text-sm text-gray-500">
            Connect your wallet to receive donation from your fans!
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <p className="text-lg font-medium flex gap-2 items-center">
            <span className="text-base bg-gradient-to-r from-primary to-[#d33f6e] text-white font-medium px-2 rounded-full">
              1
            </span>
            Connect Wallet
          </p>
          <div className="relative z-10 group">
            <Image
              width={100}
              height={100}
              src="/herta_hold_hat.gif"
              alt="Herta Pointing To You"
              className="w-12 -top-7 group-hover:-top-8 transition-all left-0 absolute -z-10"
            />
            <button className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-primary to-[#d33f6e] text-white rounded-lg font-medium shadow-lg hover:shadow-primary/50 transition-all group-hover:-translate-y-1 flex items-center justify-center gap-2">
              <BiWallet className="bx bx-wallet text-xl"></BiWallet>
              Connect Wallet
            </button>
          </div>
        </div>

        <div>
          <p className="text-lg font-medium flex gap-2 items-center">
            <span className="text-base bg-gradient-to-r from-primary to-[#d33f6e] text-white font-medium px-2 rounded-full">
              2
            </span>
            Fill Details
            <Image
              height={100}
              width={100}
              src="/herta_pointing.webp"
              alt="Herta Pointing To You"
              className="w-12"
            />
          </p>
          <form className="w-full mt-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-75 disabled:select-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-75 disabled:select-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">Bio</label>
              <textarea
                placeholder="Tell us about yourself!"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary resize-none h-24 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-75 disabled:select-none"
              ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">
                Profile Photo
              </label>
              <label className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary cursor-not-allowed hover:bg-gray-50 flex items-center justify-center gap-2 bg-gray-100 opacity-75 select-none">
                <BiImageAdd className="bx bx-image-add text-xl text-gray-500"></BiImageAdd>
                <span className="text-gray-500">Choose Image</span>
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">
                Social Media
              </label>
              <div className="w-full px-4 py-2 border border-gray-200 rounded-lg focus-within:border-primary flex items-center gap-2 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-75 disabled:select-none">
                <BiLogoFacebook className="bx bxl-facebook text-xl text-primary"></BiLogoFacebook>
                <input
                  type="url"
                  placeholder="Facebook profile link"
                  className="w-full focus:outline-none bg-transparent"
                />
              </div>
              <div className="w-full px-4 py-2 border border-gray-200 rounded-lg focus-within:border-primary flex items-center gap-2 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-75 disabled:select-none">
                <BiLogoInstagram className="bx bxl-instagram text-xl text-primary"></BiLogoInstagram>
                <input
                  type="url"
                  placeholder="Instagram profile link"
                  className="w-full focus:outline-none bg-transparent"
                />
              </div>
              <div className="w-full px-4 py-2 border border-gray-200 rounded-lg focus-within:border-primary flex items-center gap-2 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-75 disabled:select-none">
                <BiLogoTwitter className="bx bxl-twitter text-xl text-primary"></BiLogoTwitter>
                <input
                  type="url"
                  placeholder="Twitter profile link"
                  className="w-full focus:outline-none bg-transparent"
                />
              </div>
              <div className="w-full px-4 py-2 border border-gray-200 rounded-lg focus-within:border-primary flex items-center gap-2 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-75 disabled:select-none">
                <BiLogoYoutube className="bx bxl-youtube text-xl text-primary"></BiLogoYoutube>
                <input
                  type="url"
                  placeholder="Youtube channel link"
                  className="w-full focus:outline-none bg-transparent"
                />
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <label className="text-sm font-medium text-gray-600">
                  Additional Link
                </label>
                <div className="w-full px-4 py-2 border border-gray-200 rounded-lg focus-within:border-primary flex items-center gap-2 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-75 disabled:select-none">
                  <BiLink className="bx bx-link text-xl text-primary"></BiLink>
                  <input
                    type="url"
                    placeholder="Your website or other social media"
                    className="w-full focus:outline-none bg-transparent"
                  />
                </div>
                {/* <!-- bisa nambah lagi aja disini kalau user bisa nambah link lagi --> */}
              </div>
              <div className="relative z-10 group mt-8">
                <Image
                  height={100}
                  width={100}
                  src="/herta_excited.jpg"
                  alt="Herta Excited"
                  className="w-12 -top-7 right-0 group-hover:-top-8 transition-all absolute -z-10"
                />
                <button className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-primary to-[#d33f6e] text-white rounded-lg font-medium shadow-lg group-hover:shadow-primary/50 transition-all group-hover:-translate-y-1 flex items-center justify-center gap-2">
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
