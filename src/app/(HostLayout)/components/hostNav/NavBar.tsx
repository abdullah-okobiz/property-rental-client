"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineUser, HiMenu, HiX } from "react-icons/hi";
import { Dropdown, Button, Drawer, message, MenuProps } from "antd";
import { useMutation } from "@tanstack/react-query";

import logo from "@/assets/logo/stayverz.png";
import { poppins } from "@/app/font";
import useAuth from "@/hooks/useAuth";
import { AuthServices } from "@/services/auth/auth.service";

import SignupModal from "@/components/modals/SignUpModal";
import LoginModal from "@/components/modals/LoginModal";
import { TabMenuList } from "./nav.utils";
import { HiChevronDown } from "react-icons/hi";

const { processLogout } = AuthServices;

const NavBar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const { user, isAuthenticated } = useAuth();
  const pathname = usePathname();

  const { mutate: logout } = useMutation({
    mutationFn: processLogout,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.setItem("hasLoggedOut", "true");

      messageApi.success("Logout Successful");
      window.location.href = "/";
    },
    onError: () => {
      messageApi.error("Logout failed");
    },
  });

  const handleScroll = useCallback(() => {
    setIsSticky(window.scrollY > 70);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const profileMenu: MenuProps = {
    items: [
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
        label: <span onClick={() => logout()}>Logout</span>,
      },
    ],
  };

  return (
    <>
      {contextHolder}
      <nav
        className={`w-full top-0 z-50 transition-all duration-300 ${
          isSticky ? "fixed bg-white shadow-sm" : "relative"
        }`}
      >
        <div className="Container py-2 flex items-center justify-between shadow-md">
          <Link href="/">
            <Image
              src={logo}
              alt="Stayverz logo"
              width={80}
              height={80}
              className="h-[65px] w-[67px]"
            />
          </Link>

          <div className="hidden lg:flex gap-8 items-center">
            {TabMenuList.map((menu) => {
              const isActive =
                menu.link !== "#"
                  ? pathname === menu.link
                  : menu.dropdownItems?.some((item) => pathname === item.href);

              if (menu.dropdownItems) {
                return (
                  <Dropdown
                    key={menu.id}
                    trigger={["hover"]}
                    menu={{
                      items: menu.dropdownItems.map((item) => ({
                        key: item.key,
                        label: <Link href={item.href}>{item.label}</Link>,
                      })),
                    }}
                  >
                    <span
                      className={`cursor-pointer text-base font-medium flex items-center gap-1 ${
                        isActive
                          ? "text-primary font-semibold"
                          : "text-gray-700"
                      } ${poppins.className}`}
                    >
                      {menu.title}
                      <HiChevronDown className="text-sm" />
                    </span>
                  </Dropdown>
                );
              } else {
                return (
                  <Link
                    key={menu.id}
                    href={menu.link}
                    className={`text-base font-medium ${
                      isActive ? "text-primary font-semibold" : "text-gray-700"
                    } ${poppins.className}`}
                  >
                    {menu.title}
                  </Link>
                );
              }
            })}
          </div>

          <div className="hidden lg:flex gap-4 items-center">
            {isAuthenticated && user && user.isVerified ? (
              <Dropdown menu={profileMenu} trigger={["click"]}>
                <Button icon={<HiOutlineUser />} shape="round">
                  {user?.role}
                </Button>
              </Dropdown>
            ) : (
              <>
                <Button
                  className="!border !border-primary !text-gray-900"
                  onClick={() => setShowLoginModal(true)}
                >
                  <HiOutlineUser /> Login
                </Button>
                <Button
                  className="!bg-primary !text-white "
                  type="primary"
                  onClick={() => setShowModal(true)}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          <div className="lg:hidden">
            <Button
              icon={mobileOpen ? <HiX /> : <HiMenu />}
              onClick={() => setMobileOpen(!mobileOpen)}
            />
          </div>
        </div>
      </nav>

      <Drawer
        title={<Image src={logo} alt="Stayverz" width={80} height={80} />}
        placement="left"
        closable
        onClose={() => setMobileOpen(false)}
        open={mobileOpen}
      >
        <div className="flex flex-col gap-4">
          {TabMenuList.map((menu) => {
            const isActive =
              menu.link !== "#"
                ? pathname === menu.link
                : menu.dropdownItems?.some((item) => pathname === item.href);

            if (menu.dropdownItems) {
              return (
                <div key={menu.id}>
                  <div
                    className={`font-semibold ${
                      isActive ? "text-primary " : "text-gray-800"
                    }`}
                  >
                    {menu.title}
                  </div>
                  <div className="pl-4 mt-1 flex flex-col gap-2">
                    {menu.dropdownItems.map((item) => (
                      <Link
                        key={item.key}
                        href={item.href}
                        className="text-gray-600"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            } else {
              return (
                <Link
                  key={menu.id}
                  href={menu.link}
                  className={`text-base font-medium ${
                    isActive ? "text-primary" : "text-gray-800"
                  }`}
                >
                  {menu.title}
                </Link>
              );
            }
          })}

          <div className="border-t pt-4 mt-4">
            {isAuthenticated && user && user.isVerified ? (
              <Button
                icon={<HiOutlineUser />}
                onClick={() => logout()}
                danger
                block
              >
                Logout ({user?.role})
              </Button>
            ) : (
              <div className="flex flex-col gap-2">
                <Button onClick={() => setShowLoginModal(true)} block>
                  Login
                </Button>
                <Button type="primary" onClick={() => setShowModal(true)} block>
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </Drawer>

      <SignupModal open={showModal} onClose={() => setShowModal(false)} />
      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default NavBar;
