"use client";

import { useSearchParams } from "next/navigation";
import { Form, Input, Button, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import AuthServices from "@/services/auth/auth.service";


const { processVerifyEmailOtp } = AuthServices;

const EmailVerification = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: processVerifyEmailOtp,
    onSuccess: (res:any) => {
    messageApi.success(res?.data?.message || "Email verified successfully!");
      form.resetFields();
    },
    onError: (error: any) => {
        messageApi.error(
        error?.response?.data?.message || "OTP verification failed."
      );
    },
  });

  const handleSubmit = (values: any) => {
    if (!email) {
      return message.error("Missing email.");
    }

    mutate({
      email,
      otp: values.otp,
    });
  };

  return (
    <div className=" max-w-sm mx-auto mt-20 p-6 border border-[#D7D7D7] rounded shadow-md">
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
            loading={isPending}
          >
            Verify
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </div>
  );
};

export default EmailVerification;
