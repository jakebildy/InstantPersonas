import React from "react";
// const STRIPE_PUBLIC_TOKEN = import.meta.env.VITE_STRIPE_PUBLIC_TOKEN;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "stripe-buy-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

interface StripeBuyButtonProps {
  buyButtonId: string;
  email: string;
  id: string;
}

const testing = import.meta.env.DEV;
const STRIPE_PUBLIC_TOKEN = import.meta.env.VITE_STRIPE_PUBLIC_TOKEN;

const StripeBuyButton: React.FC<StripeBuyButtonProps> = ({
  buyButtonId,
  email,
  id,
}) => {
  if (testing) {
    return (
      <div className="pt-4 w-full flex justify-center overflow-clip rounded">
        <stripe-buy-button
          buy-button-id={"buy_btn_1NEPwSFTqqPiFdIjJxX6nu8n"}
          publishable-key={STRIPE_PUBLIC_TOKEN}
          client-reference-id={id}
          customer-email={email}
        />

        <script async src="https://js.stripe.com/v3/buy-button.js"></script>
      </div>
    );
  }
  return (
    <div className="pt-4 w-full flex justify-center overflow-clip rounded">
      <stripe-buy-button
        // className="w-full"
        buy-button-id={buyButtonId}
        // publishable-key={STRIPE_PUBLIC_TOKEN}
        publishable-key={
          "pk_live_51MyjOoFTqqPiFdIjIW6cmT8tmE1vKaLMW6kTHEyTwsfqgaeCdYAmsIM1geTuccUhUr2wRRYQ79A6HCwbt1JNn0Ij00YAW2R2oi"
        }
        client-reference-id={id}
        customer-email={email}
      />

      <script async src="https://js.stripe.com/v3/buy-button.js"></script>
    </div>
  );
};

export default StripeBuyButton;
