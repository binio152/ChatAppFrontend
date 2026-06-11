import type { User } from "@/types/user";

export interface SignUpSchema {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface SignInSchema {
  username: string;
  password: string;
}

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;

  setAccessToken: (accessToken: string) => void;
  clearState: () => void;

  signUp: ({
    username,
    password,
    email,
    firstName,
    lastName,
  }: SignUpSchema) => Promise<void>;
  signIn: ({ username, password }: SignInSchema) => Promise<void>;
  signOut: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  refresh: () => Promise<void>;
}
