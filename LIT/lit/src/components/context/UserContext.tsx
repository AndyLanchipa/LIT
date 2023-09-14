// UserContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "../../types/user";

type UserContextType = {
  user: User | null;
  token: string | null; // Add the token property
  setUser: (user: User | null, token: string | null) => void; // Update the setUser function
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  // Initialize user and token state
  const [user, setUserState] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // The setUser function allows updating both user and token
  const setUser = (newUser: User | null, newToken: string | null) => {
    setUserState(newUser);
    setToken(newToken);
  };

  // Check for the presence of the token in localStorage or sessionStorage on app load
  useEffect(() => {
    const storedToken =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (storedToken) {
      // User is authenticated; handle it accordingly
      setToken(storedToken);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, token, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
