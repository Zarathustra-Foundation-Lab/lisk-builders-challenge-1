"use client";
import React, { useState } from "react";
import Image from "next/image";
import { BiWallet } from "react-icons/bi";
import CreatorInformation from "./CreatorInformation";
import SocialsField from "./SocialsField";

import { ConnectButton } from "@xellar/kit";
import { signupCreator } from "@/actions/hertanate.action";
import { joinSocials } from "@/utils/utils";
import { useAccount, useWalletClient } from "wagmi";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [name, setname] = useState("");
  const [bio, setBio] = useState("");

  const [image, setImage] = useState<File | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState("");

  const [socials, setSocials] = useState({
    facebook: "",
    youtube: "",
    instagram: "",
    twitter: "",
    additional: "",
  });

  const { address } = useAccount();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignupCreator = async () => {
    if (!username || !name) {
      setError("Username and name are required");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const socialArray = [
        socials.facebook,
        socials.youtube,
        socials.instagram,
        socials.twitter,
        socials.additional,
      ].filter(Boolean);

      const socialsString = joinSocials(socialArray);

      console.log(socialsString);

      await signupCreator({
        userAddress: address!,
        username,
        displayName: name,
        image: imagePreview,
        description: bio,
        socials: socialsString,
      });
    } catch (err) {
      console.error("Signup failed:", err);
      setError("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full md:w-lg h-max bg-white rounded-lg shadow-lg flex flex-col gap-8 p-4">
      <div>
        <h1 className="text-2xl font-bold">
          Connect <span className="text-primary">Wallet</span>
        </h1>
        <p className="text-sm text-gray-500">
          Connect your wallet to receive donation from your fans!
        </p>
      </div>

      <div className="gap-8 flex flex-col">
        {/* step 1 */}
        {!address && (
          <div className="flex flex-col gap-8">
            <p className="text-lg font-medium flex gap-2 items-center">
              <span className="text-base bg-gradient-to-r from-primary to-[#d33f6e] text-white font-medium px-2 rounded-full">
                1
              </span>
              Connect Wallet
            </p>
            <div className="relative z-10 group">
              {!address && (
                <Image
                  width={100}
                  height={100}
                  src="/herta_hold_hat.gif"
                  alt="Herta Pointing To You"
                  className="w-12 -top-7 group-hover:-top-8 transition-all left-0 absolute -z-10"
                />
              )}
              <ConnectButton.Custom
                children={({
                  openConnectModal,
                  account,
                  isConnected,
                  openProfileModal,
                }) => {
                  if (isConnected && account?.address) {
                    return (
                      <h6
                        onClick={() => openProfileModal()}
                        className="w-full py-3 px-5 rounded-lg font-medium text-white  bg-gradient-to-r from-primary to-[#d33f6e] truncate cursor-pointer"
                      >
                        {account.address}
                      </h6>
                    );
                  }

                  return (
                    <button
                      onClick={() => openConnectModal()}
                      className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-primary to-[#d33f6e] text-white rounded-lg font-medium shadow-lg hover:shadow-primary/50 transition-all group-hover:-translate-y-1 flex items-center justify-center gap-2"
                    >
                      <BiWallet className="bx bx-wallet text-xl"></BiWallet>
                      Connect Wallet
                    </button>
                  );
                }}
              />
            </div>
          </div>
        )}

        {/* step 2 */}
        {address && (
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
            <form className="w-full mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <CreatorInformation
                username={username}
                setUsername={setUsername}
                name={name}
                setName={setname}
                bio={bio}
                setBio={setBio}
                image={image}
                setImage={setImage}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />

              <SocialsField socials={socials} setSocials={setSocials} />
              <div className="relative z-10 group lg:col-span-2">
                <Image
                  height={100}
                  width={100}
                  src="/herta_excited.jpg"
                  alt="Herta Excited"
                  className="w-12 -top-7 right-0 group-hover:-top-8 transition-all absolute -z-10"
                />
                <button
                  className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-primary to-[#d33f6e] text-white rounded-lg font-medium shadow-lg group-hover:shadow-primary/50 transition-all group-hover:-translate-y-1 flex items-center justify-center gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSignupCreator();
                    // TODO: Add form submission logic
                  }}
                >
                  {isLoading ? "Processing..." : "Sign Up"}
                </button>
              </div>
            </form>
            {error && (
              <div className="text-red-500 text-sm mt-4 text-center">
                {error}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
