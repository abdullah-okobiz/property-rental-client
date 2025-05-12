import { createContext } from "react";

interface AuthContextType {
  accessToken: string | null;
  login: (tokens: { accessToken: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export default AuthContext
