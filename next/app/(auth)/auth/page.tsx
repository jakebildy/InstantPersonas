import dynamic from "next/dynamic";

//@ts-ignore
const Authenticate = dynamic(() => import("@/components/auth/stytch-auth"), {
  ssr: false, // Disable server-side rendering for this component
});

export default function AuthenticatePage() {
  return <Authenticate />;
}
