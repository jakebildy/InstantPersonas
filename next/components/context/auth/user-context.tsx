"use client";
import { useStytchUser } from "@stytch/nextjs";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  InstantPersonasUser,
  UserSubscriptionStatus,
} from "./user-context.types";
import { usePathname, useRouter } from "next/navigation";
import { set } from "lodash";
import { usePostHog } from "posthog-js/react";
import api from "@/service/api.service";
import { IS_TEST_DEV_ENV } from "@/lib/utils";

// Define the context shape
type InstantPersonasUserContextType =
  | {
      user: InstantPersonasUser; // The user object
      isLoggedIn: true; // Whether the user is logged in, ensures user is not null
      isSubscribed: boolean; // Whether the user has an active subscription
      isInitialized: boolean; // Whether the stytch user object has been initialized
      isLoading: boolean; // Whether the user object is still loading
    }
  | {
      user: null;
      isLoggedIn: false;
      isSubscribed: false;
      isInitialized: boolean;
      isLoading: boolean;
    };

// Create the context with default values
const InstantPersonasUserContext = createContext<
  InstantPersonasUserContextType | undefined
>(undefined);

// Define the Provider component
interface InstantPersonasUserProviderProps {
  children: ReactNode;
}

/**
 * Contains the subscription statuses that are considered active for stripe
 */
const ACTIVE_SUBSCRIPTIONS: UserSubscriptionStatus[] = ["active", "trialing"];

export const InstantPersonasUserProvider = ({
  children,
}: InstantPersonasUserProviderProps) => {
  const [instantPersonasUser, setInstantPersonasUser] =
    useState<InstantPersonasUser | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);

  const { user, isInitialized } = useStytchUser();
  const pathname = usePathname();
  const posthog = usePostHog();

  useEffect(() => {
    setLoading(true);
    if (isInitialized && !user) {
      setInstantPersonasUser(null);
      setIsLoggedIn(false);
      setIsSubscribed(false);
    } else if (user) {
      const getSubscription = async () => {
        IS_TEST_DEV_ENV && console.log("DEV: Getting subscription status");
        const subscription = await api.stripe.isSubscriptionActive(
          user.user_id as string,
        );

        const activeSubscription = ACTIVE_SUBSCRIPTIONS.includes(
          subscription.status,
        );

        if (user.user_id !== instantPersonasUser?.id) {
          posthog.identify(user.user_id, {
            email: user.emails[0].email,
            subscriptionType: activeSubscription ? "paid" : "free",
            userSignupDate: user.created_at,
          });
        }

        const formattedUser: InstantPersonasUser = {
          id: user.user_id,
          created_at: user.created_at,
          emails: user.emails,
          name: user.name,
          subscription: subscription,
        };

        setInstantPersonasUser(formattedUser);
        setIsLoggedIn(true);
        setIsSubscribed(activeSubscription);
      };

      getSubscription();
    }
    setLoading(false);
  }, [
    user,
    user?.user_id,
    isInitialized,
    posthog,
    pathname,
    instantPersonasUser?.id,
  ]);

  const data: InstantPersonasUserContextType =
    isLoggedIn && instantPersonasUser !== null
      ? ({
          user: instantPersonasUser,
          isLoggedIn: true,
          isSubscribed: isSubscribed,
          isInitialized: isInitialized,
          isLoading: loading,
        } as const)
      : ({
          user: null,
          isLoggedIn: false,
          isSubscribed: false,
          isInitialized: isInitialized,
          isLoading: loading,
        } as const);

  return (
    <InstantPersonasUserContext.Provider value={data}>
      {children}
    </InstantPersonasUserContext.Provider>
  );
};

// Hook for easy consumption of the context
export const useInstantPersonasUser = () => {
  const context = useContext(InstantPersonasUserContext);
  if (context === undefined) {
    throw new Error(
      "useInstantPersonasUser must be used within a InstantPersonasUserProvider",
    );
  }
  return context;
};
