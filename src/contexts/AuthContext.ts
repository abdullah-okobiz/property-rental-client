import { createContext } from "react";

// Define the type of data your AuthContext will provide
interface AuthContextType {
  accessToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

// Create the context with default values (null or empty functions initially)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
