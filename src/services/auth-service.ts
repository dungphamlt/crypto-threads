import { post } from "./api";

/* Types */
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  firstName?: string; // optional because API sample không trả first/last name
  lastName?: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  isEmailVerified?: boolean;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  expiresIn?: number;
  user?: AuthUser;
}

export interface OTPResponse {
  success?: boolean;
  message?: string;
  expiresIn?: number;
  user?: AuthUser;
}

/* Raw API response shapes (for type clarity) */
interface RegisterApiResponse {
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
    isEmailVerified: boolean;
  };
}

interface VerifyEmailResponse {
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
    isEmailVerified: boolean;
  };
}

interface LoginApiResponse {
  userId: string;
  username: string;
  email: string;
  access_token: string;
  expiresIn: number | string;
}

interface ResetPasswordResponse { 
  message: string; 
  user?: { 
    id: string;
    username: string;
    email: string;
    isEmailVerified: boolean
  }
};

interface MessageOnlyResponse {
  message: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const payload = {
        username: credentials.email,
        password: credentials.password,
        rememberMe: credentials.rememberMe ?? false,
      };

      const response = await post<LoginApiResponse>(`/auth/user/login`, payload) as unknown as LoginApiResponse;

      if (response?.userId) {
        const token = response.access_token;
        const expires = typeof response.expiresIn === "string" ? parseInt(response.expiresIn, 10) : response.expiresIn;

        const user: AuthUser = {
          id: response.userId,
          username: response.username,
          email: response.email,
        };

        return {
          success: true,
          message: "Login successful",
          token,
          expiresIn: expires,
          user,
        };
      }

      return { success: false, message: "Login failed!" };
    } catch (error) {
      console.error("Error during login:", error);
      const message = error instanceof Error ? error.message : "Login failed";
      return { success: false, message };
    }
  },

  register: async (registerData: RegisterData): Promise<OTPResponse> => {
    try {
      const payload = {
        email: registerData.email,
        username: registerData.email,
        password: registerData.password,
        firstName: registerData.firstName,
        lastName: registerData.lastName,
      };
      const response = await post<RegisterApiResponse>(`/auth/user/register`, payload) as unknown as RegisterApiResponse;

      if (response?.user) {
        return {
          success: true,
          message: response.message ?? "Registration successful. Please check your email for verification.",
          user: {
            id: response.user.id,
            username: response.user.username,
            email: response.user.email,
            isEmailVerified: response.user.isEmailVerified,
          },
        };
      }

      return {
        success: false,
        message: response.message ?? "Register failed!",
      };
    } catch (error) {
      console.error("Error during register:", error);
      const message = error instanceof Error ? error.message : "Registration failed";
      return { success: false, message };
    }
  },

  verifyOTP: async (email: string, otp: string): Promise<{ success: boolean, message: string }> => {
    try {
      const payload = { email, otp };
      const response = await post<VerifyEmailResponse>(`/auth/user/verify-email`, payload) as unknown as VerifyEmailResponse;

      if (response?.user) {
        return {
          success: true,
          message: response.message ?? "Email verified successfully",
        };
      }

      return { success: false, message: response.message ?? "OTP verification failed" };
    } catch (error) {
      console.error("Error verifying OTP:", error);
      const message = error instanceof Error ? error.message : "OTP verification failed";
      return { success: false, message };
    }
  },

  resendOTP: async (email: string): Promise<OTPResponse> => {
    try {
      const payload = { email };
      const response = await post<MessageOnlyResponse>(`/auth/user/resend-otp`, payload);

      return {
        success: true,
        message: response?.message ?? "OTP resend requested",
      };
    } catch (error) {
      console.error("Error resending OTP:", error);
      const message = error instanceof Error ? error.message : "Failed to resend OTP";
      return { success: false, message };
    }
  },

  forgotPassword: async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      const payload = { email };
      const response = await post<MessageOnlyResponse>(`/auth/user/request-reset-password`, payload);

      return { success: true, message: response?.message ?? "Password reset email requested" };
    } catch (error) {
      console.error("Error in forgotPassword:", error);
      const message = error instanceof Error ? error.message : "Failed to send reset email";
      return { success: false, message };
    }
  },

  resetPassword: async (
    email: string,
    otp: string,
    newPassword: string
  ): Promise<{ success: boolean; message: string; user?: AuthUser }> => {
    try {
      const payload = { email, otp, newPassword };
      const response = await post<ResetPasswordResponse>(
        `/auth/user/reset-password`,
        payload
      ) as unknown as ResetPasswordResponse;


      if (response?.user?.id) {
        return {
          success: true,
          message: response.message ?? "Password reset successfully",
          user: response.user
            ? {
              id: response.user.id,
              username: response.user.username,
              email: response.user.email,
              isEmailVerified: response.user.isEmailVerified,
            }
            : undefined,
        };
      }

      return { success: false, message: response.message ?? "Reset password failed!" };
    } catch (error) {
      console.error("Error in resetPassword:", error);
      const message = error instanceof Error ? error.message : "Failed to reset password";
      return { success: false, message };
    }
  },

  logout: async (): Promise<void> => {
    try {
      try {
        await post(`/auth/user/logout`, {});
      } catch (err) {
        console.warn("Server logout failed (ignored):", err);
      }

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch (err) {
      console.error("Error during logout:", err);
    }
  },
};

export default authService;
