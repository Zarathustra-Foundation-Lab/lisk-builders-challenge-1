"use client";
import React from "react";
import Navbar from "@/components/modules/Navbar";
import Profile from "@/components/layouts/creator/profile";
import DestopProfile from "@/components/layouts/creator/destop";

import { useParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { getCreatorByUsername } from "@/services/creator.service";
import {
  getRecentDonations,
  getTopSupporters,
} from "@/services/donations.service";

export default function CreatorPage() {
  const params = useParams<{ username: string }>() || "";

  const { data: creatorData, isLoading: isCreatorLoading } = useQuery({
    queryKey: ["creator", params.username],
    queryFn: () => getCreatorByUsername(params.username),
  });

  const { data: donationsData, isLoading: isDonationsLoading } = useQuery({
    queryKey: ["donations", params.username],
    queryFn: () => getRecentDonations(creatorData?.data?.creatorAddress),
    enabled: !!creatorData?.data,
  });

  const { data: supportersData, isLoading: isSupportersLoading } = useQuery({
    queryKey: ["supporters", params.username],
    queryFn: () => getTopSupporters(creatorData?.data?.creatorAddress),
    enabled: !!creatorData?.data,
  });

  const creator = creatorData?.data;
  const recentDonations = donationsData || [];
  const topSupporters = supportersData || [];

  const isLoading =
    isCreatorLoading || isDonationsLoading || isSupportersLoading;

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <h2 className="font-medium text-2xl text-center">Loading...</h2>
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
          <Profile creator={creator} totalSupporters={topSupporters.length} />

          {/* <!-- Main Content Section & Destop Show --> */}
          <DestopProfile
            recentDonations={recentDonations}
            topSupporters={topSupporters}
            creatorAddress={creator.creatorAddress!}
          />
        </div>
      </div>
    </>
  );
}
