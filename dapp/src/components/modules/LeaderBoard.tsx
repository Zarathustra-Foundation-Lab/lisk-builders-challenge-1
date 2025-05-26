import Image from "next/image";
import { BiUser } from "react-icons/bi";
import LandingLeaderBoard from "@/components/layouts/landing/LandingLeaderBoard";
import { IMAGE_URLS } from "@/constants/images";

interface LeaderBoardItem {
  image?: string;
  key: string;
  value: string;
}

interface LeaderBoardProps {
  type: "dummy" | "activate";
  title: string;
  data?: LeaderBoardItem[];
  isLoading?: boolean;
  error?: string | null;
}

export default function LeaderBoardCard(props: LeaderBoardProps) {
  if (props.type == "dummy") {
    return <LandingLeaderBoard />;
  }

  return (
    <div className="hidden md:block w-full bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-br from-[#806699] to-[#6451AB] p-4">
        <h3 className="text-xl font-bold text-white text-center">
          {props.title ? props.title : "Top Supporters"}
        </h3>
      </div>
      <div className="divide-y divide-gray-200">
        {props.isLoading ? (
          <div className="flex items-center justify-center p-4">
            <div className="animate-pulse">Loading...</div>
          </div>
        ) : props.error ? (
          <div className="text-red-500 text-center p-4">{props.error}</div>
        ) : props.data?.length ? (
          props.data.map(({ key, value }, idx) => {
            return (
              <div
                key={idx}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {props.data?.length && props.data[0].image ? (
                    <Image
                      height={100}
                      width={100}
                      src={IMAGE_URLS.MADAM_HERTA}
                      alt="Madam Herta"
                      className="w-12 aspect-square rounded-full object-cover object-center"
                    />
                  ) : (
                    <BiUser className="bx bxs-user text-3xl text-primary bg-primary/10 p-2 h-max rounded-full"></BiUser>
                  )}

                  <span className="font-medium"> {key}</span>
                </div>
                <span className="text-[#6451AB] font-bold">{value} IDRX</span>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center text-center">
            <h3 className="font-medium text-lg text-gray-600 pt-3">
              No History
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
