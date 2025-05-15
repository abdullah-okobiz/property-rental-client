import AuthApis from "@/app/apis/auth.apis";


const { loginApi, refreshTokenApi, logoutApi, signupApi,verifyEmailOtpApi,otpResendApi } = AuthApis;

export const AuthServices = {
  processLogin: async (payload: { email: string, password: string }) => {
    try {
      const response = await loginApi(payload);
      return response?.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown error occurred in processLogin");
      }
    }
  },

  processLogout: async () => {
    try {
      const response = await logoutApi();
      return response?.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown error occurred in processLogout");
      }
    }
  },

  processRefreshToken: async () => {
    try {
      const response = await refreshTokenApi();
      return response?.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown error occurred in processRefreshToken");
      }
    }
  },

  processSignup: async (payload: { name: string, email: string, password: string, role: 'guest' | 'host' }) => {
    try {
      const response = await signupApi(payload);
      return response?.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown error occurred in processSignup");
      }
    }
  },
  processVerifyEmailOtp:async (payload:{email:string, otp:string})=>{
    try {
        const response = await verifyEmailOtpApi(payload)
        return response
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown error occurred in processSignup");
      }
      
    }
  },
  processResendOtp: async (payload:{email:string})=>{
     try {
      const response = await  otpResendApi(payload)
      return response
      
     }  catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Unknown error occurred in processSignup");
      }
      
    }
  }
};

export const getUser = async () => {
  const token = localStorage.getItem("accessToken");
  return token;
};

// export default AuthServices;
