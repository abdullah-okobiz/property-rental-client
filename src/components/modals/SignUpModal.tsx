"use client";

import { Modal, Button, Form, Input, message } from "antd";
import { useState } from "react";
import hostImage from "../../../public/images/home.png";
import guestImage from "../../../public/images/guest.png";
import { useMutation } from "@tanstack/react-query";
import AuthServices from "@/services/auth/auth.service";
import { useRouter } from "next/navigation";


interface SignupModalProps {
  open: boolean;
  onClose: () => void;
}

const hostandGuest = [
  {
    name: "Host",
    imgSrc: hostImage.src,
  },
  {
    name: "Guest",
    imgSrc: guestImage.src,
  },
];

const { processSignup } = AuthServices;

const SignupModal = ({ open, onClose }: SignupModalProps) => {
  const router = useRouter(); 
  const [messageApi, contextHolder] = message.useMessage();
  const [role, setRole] = useState<"host" | "guest">("guest");
  const [form] = Form.useForm();


  const { mutate, isPending } = useMutation({
    mutationFn: processSignup,
    onSuccess: (data:any) => {
      console.log("data ==== ", data)
      messageApi.success(data?.message || "Signup successful!");
      form.resetFields();
      onClose();
      router.push(`/email-verification?email=${data?.data?.email}`);

    },
    onError: (error: any) => {
      messageApi.error(
        error?.response?.data?.message || "Signup failed. Please try again."
      );
    },
  });

  const handleSubmit = (values: any) => {
    mutate({
      ...values,
      role,
    });
  };

  return (
    <>
    {contextHolder}  
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
                  ${isSelected ? "border border-primary ring-1" : ""}
                `}
                onClick={() =>
                  setRole(type.name.toLowerCase() as "host" | "guest")
                }
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

        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          className="space-y-4"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Full Name" size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input.Password placeholder="Password" size="large" />
          </Form.Item>

          <p className="text-xs text-gray-500 leading-snug pt-1">
            By selecting <span className="font-medium">Continue</span>, I agree to Homezay stay's{" "}
            <a href="#" className="text-blue-500 underline">Terms of Service</a> and acknowledge the{" "}
            <a href="#" className="text-blue-500 underline">Privacy Policy</a>.
          </p>

          <Form.Item>
            <Button
              block
              size="large"
              type="primary"
              htmlType="submit"
              className="!bg-primary mt-4"
              loading={isPending}
              disabled={isPending}
            >
              Continue as {role}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
    </>
  );
};

export default SignupModal;
