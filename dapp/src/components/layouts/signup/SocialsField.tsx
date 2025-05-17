"use client";
import React from "react";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTwitter,
  BiLogoYoutube,
  BiLink,
} from "react-icons/bi";

interface SocialsFieldProps {
  socials: {
    facebook: string;
    youtube: string;
    instagram: string;
    twitter: string;
    additional: string;
  };
  setSocials: React.Dispatch<
    React.SetStateAction<{
      facebook: string;
      youtube: string;
      instagram: string;
      twitter: string;
      additional: string;
    }>
  >;
}

export default function SocialsField({
  socials,
  setSocials,
}: SocialsFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-600">Social Media</label>
      <div className="w-full px-4 py-2 border border-gray-200 rounded-lg focus-within:border-primary flex items-center gap-2 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-75 disabled:select-none">
        <BiLogoFacebook className="bx bxl-facebook text-xl text-primary"></BiLogoFacebook>
        <input
          type="url"
          placeholder="Facebook profile link"
          className="w-full focus:outline-none bg-transparent"
          value={socials.facebook}
          onChange={(e) => setSocials({ ...socials, facebook: e.target.value })}
        />
      </div>
      <div className="w-full px-4 py-2 border border-gray-200 rounded-lg focus-within:border-primary flex items-center gap-2 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-75 disabled:select-none">
        <BiLogoInstagram className="bx bxl-instagram text-xl text-primary"></BiLogoInstagram>
        <input
          type="url"
          placeholder="Instagram profile link"
          className="w-full focus:outline-none bg-transparent"
          value={socials.instagram}
          onChange={(e) =>
            setSocials({ ...socials, instagram: e.target.value })
          }
        />
      </div>
      <div className="w-full px-4 py-2 border border-gray-200 rounded-lg focus-within:border-primary flex items-center gap-2 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-75 disabled:select-none">
        <BiLogoTwitter className="bx bxl-twitter text-xl text-primary"></BiLogoTwitter>
        <input
          type="url"
          placeholder="Twitter profile link"
          className="w-full focus:outline-none bg-transparent"
          value={socials.twitter}
          onChange={(e) => setSocials({ ...socials, twitter: e.target.value })}
        />
      </div>
      <div className="w-full px-4 py-2 border border-gray-200 rounded-lg focus-within:border-primary flex items-center gap-2 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-75 disabled:select-none">
        <BiLogoYoutube className="bx bxl-youtube text-xl text-primary"></BiLogoYoutube>
        <input
          type="url"
          placeholder="Youtube channel link"
          className="w-full focus:outline-none bg-transparent"
          value={socials.youtube}
          onChange={(e) => setSocials({ ...socials, youtube: e.target.value })}
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
            value={socials.additional}
            onChange={(e) =>
              setSocials({ ...socials, additional: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}
