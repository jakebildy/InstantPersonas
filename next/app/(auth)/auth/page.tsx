import Authenticate from "@/components/auth/stytch-auth";
import { Suspense } from "react";
import BarLoader from "react-spinners/BarLoader";

export default function AuthenticatePage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col justify-center items-center h-full w-full mt-[200px]">
          <div className="text-slate-500 mb-4">
            Getting subscription status...
          </div>

          <BarLoader
            color="#36d7b7"
            height={10}
            width={500}
            className="rounded-full"
          />
        </div>
      }
    >
      <Authenticate />
    </Suspense>
  );
}
