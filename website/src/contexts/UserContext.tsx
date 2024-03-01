import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import api, { UserI as UserI } from "../services/api.service";
import LogRocket from "logrocket";

export interface User extends UserI {
  subscriptionActive?: boolean;
}

interface UserContextData {
  user: User | null;
  logout: () => void;
  refreshUser: () => Promise<void>;
  subscriptionActive: boolean;
}

const UserContext = createContext<UserContextData | undefined>(undefined);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [subscriptionActive, setSubscriptionActive] = useState<boolean>(false);

  const fetchUser = useCallback(async () => {
    try {
      const fetchedUser = await api.auth.me();
      const isSubscriptionActive = await api.stripe.isSubscriptionActive();
      // TODO check if it's the first time they are logging in.
      if (window.Reflio) {
        console.log("calling Reflio signup");
        window.Reflio.signup(fetchedUser.email);
      }

      setUser({
        ...fetchedUser,
        subscriptionActive: isSubscriptionActive,
      });
      setSubscriptionActive(isSubscriptionActive);
      console.log("fetched user", fetchedUser);
      // console.log("is subscription active", isSubscriptionActive);

      // This is an example script - don't forget to change it!
      LogRocket.identify(fetchedUser._id, {
        email: fetchedUser.email,

        // Add your own custom user variables here, ie:
        // subscriptionType: isSubscriptionActive ? "paid" : "free",
      });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
    await api.auth.logout();
    setUser(null);
  };

  const refreshUser = async () => {
    console.log("Refreshing user");
    await fetchUser();
  };

  const value = {
    user: user,
    logout,
    refreshUser: refreshUser,
    subscriptionActive,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export default UserProvider;
