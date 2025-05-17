"use client";
import React from "react";
import Navbar from "@/components/modules/Navbar";
import Profile from "@/components/layouts/creator/profile";
import DestopProfile from "@/components/layouts/creator/destop";

import { useParams } from "next/navigation";

import { getCreatorByUsername } from "@/actions/creator.action";

export default function CreatorPage() {
  const params = useParams<{ username: string }>() || "";

  const { creator, error, isLoading } = getCreatorByUsername(params.username);

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <h2 className="font-medium text-2xl text-center">Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex justify-center items-center">
        <h2 className="font-medium text-2xl text-center">Error loading data</h2>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="h-full flex justify-center items-center">
        <h2 className="font-medium text-2xl text-center">Creator Not Found</h2>
      </div>
    );
  }

  return (
    <>
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <div className="w-full min-h-dvh flex justify-center bg-primary/5">
        <div className="w-full min-h-dvh flex flex-col lg:grid grid-cols-[1fr_3fr] grid-rows-1 gap-4 p-4 md:p-8">
          {/* <!-- User Profile Section & Mobile show --> */}
          <Profile creator={creator} totalSupporters={0} />

          {/* <!-- Main Content Section & Destop Show --> */}
          <DestopProfile
            recentDonations={[]}
            topSupporters={[]}
            creatorAddress={creator.creatorAddress}
          />
        </div>
      </div>
    </>
  );
}
