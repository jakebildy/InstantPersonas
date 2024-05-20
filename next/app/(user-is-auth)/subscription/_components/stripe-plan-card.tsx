"use client";
import StripeBuyButton from "./stripe-buy-button";
import { useInstantPersonasUser } from "@/components/context/auth/user-context";

type StripePlanCardProps = {
  name: string;
  price: string;
  description: string;
  description2?: string;
  features: string[];
  popular?: boolean;
};

export function StripePlanCard({
  name,
  price,
  description,
  description2,
  features,
  popular,
}: StripePlanCardProps) {
  const { user } = useInstantPersonasUser();

  if (!user) return null;

  return (
    <div className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-6 text-left">
      <div className="flex items-center justify-between gap-x-4">
        <h3
          id="tier-freelancer"
          className="text-lg font-semibold leading-8 text-gray-900"
        >
          {name}
        </h3>
        {popular && (
          <p className="rounded-full bg-green-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-green-600">
            Best value
          </p>
        )}
      </div>
      <p className="text-sm leading-6 text-gray-600">{description}</p>

      <p className="mt-6 flex items-baseline gap-x-1">
        <span className="text-4xl font-bold tracking-tight text-gray-900">
          {price}
        </span>
        <span className="text-sm font-semibold leading-6 text-gray-600">
          /month
        </span>
      </p>
      {popular && (
        <p className="rounded-md bg-green-600/10 px-2.5 py-1 my-2 text-xs font-semibold  text-green-600">
          {description2}
        </p>
      )}
      <ul
        role="list"
        className="my-4 space-y-3 text-sm leading-6 text-gray-600"
      >
        {features.map((feature: string) => (
          <li key={feature} className="flex gap-x-3">
            <CheckIcon />
            {feature}
          </li>
        ))}
      </ul>
      <StripeBuyButton
        buyButtonId={
          process.env.NEXT_PUBLIC_STRIPE_TEST_MODE === "true"
            ? popular
              ? "buy_btn_1P7PaSCtCkpcyaeH9pIp7ryc" //yearly
              : "buy_btn_1P7PZnCtCkpcyaeH1W5Aty7T"
            : popular
            ? "buy_btn_1OwXj6CtCkpcyaeHizOLRjdm" //yearly
            : "buy_btn_1OwXkNCtCkpcyaeHZB5J9raH"
        }
        id={user.id}
        email={user.emails[0].email}
      />
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      className="h-6 w-5 flex-none text-green-600"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}
