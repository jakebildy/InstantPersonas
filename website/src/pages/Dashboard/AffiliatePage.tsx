import Sidebar from "../../components/Sidebar";

export default function AffiliatePage() {
  const link = "https://affiliates.reflio.com/invite/InstantPersonas";
  return (
    <>
      <Sidebar currentSelectedPage="Become an Affiliate">
        <h1 className=" text-3xl  text-gray-700 text-center mt-10  font-bold">
          Instant Personas Affiliate Program
        </h1>

        <div className="bg-white shadow sm:rounded-lg mt-5 mx-10">
          <div className="px-4 py-5 sm:p-6">
            <img src={"affiliate.jpg"} style={{ height: "200px" }} />
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Earn when you refer a friend to Instant Personas.
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                You will earn 20% of the revenue from the first 1 year of any
                subscription someone you refer purchases.
              </p>
              {/* And they will get 20%
                off their subsciprtion! */}
            </div>
            <div className="mt-5">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                <a href={link}>Join now</a>
              </button>
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  );
}
