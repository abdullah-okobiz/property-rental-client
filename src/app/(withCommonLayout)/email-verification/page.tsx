"use client";

import { useSearchParams } from "next/navigation";
import { Form, Input, Button, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import AuthServices from "@/services/auth/auth.service";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";

const { processVerifyEmailOtp, processResendOtp } = AuthServices;

const EmailVerification = () => {
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [cooldown, setCooldown] = useState<number>(0);
  const [resendTimer, setResendTimer] = useState<NodeJS.Timeout | null>(null);

  const {
    mutate: verifyOtp,
    isPending: isVerifying,
  } = useMutation({
    mutationFn: processVerifyEmailOtp,
    onSuccess: (res: any) => {
      if (res?.data?.accessToken) {
        login({ accessToken: res.data.accessToken });
      } else {
        messageApi.error("Access token is missing.");
      }
  
      messageApi.success(res?.data?.message || "Email verified successfully!");
      form.resetFields();
    },
    onError: (error: any) => {
      messageApi.error(
        error?.response?.data?.message || "OTP verification failed."
      );
    },
  });

  const {
    mutate: resendOtp,
    isPending: isResending,
  } = useMutation({
    mutationFn: () => processResendOtp({ email: email as string  }),
    onSuccess: (res: any) => {
     
      messageApi.success(res?.data?.message || "OTP resent to your email!");
      startCooldown(30); 
    },
    onError: (error: any) => {
      messageApi.error(
        error?.response?.data?.message || "Failed to resend OTP."
      );
    },
  });

  const handleSubmit = (values: any) => {
    if (!email) {
      return messageApi.error("Missing email.");
    }
    verifyOtp({
      email,
      otp: values.otp,
    });
  };

  const startCooldown = (seconds: number) => {
    setCooldown(seconds);
  };


  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
      setResendTimer(timer);
      return () => clearInterval(timer);
    } else if (resendTimer) {
      clearInterval(resendTimer);
    }
  }, [cooldown]);

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border border-[#D7D7D7] rounded shadow-md">
      {contextHolder}
      <h2 className="text-xl font-semibold mb-4">Verify your email</h2>
      <p className="text-sm mb-6 text-gray-600">
        Enter the 6-digit OTP sent to <strong>{email}</strong>
      </p>

      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="otp"
          rules={[{ required: true, message: "Please enter the OTP" }]}
        >
          <Input placeholder="Enter OTP" maxLength={6} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="!bg-primary"
            block
            loading={isVerifying}
          >
            Verify
          </Button>
        </Form.Item>
      </Form>

      <div className="text-center mt-4">
        <span className="text-sm text-gray-600">Didn't get the code?</span>
        <br />
        <Button
          type="link"
          disabled={cooldown > 0 || isResending}
          onClick={() => resendOtp()}
        >
          {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
        </Button>
      </div>
    </div>
  );
};

export default EmailVerification;
