import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import UserProvider from "./contexts/UserContext.tsx";
import { StytchProvider } from "@stytch/react";
import { StytchUIClient } from "@stytch/vanilla-js";
import { NotificationProvider } from "./contexts/NotificationContext.tsx";
import { clarity } from "react-microsoft-clarity";
import posthog from "posthog-js";
clarity.init("lkw9ytrajz");
console.log("Clarity initialized");

const stytch = new StytchUIClient(
  import.meta.env.VITE_STYTCH_PUBLIC_TOKEN as string
);

posthog.init("phc_QxTf3l3deKC3s9gd21PXco5eBQIikFkZ8YEkl7kizrd", {
  api_host: "https://app.posthog.com",
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StytchProvider stytch={stytch}>
      <NotificationProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </NotificationProvider>
    </StytchProvider>
  </React.StrictMode>
);
