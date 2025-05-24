"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import logo from "@/assets/logo/stayverz.png";

const TopNavWithAction = () => {
  const router = useRouter();

  const handleNext = () => {
    router.push("/host-dashboard");
  };

  return (
    <div className="Container bg-white sticky-top shadow-sm py-3 px-4 md:px-10 flex justify-between items-center">
      <Image
        src={logo}
        alt="Stayverz Logo"
        width={80}
        height={80}
        className="h-[60px] w-[70px]"
      />

      <Button
        onClick={handleNext}
        className="!rounded-full !bg-white !border !border-amber-400 !font-bold  px-6 py-2 text-base"
      >
        Save & Exit
      </Button>
    </div>
  );
};

export default TopNavWithAction;
