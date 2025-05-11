import Image from "next/image";

export default function Navbar() {
  return (
    <header className="w-full pt-2 bg-white z-50">
      <nav className="flex justify-between items-center px-8 py-4 text-black">
        <div className="font-semibold md:text-xl">
          <Image
            width={200}
            height={100}
            src={"/hertanate-assets/hertanate-icon.svg"}
            alt="Hertanate Icon"
            className="w-[120px] lg:w-[200px]"
          />
        </div>

        <div className="flex items-center gap-x-14">
          {/* <ul className="flex gap-x-8">
            <li className="font-montserrat text-xl font-medium hover:cursor-pointer hover:text-primary/70 transition-colors">
              Profile
            </li>
            <li className="font-montserrat text-xl font-medium hover:cursor-pointer hover:text-primary/70 transition-colors">
              Support
            </li>
            <li className="font-montserrat text-xl font-medium hover:cursor-pointer hover:text-primary/70 transition-colors">
              Developer
            </li>
          </ul> */}
          <button className="w-fit px-4 py-3 max-md:text-sm bg-[#6451AB] text-white rounded-lg font-medium shadow-lg hover:shadow-[#6451AB]/50 transition-all hover:-translate-y-1">
            Connect Wallet
          </button>
        </div>
      </nav>
    </header>
  );
}
