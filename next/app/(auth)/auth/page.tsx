import dynamic from "next/dynamic";

// Dynamically import the Authenticate component with SSR disabled
//@ts-ignore
const Authenticate = dynamic(() => import("@/components/auth/stytch-auth"), {
  ssr: false, // Disable server-side rendering for this component
});

export default function AuthenticatePage() {
  return <Authenticate />;
}
