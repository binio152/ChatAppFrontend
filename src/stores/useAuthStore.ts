import { authService } from "@/services/authService";
import { type AuthState } from "@/types/store";
import { toast } from "sonner";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

  setAccessToken: (accessToken) => {
    set({ accessToken });
  },

  clearState: () => {
    set({ accessToken: null, user: null, loading: false });
  },

  signUp: async ({ username, password, email, firstName, lastName }) => {
    try {
      set({ loading: true });
      await authService.signUp({
        username,
        password,
        email,
        firstName,
        lastName,
      });

      toast.success(
        "Đăng ký tài khoản thành công! Bạn sẽ được chuyển sang trang đăng nhập.",
      );
    } catch (err) {
      toast.error(
        "Đăng ký tài khoản không thành công! Xin hãy vui lòng thử lại.",
      );
      console.log(err);
    } finally {
      set({ loading: false });
    }
  },

  signIn: async ({ username, password }) => {
    try {
      set({ loading: true });
      const { accessToken } = await authService.signIn({ username, password });

      get().setAccessToken(accessToken);
      await get().fetchProfile();
      toast.success("Đăng nhập tài khoản thành công!");
    } catch (err) {
      toast.error(
        "Đăng nhập tài khoản không thành công! Xin hãy vui lòng thử lại.",
      );
      console.log(err);
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      set({ loading: true });
      await authService.signOut();
      get().clearState();

      toast.success("Đăng xuất tài khoản thành công!");
    } catch (err) {
      toast.error(
        "Đăng xuất tài khoản không thành công! Xin hãy vui lòng thử lại.",
      );
      console.log(err);
    } finally {
      set({ loading: false });
    }
  },

  fetchProfile: async () => {
    try {
      set({ loading: true });
      const user = await authService.fetchProfile();
      set({ user });
    } catch (err) {
      toast.error(
        "Đăng xuất tài khoản không thành công! Xin hãy vui lòng thử lại.",
      );
      console.log(err);
    } finally {
      set({ loading: false });
    }
  },
}));
