import clsx from "clsx";

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
  return (
    <div className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 lg:mt-8 ">
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
      <a
        href="signup"
        aria-describedby="tier-freelancer"
        // className="mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300"
        className={clsx(
          "mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600",
          "text-green-600 ring-1 ring-inset ring-green-200 hover:ring-green-300",
          popular ? "bg-green-50" : "bg-white"
        )}
      >
        Start trial
      </a>
    </div>
  );
}

export function Pricing() {
  return (
    <div className="bg-white py-24 sm:py-32" id="pricing">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-green-600">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Pricing plans for teams of&nbsp;all&nbsp;sizes
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          If you're not completely satisfied, cancel for free before the free
          trial ends.
        </p>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 gap-x-8 sm:mt-20 lg:max-w-[700px] lg:grid-cols-2">
          {/* InstantPersonas Pricing */}
          <Plan
            name="Monthly"
            price="$7.99"
            description="Billed every month."
            description2=""
            features={[
              "Unlimited User Personas",
              "Persona Chat - Powered by AI",
              "Deep Target Market Insights",
              "Priority support",
            ]}
          />
          <Plan
            name="Yearly"
            price="$5.99"
            description="Billed annually."
            description2="Save more with the yearly plan."
            features={[
              "Unlimited User Personas",
              "Persona Chat - Powered by AI",
              "Deep Target Market Insights",
              "Priority support",
            ]}
            popular
          />
        </div>
      </div>
    </div>
  );
}
