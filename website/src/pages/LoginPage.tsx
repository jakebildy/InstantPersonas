import React from "react";
import TDLogo from "../assets/logo_new.png";
import StytchLogin from "../components/common/StytchLogin";
import { World } from "@/components/ui/globe";
import { BackgroundGradientAnimation } from "@/components/ui/gradient_background_login";
import { globeConfig, sampleArcs } from "@/lib/utilities";

const LoginPage: React.FC = () => {
  return (
    <div className="flex min-h-screen ">
      <title>Instant Personas | Get Started</title>
      {/* Login Side Bar */}

      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Title */}
          <div className="flex items-center justify-left">
            <img className="h-10 w-auto" src={TDLogo} alt="Your Company" />
            <p className="ml-2 text-3xl font-bold text-gray-900">
              Instant Personas
            </p>
          </div>

          {/* Login Form */}
          {/* In notes */}

          <StytchLogin />
        </div>
      </div>
      <div className="hidden lg:flex flex-1 items-center justify-center">
        <BackgroundGradientAnimation>
          {" "}
          {/* center the world */}
          <div className="absolute w-full -bottom-20 h-72 md:h-full z-10">
            <World data={sampleArcs} globeConfig={globeConfig} />;
          </div>
        </BackgroundGradientAnimation>
      </div>
      {/* <div className="absolute w-full -bottom-20 -right-20 h-72 md:h-full z-10">
        <World data={sampleArcs} globeConfig={globeConfig} />;
      </div> */}
    </div>
  );
};

export default LoginPage;
