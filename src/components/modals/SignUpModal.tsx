"use client";

import { Input, Modal, Button } from "antd";
import { useState } from "react";
import hostImage from "../../../public/images/home.png"
import guestImage from "../../../public/images/guest.png"

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
        <Modal
            title="Welcome to HomeZay Stay"
            open={open}
            onCancel={onClose}
            footer={null}
            centered
        >

            <div className="space-y-4">
                <div className=" w-full flex justify-center items-center gap-4 mb-6">
                    {hostandGuest.map((type, index) => (
                        <div key={index} className={` w-full flex justify-center items-center py-2 border ring-1 rounded capitalize ${role === type.name ? "border border-primary  ring-1 text-black" : "bg-white border-gray-300"
                            }`}
                            onClick={() => setRole(type.name as "guest" | "host")} >
                            <div>
                            <img src={type.imgSrc} alt="image" className="w-[70px]" />
                            <h4 className="font-bold text-gray-600 ">Sign Up as ${type.name}</h4>
                            </div>
                        </div>

                    ))}
                </div>


                <div className="space-y-4">
                    <Input
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        size="large"
                    />

                    <Input
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        size="large"

                    />
                    <Input.Password
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        size="large"
                    />
                    <Input.Password
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        size="large"
                    />
                    <Button
                        block
                        size="large"
                        type="primary"
                        className="!bg-primary mt-4"
                        onClick={handleSubmit}
                    >
                        Continue as {role}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default SignupModal;
