import Link from "next/link";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTwitter,
  BiLogoYoutube,
} from "react-icons/bi";

export interface SocialLinksProps {
  type: "facebook" | "instagram" | "twitter" | "youtube";
  usernameSocial: string;
  icon: React.ReactNode;
}

export const SocialLinks_DUMMY: SocialLinksProps[] = [
  {
    type: "facebook",
    icon: <BiLogoFacebook className="bx bxl-facebook text-xl text-primary" />,
    usernameSocial: "hertanate",
  },
  {
    type: "instagram",
    icon: <BiLogoInstagram className="bx bxl-facebook text-xl text-primary" />,
    usernameSocial: "hertanate",
  },
  {
    type: "twitter",
    icon: <BiLogoTwitter className="bx bxl-facebook text-xl text-primary" />,
    usernameSocial: "hertanate",
  },
  {
    type: "youtube",
    icon: <BiLogoYoutube className="bx bxl-facebook text-xl text-primary" />,
    usernameSocial: "hertanate",
  },
];

export default function SocialLinks(props: SocialLinksProps) {
  return (
    <Link
      href="#"
      className="w-full px-4 py-2 flex items-center gap-2 rounded-md bg-primary/5 hover:bg-primary/10 transition-colors"
    >
      {/* <BiLogoFacebook className="bx bxl-facebook text-xl text-primary" /> */}
      {props.icon}
      <span className="text-sm text-gray-600">@{props.usernameSocial}</span>
    </Link>
  );
}
