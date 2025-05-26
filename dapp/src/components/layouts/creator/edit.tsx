"use client";
import { Creator } from "@/stores/creator.store";
import React from "react";
import {
  BiLink,
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTwitter,
  BiLogoYoutube,
} from "react-icons/bi";

interface Props {
  creator: Creator;
  setEditModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function ParseUrlSocials(socials: string) {
  const _socialArr = socials.split(";");
  const data = {
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
    additional: "",
  };

  _socialArr.forEach((soc) => {
    if (!soc.startsWith("https://")) {
      soc = `https://${soc}`;
    }

    if (soc.startsWith("https://facebook.com")) {
      data.facebook = soc;
    } else if (soc.startsWith("https://instagram.com")) {
      data.instagram = soc;
    } else if (soc.startsWith("https://x.com")) {
      data.twitter = soc;
    } else if (soc.startsWith("https://youtube.com")) {
      data.youtube = soc;
    } else {
      data.additional = soc;
    }
  });

  return data;
}

export default function EditModalCreator({
  creator,
  setEditModalActive,
}: Props) {
  const social = ParseUrlSocials(creator.detail.socials);

  return (
    <div className="fixed inset-0 bg-white/20 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="scale-90 w-full max-w-md bg-white rounded-lg shadow-lg p-6 overflow-scroll">
        <h3 className="text-xl font-bold mb-4 text-primary">Edit Profile</h3>
        <div className="space-y-4">
          {/* <div className="space-y-2">
            <label className="block font-medium">Profile Image URL</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Paste image URL"
            />
          </div> */}

          <div className="space-y-2">
            <label className="block font-medium text-gray-600">Name</label>
            <input
              type="text"
              defaultValue={creator.detail.name}
              className="w-full p-2 border rounded text-gray-600"
              placeholder="Your display name"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium text-gray-600">Bio</label>
            <textarea
              defaultValue={creator.detail.bio}
              className="w-full p-2 border rounded min-h-[100px] text-gray-600"
              placeholder="Tell about yourself"
            />
          </div>
          <div className="space-y-2">
            <label className="block font-medium text-gray-600">Social</label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full px-4 py-2 border border-gray-200 rounded-lg focus-within:border-primary flex items-center gap-2 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-75 disabled:select-none">
                <BiLogoFacebook className="bx bxl-facebook text-xl text-primary"></BiLogoFacebook>
                <input
                  type="url"
                  defaultValue={social.facebook}
                  placeholder="Facebook profile link"
                  className="w-full focus:outline-none bg-transparent text-gray-600"
                />
              </div>
              <div className="w-full px-4 py-2 border border-gray-200 rounded-lg focus-within:border-primary flex items-center gap-2 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-75 disabled:select-none">
                <BiLogoInstagram className="bx bxl-instagram text-xl text-primary"></BiLogoInstagram>
                <input
                  type="url"
                  defaultValue={social.instagram}
                  placeholder="Instagram profile link"
                  className="w-full focus:outline-none bg-transparent text-gray-600"
                />
              </div>
              <div className="w-full px-4 py-2 border border-gray-200 rounded-lg focus-within:border-primary flex items-center gap-2 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-75 disabled:select-none">
                <BiLogoTwitter className="bx bxl-twitter text-xl text-primary"></BiLogoTwitter>
                <input
                  type="url"
                  defaultValue={social.twitter}
                  placeholder="Twitter profile link"
                  className="w-full focus:outline-none bg-transparent text-gray-600"
                />
              </div>
              <div className="w-full px-4 py-2 border border-gray-200 rounded-lg focus-within:border-primary flex items-center gap-2 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-75 disabled:select-none">
                <BiLogoYoutube className="bx bxl-youtube text-xl text-primary"></BiLogoYoutube>
                <input
                  type="url"
                  defaultValue={social.youtube}
                  placeholder="Youtube channel link"
                  className="w-full focus:outline-none bg-transparent text-gray-600"
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
                    defaultValue={social.additional}
                    placeholder="Your website or other social media"
                    className="w-full focus:outline-none bg-transparent text-gray-600"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setEditModalActive(false)}
              type="button"
              className="text-gray-500 border border-gray-300 py-2 px-4 rounded hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-white py-2 px-4 rounded hover:bg-primary/80 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
