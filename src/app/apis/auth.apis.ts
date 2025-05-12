import axiosClient from "@/lib/axios.config";


const AuthApis = {
  loginApi: (payload: { email: string; password: string }) => {
    return axiosClient.post("/admin/login", payload);
  },

  logoutApi: () => {
    return axiosClient.post("/logout");
  },

  refreshTokenApi: () => {
    return axiosClient.post("/refresh");
  },

  signupApi: (payload: { name: string; email: string; password: string; role: 'guest' | 'host' }) => {
    return axiosClient.post("/signup", payload);
  },
  verifyEmailOtpApi:(payload:{email: string; otp: string;})=>{
    return axiosClient.post("/verify", payload);
  },
  otpResendApi:(payload:{email:string})=>{
    return axiosClient.post("/resend", payload);
  }
};

export default AuthApis;
