"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStytchUser, useStytch } from "@stytch/nextjs";
import api from "@/service/api.service";
import BarLoader from "react-spinners/BarLoader";
import {
  ColorVariantMap,
  ColorVariant,
  gradientVariants,
} from "@/components/variants";
import { PersonStandingIcon } from "lucide-react";

const OAUTH_TOKEN = "oauth";
const MAGIC_LINKS_TOKEN = "magic_links";

/**
 * During both the Magic link and OAuth flows, Stytch will redirect the user back to your application to a specified redirect URL (see Login.tsx).
 * Stytch will append query parameters to the redirect URL which are then used to complete the authentication flow.
 * A redirect URL for this example app will look something like: http://localhost:3000/authenticate?stytch_token_type=magic_links&token=abc123
 *
 * The AuthenticatePage will detect the presence of a token in the query parameters, and attempt to authenticate it.
 *
 * On successful authentication, a session will be created and the user will be redirect to /profile.
 */ function Authenticate() {
  const { user, isInitialized } = useStytchUser();
  const stytch = useStytch();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    try {
      if (stytch && !user && isInitialized) {
        const token = searchParams.get("token");
        const stytch_token_type = searchParams.get("stytch_token_type");

        if (token && stytch_token_type === OAUTH_TOKEN) {
          stytch.oauth.authenticate(token, {
            session_duration_minutes: 172800,
          });
        } else if (token && stytch_token_type === MAGIC_LINKS_TOKEN) {
          stytch.magicLinks.authenticate(token, {
            session_duration_minutes: 172800,
          });
        }
      } else {
        // router.replace("/");
      }
    } catch (error) {
      console.error("Error creating user on signup: ", error);
      // router.replace("/");
    }
  }, [isInitialized, router, searchParams, stytch, user]);

  useEffect(() => {
    try {
      if (!isInitialized) {
        return;
      }
      if (user) {
        // create a User model if it doesn't exist

        // async function
        const createUserIfSignup = async () => {
          await api.auth.createUserIfSignup(user.user_id, user.emails[0].email);
        };
        createUserIfSignup();

        router.replace("/persona");
      } else {
        // router.replace("/");
      }
    } catch (error) {
      console.error("Error creating user on signup: ", error);
      // router.replace("/");
    }
  }, [router, user, isInitialized]);

  return <AuthFallback />;
}

export function AuthFallback() {
  // const variantIndex = Math.floor(
  //   Math.random() * Object.keys(ColorVariantMap).length,
  // );
  // const variant = Object.keys(ColorVariantMap).at(variantIndex) as ColorVariant;
  const variant = "green";

  return (
    <div
      className={gradientVariants({
        variant: variant,
        className:
          "relative grid h-screen w-screen grid-cols-3 place-items-center gap-4 overflow-hidden p-4 backdrop-blur-[100px]",
      })}
    >
      <div />
      <div className="flex h-3/4 flex-col items-center justify-between">
        <PersonStandingIcon className="size-10 text-black opacity-75" />
        <div className="flex flex-col gap-1 text-center">
          <p>Logging into...</p>
          <h1 className="text-4xl font-bold">InstantPersonas</h1>
          <p className="text-sm">This may take a few seconds.</p>
        </div>
        <BarLoader
          color={ColorVariantMap[variant]}
          height={10}
          width={500}
          className="rounded-full"
        />
      </div>
    </div>
  );
}

export default Authenticate;
