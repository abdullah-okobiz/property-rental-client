"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineUser } from "react-icons/hi";
import { Dropdown, Menu } from "antd";

import logo from "@/assets/logo/stayverz.png";
import { menuList } from "@/utilits/menuList";
import { poppins } from "@/app/font";
import SignupModal from "@/components/modals/SignUpModal";
import LoginModal from "@/components/modals/LoginModal";
import useAuth from "@/hooks/useAuth";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const {
    user,
    logout,
    isAuthenticated
  } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const profileMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link href="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="switch-role">
        <button className="cursor-pointer" onClick={() => console.log("Switch role clicked")}>
          Switch Role
        </button>
      </Menu.Item>
      <Menu.Item key="settings">
        <Link href="/settings">Settings</Link>
      </Menu.Item>
      <Menu.Item key="logout">
        <button className="cursor-pointer" onClick={logout}>Logout</button>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div
        className={`w-full top-0 z-50 transition-all ease-in-out transform duration-300 ${isSticky ? "fixed bg-white shadow-md" : "relative"
          }`}
      >
        <div className="Container py-2 md:py-2 shadow-sm">
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

            {/* Menu */}
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

            {/* User Section */}
            <div
              className={`flex items-center justify-center gap-2 font-medium text-sm ${poppins.className}`}
            >
              {isAuthenticated && user?.isVerified ? (
                <>
                  {user.role === "guest" && (
                    <button
                      className="px-4 py-2 bg-primary text-white rounded"
                      onClick={() => {
                        console.log("Switch to host");
                        // implement host switching logic or route
                      }}
                    >
                      Switch to Host
                    </button>
                  )}
                  <Dropdown placement="bottomLeft"  overlay={profileMenu} trigger={["hover"]}>
                    <button
                      className="p-2 border rounded-full border-primary"
                    >
                      <HiOutlineUser className="text-primary" />
                    </button>
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
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
};

export default Navbar;
