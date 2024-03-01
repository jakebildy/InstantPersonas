// login.jsx
import { StytchLogin } from "@stytch/react";

const API_URL = import.meta.env.VITE_API_URL as string;
const oauthRedirectUrl = API_URL + "/api/stytch/google";
const redirectUrl = API_URL + "/api/stytch";

const Login = () => {

  const config = {
    products: ["oauth", "emailMagicLinks"],
    oauthOptions: {
      providers: [
        {
          type: "google",
        },
      ],
      loginRedirectURL: oauthRedirectUrl,
      signupRedirectURL: oauthRedirectUrl,
    },
    emailMagicLinksOptions: {
      loginRedirectURL: redirectUrl,
      loginExpirationMinutes: 30,
      signupRedirectURL: redirectUrl,
      signupExpirationMinutes: 30,
    },
  };
  const styles = {
    container: {
      backgroundColor: "#FFFFFF",
      borderColor: "#FFFFFF",
      borderRadius: "0px",
      width: "100%",
    },
    colors: {
      primary: "#353e44",
      secondary: "#5C727D",
      success: "#0C5A56",
      error: "#8B1214",
    },
    buttons: {
      primary: {
        backgroundColor: "#3751FF",
        textColor: "#FFFFFF",
        borderColor: "#FFFFFF",
        borderRadius: "4px",
      },
      secondary: {
        backgroundColor: "#FFFFFF",
        textColor: "#19303D",
        borderColor: "#19303D",
        borderRadius: "4px",
      },
    },
    fontFamily: "Arial",
    hideHeaderText: false,
    // headerText: "Sign in to Seashore",
    // logo: {
    //   logoImageUrl: "https://setup.seashore.ai/logo.svg",
    // },
  };

  return <StytchLogin config={config as any} styles={styles} callbacks={{
    onEvent: (event: any) => {
      console.log("🚀 Stytch event:");
      console.log(event);
    },
  }} />;
};

export default Login;
