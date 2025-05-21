"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineUser } from "react-icons/hi";
import { Dropdown, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import logo from "@/assets/logo/stayverz.png";
import { menuList } from "@/utilits/menuList";
import { poppins } from "@/app/font";
import SignupModal from "@/components/modals/SignUpModal";
import LoginModal from "@/components/modals/LoginModal";
import useAuth from "@/hooks/useAuth";
import { AuthServices } from "@/services/auth/auth.service";

const { processLogout } = AuthServices;

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const { user, isAuthenticated, logout: contextLogout } = useAuth();
  console.log("user ==", user);

  const { mutate: logout } = useMutation({
    mutationFn: processLogout,
    onMutate: () => setLoggingOut(true),
    onSuccess: () => {
      contextLogout();
      localStorage.removeItem("accessToken");
      localStorage.setItem("hasLoggedOut", "true");
      messageApi.success("Logout Successful");
      window.location.href = "/";
      setTimeout(() => {
        setLoggingOut(false);
      }, 300);
    },
    onError: () => {
      setLoggingOut(false);

      messageApi.error("Logout failed");
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
    ...(user?.role === "host"
      ? [
          {
            key: "switch",
            label: <Link href="/host-dashboard">Go to Host Dashboard</Link>,
          },
        ]
      : []),
    {
      key: "logout",
      label: (
        <button
          className="cursor-pointer w-full text-left"
          onClick={() => {
            console.log("Clicked Logout");
            logout();
          }}
          disabled={loggingOut}
        >
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <div
        className={`w-full top-0 z-50 transition-all ease-in-out duration-300 ${
          isSticky ? "fixed bg-white shadow-md" : "relative"
        }`}
      >
        <div className="Container py-2 md:py-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div>
              <Image
                src={logo}
                alt="logo"
                width={120}
                height={120}
                className="w-[80px] md:w-[70px]"
              />
            </div>

            {/* Menu Items */}
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

            {/* Auth Buttons or User Dropdown */}
            <div
              className={`flex items-center justify-center gap-2 font-medium text-sm ${poppins.className}`}
            >
              {isAuthenticated && (user as any)?.isVerified ? (
                <>
                  {/* Switch Profile */}
                  <Dropdown
                    menu={{ items: switchProfileItems }}
                    trigger={["hover"]}
                    placement="bottomLeft"
                  >
                    <button className="px-4 py-2 bg-primary text-white rounded">
                      Switch Profile
                    </button>
                  </Dropdown>

                  {/* Profile Dropdown */}
                  <Dropdown
                    menu={{ items: profileItems }}
                    trigger={["hover"]}
                    placement="bottomLeft"
                  >
                    <div className="flex space-x-3 items-center border border-[#DDDDDD] cursor-pointer p-[.5rem] rounded-full">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white text-sm uppercase">
                        {(user as any)?.name?.charAt(0) ??
                          (user as any)?.role?.charAt(0)}
                      </div>
                      <span className="capitalize">{(user as any)?.role}</span>
                    </div>
                  </Dropdown>
                </>
              ) : (
                <>
                  {/* Login Button */}
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="flex cursor-pointer items-center gap-1 border border-primary px-4 py-1 rounded"
                  >
                    <span className="p-1 rounded-full !bg-primary text-[#fff]">
                      <HiOutlineUser />
                    </span>
                    <span>Login</span>
                  </button>

                  {/* Sign Up Button */}
                  <button
                    onClick={() => setShowModal(true)}
                    className="px-6 py-2 cursor-pointer !bg-primary !rounded !text-[#fff] hidden md:block"
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
