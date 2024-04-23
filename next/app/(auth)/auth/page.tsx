import Authenticate from "@/components/auth/stytch-auth";

export default function AuthenticatePage() {
  const test = true;
  return test ? <div>auth....</div> : <Authenticate />;
}
