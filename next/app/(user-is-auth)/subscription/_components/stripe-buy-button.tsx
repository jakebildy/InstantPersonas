"use client";

declare global {
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

const testing = process.env.NEXT_PUBLIC_ENV === "dev";
const STRIPE_PUBLIC_TOKEN = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_TOKEN;

const StripeBuyButton: React.FC<StripeBuyButtonProps> = ({
  buyButtonId,
  email,
  id,
}) => {
  if (testing) {
    return (
      <div className="flex w-full justify-center overflow-clip rounded pt-4">
        <stripe-buy-button
          data-rewardful
          buy-button-id={buyButtonId}
          publishable-key={STRIPE_PUBLIC_TOKEN}
          client-reference-id={id}
          customer-email={email}
        />

        <script async src="https://js.stripe.com/v3/buy-button.js"></script>
      </div>
    );
  }
  return (
    <div className="flex w-full justify-center overflow-clip rounded pt-4">
      <stripe-buy-button
        data-rewardful
        buy-button-id={buyButtonId}
        publishable-key={
          "pk_live_51OtcoTCtCkpcyaeHAKlL4K2k67Jfxhdqkjop4trisy5ojZXlJezdf00PT6BEupBJzSIWXUDxXRIfKP2WDOczetPS00EUjOVLOH"
        }
        client-reference-id={id}
        customer-email={email}
      />

      <script async src="https://js.stripe.com/v3/buy-button.js"></script>
    </div>
  );
};

export default StripeBuyButton;
