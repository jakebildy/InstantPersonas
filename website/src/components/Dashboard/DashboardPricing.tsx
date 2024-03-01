import { useUser } from "../../contexts/UserContext";
import StripeBuyButton from "../common/StripeBuyButton";
// import { useTeacher } from "../../contexts/TeacherContext";

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

function Plan({
  name,
  price,
  description,
  description2,
  features,
  popular,
}: any) {
  const { user } = useUser();

  if (!user || !user._id) return null;

  return (
    <div className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-6 ">
      <div>
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
        <p className="mt-4 text-sm leading-6 text-gray-600">{description}</p>

        <p className="mt-6 flex items-baseline gap-x-1">
          <span className="text-4xl font-bold tracking-tight text-gray-900">
            {price}
          </span>
          <span className="text-sm font-semibold leading-6 text-gray-600">
            /month
          </span>
        </p>
        {popular && (
          <p className="rounded-md bg-green-600/10 px-2.5 py-1 text-xs font-semibold  text-green-600">
            {description2}
          </p>
        )}
        <ul
          role="list"
          className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
        >
          {features.map((feature: string) => (
            <li key={feature} className="flex gap-x-3">
              <CheckIcon />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Button */}
      <StripeBuyButton
        buyButtonId={
          popular
            ? "buy_btn_1NECYJFTqqPiFdIjGidtKvOF" //yearly
            : "buy_btn_1NEC2wFTqqPiFdIjSPhMM9cC"
        }
        id={user._id}
        email={user.email}
      />
    </div>
  );
}

export function DashboardPricing() {
  const features = [
    "Unlimited User Personas",
    "Unlimited SWOT and PESTEL Analyses",
    "Advanced Lean Canvases",
    "Priority support",
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mt-10 text-3xl font-bold tracking-tight text-gray-900">
            Pricing
          </h1>
        </div>

        {/* Teacher Dashboard Pricing */}
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-y-8 gap-x-8 md:max-w-[800px] md:grid-cols-2">
          {/* Yearly 4.99 / month */}
          <Plan
            name="Yearly"
            price="$9.99"
            description="Billed annually."
            description2="Save more with the yearly plan."
            features={features}
            popular
          />

          {/* Quartly 9.99 / month */}
          <Plan
            name="Monthly"
            price="$12.99"
            description="Billed every month."
            description2=""
            features={features}
          />
        </div>

        {/* 30 Day Garantee Message */}
        <div className="mt-5 text-center w-full flex justify-center">
          <p className="text-sm font-semibold leading-6 text-gray-600 max-w-lg">
            {/* 30-day money-back guarantee. Cancel anytime. */}
            We offer a 30-day full refund guarantee. If for any reason you are
            not satisfied with our product within 30 days of your purchase, we
            will gladly give you a full refund.
          </p>
        </div>
      </div>
    </div>
  );
}
