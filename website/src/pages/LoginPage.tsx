import React from "react";
import bg from "../images/signup-background.jpg";
import TDLogo from "../assets/logo_new.png";
import StytchLogin from "../components/common/StytchLogin";

const LoginPage: React.FC = () => {
  return (
    <div className="flex min-h-screen">
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

      {/* Right Side BG Image */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={bg}
          alt=""
        />
      </div>
    </div>
  );
};

export default LoginPage;
