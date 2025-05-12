"use client";

import { Input, Modal, Button } from "antd";
import { useState } from "react";
import hostImage from "../../../public/images/home.png"
import guestImage from "../../../public/images/guest.png"
import LoginModal from "./LoginModal";

interface SignupModalProps {
    open: boolean;
    onClose: () => void;
}
const hostandGuest = [
    {
        name: "Host",
        imgSrc: hostImage.src
    },
    {
        name: "Guest",
        imgSrc: guestImage.src
    }
]

const initialForm = {
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
};


const SignupModal = ({ open, onClose }: SignupModalProps) => {
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [role, setRole] = useState<"guest" | "host">("guest");
    const [formData, setFormData] = useState(initialForm);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        console.log({ ...formData, role });
        onClose();

        setFormData(initialForm);
    };

    return (
        <>
            <Modal
                title={
                    <div className="pb-4 border-b border-gray-200 text-start text-lg font-semibold">
                        Welcome to HomeZay Stay
                    </div>
                }
                open={open}
                onCancel={onClose}
                footer={null}
                centered
            >

                <div className="space-y-4 py-2">
                    <div className="w-full flex justify-center items-center gap-4 mb-6">
                        {hostandGuest.map((type, index) => {
                            const isSelected = role === type.name.toLowerCase();

                            return (
                                <div
                                    key={index}
                                    className={`
                                    w-full cursor-pointer flex justify-center items-center py-4 px-2 
                                    rounded border-gray-300 ring-1 
                                    ${isSelected ? "border border-primary ring-1" : " "}
                                    `}
                                    onClick={() => setRole(type.name.toLowerCase() as "guest" | "host")}
                                >
                                    <div className="flex flex-col gap-2 justify-center items-center">
                                        <img src={type.imgSrc} alt="image" className="w-[70px]" />
                                        <h4 className="text-[14px] tracking-tight font-bold text-gray-600">
                                            Sign Up as {type.name}
                                        </h4>
                                    </div>
                                </div>
                            );
                        })}
                    </div>



                    <div className="space-y-4">
                        <div>
                            <Input
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                size="large"
                            />
                        </div>
                        <div>
                            <Input
                                name="phone"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                size="large"
                            />
                        </div>
                        <div>
                            <Input.Password
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                size="large"
                            />
                        </div>
                        <div>
                            <Input.Password
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                size="large"
                            />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 leading-snug pt-1">
                                By selecting <span className="font-medium">Continue</span>, I agree to Homezay stay's{" "}
                                <a href="#" className="text-blue-500 underline">Terms of Service</a> and acknowledge the{" "}
                                <a href="#" className="text-blue-500 underline">Privacy Policy</a>.
                            </p>
                        </div>
                        <Button
                            block
                            size="large"
                            type="primary"
                            className="!bg-primary mt-4"
                            onClick={handleSubmit}
                        >
                            Continue as {role}
                        </Button>
                        <div className="text-center">
                            <h3>Already have an account? <Button
                                onClick={() => {
                                    onClose();
                                    setTimeout(() => setShowLoginModal(true), 300);
                                }}
                            >
                                SignIn
                            </Button>  </h3>
                        </div>
                    </div>

                </div>
            </Modal>
            {/* <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} /> */}
        </>
    );
};

export default SignupModal;
