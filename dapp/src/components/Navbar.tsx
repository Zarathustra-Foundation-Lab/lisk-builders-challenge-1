import Image from "next/image";

export default function Navbar() {
  return (
    <header className="w-full fixed top-0 left-0 z-50 pt-2">
      <nav className="flex justify-between items-center px-8 py-4 text-black">
        {/* <div className="font-semibold md:text-xl">Hertanate</div> */}
        <div className="font-semibold md:text-xl">
          <Image
            width={200}
            height={100}
            src={"/hertanate-assets/hertanate-icon.svg"}
            alt="Hertanate Icon"
            className="w-[120px] lg:w-[200px]"
          />
        </div>

        <button className="w-fit px-4 py-3 max-md:text-sm bg-[#6451AB] text-white rounded-lg font-medium shadow-lg hover:shadow-[#6451AB]/50 transition-all hover:-translate-y-1">
          Connect Wallet
        </button>
      </nav>
    </header>
  );
}
