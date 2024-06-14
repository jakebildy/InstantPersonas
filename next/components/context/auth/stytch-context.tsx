"use client";
import { createStytchUIClient } from "@stytch/nextjs/ui";
import { StytchProvider } from "@stytch/nextjs";

export const stytch = createStytchUIClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN,
);
type Props = {
  children: React.ReactNode;
};

export default function StytchContext({ children }: Props) {
  return <StytchProvider stytch={stytch}>{children}</StytchProvider>;
}
