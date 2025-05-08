"use client";
import React, { useEffect, useState } from "react";
import logo from "@/assets/logo/stayverz.png";
import Image from "next/image";
import { menuList } from "@/utilits/menuList";
import Link from "next/link";
import { HiOutlineUser } from "react-icons/hi";
import { poppins } from "@/app/font";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full top-0 z-50 transition-all ease-in-out transform duration-300 ${
        isSticky ? "fixed bg-white shadow-md" : "relative"
      }`}
    >
      <div className="Container py-2 md:py-2 shadow-sm ">
        <div className="flex items-center justify-between">
          <div>
            <Image
              src={logo}
              alt="logo"
              width={120}
              height={120}
              className="w-[80px] md:w-[70px]"
            />
          </div>

          <div className="lg:flex hidden items-center justify-center xl:gap-8 gap-6">
            {menuList?.map((menu) => (
              <div key={menu.id}>
                <Link href={menu.link}>
                  <li
                    className={`list-none text-base font-medium cursor-pointer ${poppins.className}`}
                  >
                    {menu.title}
                  </li>
                </Link>
              </div>
            ))}
          </div>

          <div
            className={`flex items-center justify-center gap-2 font-medium text-sm ${poppins.className}`}
          >
            <button className="flex cursor-pointer items-center gap-1 border border-primary px-4 py-1 rounded">
              <span className="p-1 rounded-full bg-primary text-[#fff]">
                <HiOutlineUser />
              </span>
              <span>Login</span>
            </button>
            <button className="px-6 py-2 cursor-pointer bg-primary rounded !text-[#fff] hidden md:block">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
