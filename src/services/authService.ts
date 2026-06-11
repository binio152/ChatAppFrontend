import api from "@/lib/axios";
import type { SignInSchema, SignUpSchema } from "@/types/store";

export const authService = {
  signUp: async ({
    firstName,
    lastName,
    username,
    email,
    password,
  }: SignUpSchema) => {
    const res = await api.post(
      "/auth/signup",
      { firstName, lastName, username, email, password },
      { withCredentials: true },
    );
    return res.data;
  },

  signIn: async ({ username, password }: SignInSchema) => {
    const res = await api.post(
      "/auth/signin",
      { username, password },
      { withCredentials: true },
    );
    console.log(res);
    return res.data.accessToken;
  },

  signOut: async () => {
    const res = await api.post("/auth/signout", {}, { withCredentials: true });
    return res.data;
  },

  fetchProfile: async () => {
    const res = await api.get("/users/profile", { withCredentials: true });
    return res.data.user;
  },

  refresh: async () => {
    const res = await api.post("/auth/refresh", { withCredentials: true });
    return res.data.accessToken;
  },
};
