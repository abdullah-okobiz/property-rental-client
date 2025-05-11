"use client";

import { Input, Modal, Button } from "antd";
import { useState } from "react";
import SignupModal from "./SignUpModal";

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
}

const initialForm = {
    phone: "",
    password: "",
};

const LoginModal = ({ open, onClose }: LoginModalProps) => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState(initialForm);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        console.log(formData); 
        onClose();
        setFormData(initialForm);
    };

    return (
        <> 
        <Modal
            title={
                <div className="pb-4 border-b  border-gray-200 text-center text-lg font-semibold">
                    Welcome to HomeZay Stay
                </div>
            }
            open={open}
            onCancel={onClose}
            footer={null}
            centered
        >
            <div className="space-y-4">
                <div className="space-y-4">
                    <div className="py-3">
                        <Input
                            name="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            size="large"
                        />
                    </div>
                    <div className="py-3">
                        <Input.Password
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            size="large"
                        />
                    </div>
                    <Button
                        block
                        size="large"
                        type="primary"
                        className="!bg-primary mt-4"
                        onClick={handleSubmit}
                    >
                        Continue
                    </Button>
                    <div className="text-center">
                            <h3>Already have an account? <Button
                                onClick={() => {
                                    onClose(); 
                                    setTimeout(() => setShowModal(true), 300);
                                }}
                            >
                                SignUp
                            </Button>  </h3>
                        </div>
                </div>
            </div>
        </Modal>
        {/* <SignupModal open={showModal} onClose={() => setShowModal(false)} /> */}
        </>
    );
};

export default LoginModal;
