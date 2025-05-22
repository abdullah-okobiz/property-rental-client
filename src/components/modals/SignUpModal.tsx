"use client";

import { Modal, Button, Form, Input, message } from "antd";
import { useState } from "react";
import hostImage from "../../../public/images/home.png";
import guestImage from "../../../public/images/guest.png";
import { useMutation } from "@tanstack/react-query";
import { AuthServices } from "@/services/auth/auth.service";
import { useRouter } from "next/navigation";
import { SignupFormValues, SignupResponse } from "@/types/authTypes";
import Image from "next/image";

interface SignupModalProps {
  open: boolean;
  onClose: () => void;
}

const hostandGuest = [
  { name: "Host", imgSrc: hostImage.src },
  { name: "Guest", imgSrc: guestImage.src },
];

const { processSignup } = AuthServices;

const SignupModal = ({ open, onClose }: SignupModalProps) => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [role, setRole] = useState<"host" | "guest">("guest");
  const [form] = Form.useForm();

  const { mutate, isPending } = useMutation<
    SignupResponse,
    Error,
    SignupFormValues
  >({
    mutationFn: processSignup,
    onSuccess: (data) => {
      messageApi.success("Signup successfully!");
      router.push(`/email-verification?email=${data?.data?.email}`);

      setTimeout(() => {
        form.resetFields();
        onClose();
      }, 300);
    },
    onError: (error) => {
      messageApi.error("Email already Exist");
    },
  });

  const handleSubmit = (values: Omit<SignupFormValues, "role">) => {
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
            Welcome to HomZay Stay
          </div>
        }
        open={open}
        onCancel={onClose}
        footer={null}
        centered
        destroyOnClose
      >
        <div className="space-y-4 py-2">
          <div className="w-full flex justify-center items-center gap-4 mb-6">
            {hostandGuest.map((type, index) => {
              const isSelected = role === type?.name.toLowerCase();
              return (
                <div
                  key={index}
                  className={`
                      relative w-full cursor-pointer flex justify-center items-center py-4 px-2 
                      rounded ring-0 border border-gray-200 
                      ${isSelected ? " border-primary ring-0" : ""}
                    `}
                  onClick={() =>
                    setRole(type.name.toLowerCase() as "host" | "guest")
                  }
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 border rounded border-gray-300 flex items-center justify-center bg-white">
                      <span className="text-red-500 text-xs font-bold leading-none">
                        ✔
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col gap-2 justify-center items-center">
                    <Image
                      height={200}
                      width={200}
                      src={type?.imgSrc}
                      alt="image"
                      className="w-[70px]"
                    />
                    <h4 className="text-[14px] tracking-tight font-bold text-gray-600">
                      Sign Up as {type?.name}
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
              rules={[
                { required: true, message: "Please enter a password" },
                {
                  min: 8,
                  message: "Password must be at least 8 characters long",
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Password" size="large" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match."));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" size="large" />
            </Form.Item>

            <p className="text-xs text-gray-500 leading-snug pt-1">
              By selecting <span className="font-medium">Continue</span>, I
              agree to HomZay Stay&apos;s{" "}
              <a href="#" className="text-blue-500 underline">
                Terms of Service
              </a>{" "}
              and acknowledge the{" "}
              <a href="#" className="text-blue-500 underline">
                Privacy Policy
              </a>
              .
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
