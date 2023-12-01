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
  setUser: (user: User | null) => void;
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
  // Initialize user state
  const [user, setUserState] = useState<User | null>(null);

  // Retrieve user data from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    console.log(localStorage.getItem("userData"));
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  // The setUser function allows updating the user and also saves it to localStorage
  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem("userData", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("userData");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
