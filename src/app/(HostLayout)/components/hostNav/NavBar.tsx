"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineUser } from "react-icons/hi";
import { Dropdown, message } from "antd";
import { useMutation } from "@tanstack/react-query";

import logo from "@/assets/logo/stayverz.png";
import { poppins } from "@/app/font";
import useAuth from "@/hooks/useAuth";
import AuthServices from "@/services/auth/auth.service";

import SignupModal from "@/components/modals/SignUpModal";
import LoginModal from "@/components/modals/LoginModal";
import { TabmenuList } from "./nav.utils";

const { processLogout } = AuthServices;

const NavBar = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const { user, isAuthenticated } = useAuth();

    const { mutate: logout } = useMutation({
        mutationFn: processLogout,
        onSuccess: () => {
            message.success("Logout Successful");
            localStorage.removeItem("accessToken");
            setTimeout(() => window.location.reload(), 1000);
        },
        onError: (error: any) => {
            message.error(error?.response?.data?.message || "Logout failed");
        },
    });

    const handleScroll = useCallback(() => {
        setIsSticky(window.scrollY > 50);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);



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
                <button className="cursor-pointer w-full text-left" onClick={() => logout()}>
                    Logout
                </button>
            ),
        },
    ];

    return (
        <>
            <nav
                className={`w-full top-0 z-50 transition-all duration-300 ${isSticky ? "fixed bg-white shadow-md" : "relative"
                    }`}
            >
                <div className="Container py-2 md:py-2 shadow-sm">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/">
                            <Image
                                src={logo}
                                alt="Stayverz logo"
                                width={120}
                                height={120}
                                className="w-[80px] md:w-[70px]"
                            />
                        </Link>


                        <ul className="lg:flex hidden items-center justify-center xl:gap-8 gap-6">
                            {TabmenuList.map((menu) => {
                                const dropdownMenu = {
                                    items: menu.dropdownItems?.map((item) => ({
                                        key: item.key,
                                        label: <Link href={item.href}>{item.label}</Link>,
                                    })),
                                };

                                return (
                                    <li key={menu.id}>
                                        {menu.dropdownItems ? (
                                            <Dropdown menu={dropdownMenu} trigger={["hover"]}>
                                                <span
                                                    className={`cursor-pointer text-base font-medium ${poppins.className}`}
                                                >
                                                    {menu.title}
                                                </span>
                                            </Dropdown>
                                        ) : (
                                            <Link
                                                href={menu.link}
                                                className={`text-base font-medium cursor-pointer ${poppins.className}`}
                                            >
                                                {menu.title}
                                            </Link>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>


                        {/* Right-side Actions */}
                        <div className={`flex items-center gap-2 font-medium text-sm ${poppins.className}`}>
                            {isAuthenticated && (user as any)?.isVerified ? (
                                <>


                                    <Dropdown menu={{ items: profileItems }} trigger={["hover"]}>
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
                                        className="px-6 py-2 cursor-pointer bg-primary rounded text-white hidden md:block"
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>


            <SignupModal open={showModal} onClose={() => setShowModal(false)} />
            <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
        </>
    );
};

export default NavBar;
