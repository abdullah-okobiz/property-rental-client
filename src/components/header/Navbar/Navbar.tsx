/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineUser } from "react-icons/hi";
import { Dropdown, message } from "antd";

import logo from "@/assets/logo/stayverz.png";
import { menuList } from "@/utilits/menuList";
import { poppins } from "@/app/font";
import SignupModal from "@/components/modals/SignUpModal";
import LoginModal from "@/components/modals/LoginModal";
import useAuth from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { AuthServices } from "@/services/auth/auth.service";

const { processLogout } = AuthServices;

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { user, isAuthenticated } = useAuth();
  console.log("user ", user);

  const { mutate: logout } = useMutation({
    mutationFn: processLogout,
    onSuccess: () => {
      localStorage.setItem("hasLoggedOut", "true");
      message.success("Logout Successful");
      localStorage.removeItem("accessToken");
      setTimeout(() => window.location.reload(), 1000);
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Logout failed");
    },
  });

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchProfileItems = [
    {
      key: "host",
      label: "Switch to Host",
      disabled: user?.role === "host",
      onClick: () => {
        if (user?.role !== "host") setShowLoginModal(true);
      },
    },
    {
      key: "guest",
      label: "Switch to Guest",
      disabled: user?.role === "guest",
      onClick: () => {
        if (user?.role !== "guest") setShowLoginModal(true);
      },
    },
  ];

  const profileItems = [
    {
      key: "profile",
      label: <Link href="/profile">Profile</Link>,
    },
    {
      key: "settings",
      label: <Link href="/settings">Settings</Link>,
    },
    {
      key: "logout",
      label: (
        <button
          className="cursor-pointer w-full text-left"
          onClick={() => logout()}
        >
          Logout
        </button>
      ),
    },
  ];

  return (
    <>
      <div
        className={`w-full top-0 z-50 transition-all ease-in-out transform duration-300 ${
          isSticky ? "fixed bg-white shadow-md" : "relative"
        }`}
      >
        <div className="Container py-2 md:py-2 shadow-sm">
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
              {isAuthenticated && (user as any)?.isVerified ? (
                <>
                  <Dropdown
                    menu={{ items: switchProfileItems }}
                    trigger={["hover"]}
                    placement="bottomLeft"
                  >
                    <button className="px-4 py-2 bg-primary text-white rounded">
                      Switch Profile
                    </button>
                  </Dropdown>

                  <Dropdown
                    menu={{ items: profileItems }}
                    trigger={["hover"]}
                    placement="bottomLeft"
                  >
                    <div className="flex space-x-3 items-center border border-[#DDDDDD] cursor-pointer p-[.5rem] rounded-full">
                      <button className="p-2 border rounded-full border-primary ">
                        <HiOutlineUser className="text-primary" />
                      </button>
                      <span>{user?.role}</span>
                    </div>
                  </Dropdown>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="flex cursor-pointer items-center gap-1 border border-primary px-4 py-1 rounded"
                  >
                    <span className="p-1 rounded-full bg-primary text-[#fff]">
                      <HiOutlineUser />
                    </span>
                    <span>Login</span>
                  </button>
                  <button
                    onClick={() => setShowModal(true)}
                    className="px-6 py-2 cursor-pointer bg-primary rounded !text-[#fff] hidden md:block"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SignupModal open={showModal} onClose={() => setShowModal(false)} />
      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default Navbar;
