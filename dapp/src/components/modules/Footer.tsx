import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bottom-0 left-0 w-full">
      <div className="text-xs w-full h-12 px-4 bg-gradient-to-br from-[#806699] to-[#6451AB] text-white grid grid-cols-3 items-center">
        <div className="">
          <p className="max-md:hidden font-medium text-xl text-white font-inter">
            Hertanate
          </p>
        </div>
        <ul className="flex gap-2 md:gap-4">
          <li className="flex items-center gap-1 md:gap-2">
            <i className="bx bxl-instagram"></i> Instagram
          </li>
          <li className="flex items-center gap-1 md:gap-2">
            <i className="bx bxl-twitter"></i> Twitter
          </li>
          <li className="flex items-center gap-1 md:gap-2">
            <i className="bx bxl-facebook"></i> Facebook
          </li>
          <li className="flex items-center gap-1 md:gap-2">
            <i className="bx bxl-discord"></i> Discord
          </li>
          <li className="flex items-center gap-1 md:gap-2">
            <i className="bx bxl-github"></i> Github
          </li>
        </ul>
        <p className="max-md:hidden md:text-sm font-light text-right">
          © <span id="date"></span> Hertanate. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
