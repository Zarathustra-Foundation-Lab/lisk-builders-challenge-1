"use client";
import React from "react";
import Image from "next/image";
import { BiImageAdd, BiLink } from "react-icons/bi";
import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaLink,
  FaFacebook,
} from "react-icons/fa";
import SocialLinks from "./socials";

const getIconForDomain = (domain: string) => {
  switch (domain) {
    case "instagram.com":
      return <FaInstagram className="text-primary/80" />;
    case "twitter.com":
      return <FaTwitter className="text-primary/80" />;
    case "youtube.com":
      return <FaYoutube className="text-primary/80" />;
    case "tiktok.com":
      return <FaTiktok className="text-primary/80" />;
    case "facebook.com":
      return <FaFacebook className="text-primary/80" />;
    default:
      return <FaLink className="text-primary/80" />;
  }
};

import { formatUnits } from "viem";
import { useCreatorStore } from "@/stores/creator.store";

export default function Profile() {
  const { creator, totalSupporters } = useCreatorStore();

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-4 h-fit">
      <div className="flex flex-col items-center gap-4">
        {/* <!-- Banner --> */}
        <div className="hidden w-full h-32 bg-gradient-to-r from-primary to-light rounded-lg shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white"></div>
          </div>
        </div>
        {/* creator detail */}
        <div className="py-6 flex items-center flex-col gap-4 w-full">
          <label className="w-32 h-32 rounded-full bg-primary/20 overflow-hidden cursor-pointer hover:bg-primary/30 transition-colors relative group">
            <Image
              width={400}
              height={100}
              src={
                "https://upload-os-bbs.hoyolab.com/upload/2025/01/14/256651796/b78c1d2ed8c05bba57e2735d23329975_3892500857571519465.webp?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70"
              }
              alt="profile"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <BiImageAdd className="bx bx-image-add text-3xl text-white" />
            </div>
            <input type="file" accept="image/*" className="hidden" />
          </label>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-darker">
              {creator?.detail.name || "Creator Name"}
            </h1>
            <p className="text-sm text-gray-500">
              @{creator?.username || "username"}
            </p>
          </div>
          <h5 className="text-sm text-center text-gray-600">
            {creator?.detail.bio || "No bio yet"}
          </h5>

          <div className="w-full flex flex-col gap-2">
            <div className="flex-1 bg-primary/5 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500">Total Donasi</p>
              <p className="text-lg font-bold text-primary">
                {formatUnits(creator?.totalReceived || BigInt(0), 2)} IDRX
              </p>
            </div>
            <div className="flex-1 bg-primary/5 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500">Total Supporter</p>
              <p className="text-xl font-bold text-primary">
                {totalSupporters}
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col gap-2">
            {creator?.detail.socials
              ?.split(";")
              .filter((link) => link.trim() !== "")
              .map((link, idx) => {
                try {
                  const url = new URL(link);
                  const domain = url.hostname.replace("www.", "");
                  return (
                    <SocialLinks
                      key={`socials-creator-${idx}`}
                      icon={getIconForDomain(domain)}
                      link={link}
                      usernameSocial={url.pathname.replace("/", "")}
                    />
                  );
                } catch {
                  return null;
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

const DUMMY_SOCIALS =
  "https://www.facebook.com/ary.hidayat.54584;https://www.instagram.com/rezazacryptozorzor;https://www.youtube.com/channel/UCqdsVs7YMAXgBQgsQpPemDQ;https://rizkyreza.fun";
