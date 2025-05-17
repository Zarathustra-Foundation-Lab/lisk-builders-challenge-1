"use client";
import React, { ChangeEvent } from "react";
import { BiImageAdd } from "react-icons/bi";
import Image from "next/image";

interface CreatorInformationProps {
  username: string;
  setUsername: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  bio: string;
  setBio: (value: string) => void;
  image: File | undefined;
  imagePreview: string;
  setImage: (value: File) => void;
  setImagePreview: (value: string) => void;
}

export default function CreatorInformation({
  username,
  setUsername,
  name,
  setName,
  bio,
  setBio,
  imagePreview,
  setImagePreview,
  image,
  setImage,
}: CreatorInformationProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-75 disabled:select-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-75 disabled:select-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">Bio</label>
        <textarea
          placeholder="Tell us about yourself!"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary resize-none h-24 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-75 disabled:select-none"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">
          Profile Photo
        </label>
        <label className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary hover:bg-gray-50 flex items-center justify-center gap-2 cursor-pointer">
          <BiImageAdd className="bx bx-image-add text-xl text-gray-500"></BiImageAdd>
          <span className="text-gray-500">Choose Image</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.files && e.target.files[0]) {
                setImage(e.target!.files?.[0]!);

                // get preview
                const reader = new FileReader();
                reader.onload = (event) => {
                  if (event.target?.result) {
                    setImagePreview(event.target.result as string);
                  }
                };
                reader.readAsDataURL(e.target.files[0]);
              }
            }}
          />
        </label>
        {imagePreview && (
          <div className="w-32 h-32 relative mt-5 rounded-full overflow-hidden border-2 border-primary mx-auto">
            <Image
              src={imagePreview}
              alt="Profile preview"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}
