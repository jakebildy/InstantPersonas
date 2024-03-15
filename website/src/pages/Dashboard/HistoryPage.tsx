import Sidebar from "../../components/Sidebar";
import { BusinessI } from "../../services/api.service";
import { TrashIcon } from "@heroicons/react/24/solid";
import createFirstBusiness from "../../images/ProjectAnalysis.gif";

export default function HistoryPage() {
  // const { businesses } = useBusiness();

  return (
    <>
      <Sidebar currentSelectedPage="History">
        <h1 className=" text-3xl  text-gray-700 text-center mt-10  font-bold">
          History
        </h1>
        <div className=" mt-10">
          {/* {businesses.length == 0 && ( */}
          {true && ( //TODO: replace this with the personas
            <div className="text-center">
              <img
                src={createFirstBusiness}
                style={{ height: "300px" }}
                className="mx-auto"
              />
              <p className="text-gray-500 font-bold text-sm w-350 mb-5">
                No history yet. Create your first persona to get started.
              </p>
              <a
                className="text-white py-2 px-3 bg-green-500 rounded font-bold text-sm w-350"
                href="/persona"
              >
                Create my first persona
              </a>
            </div>
          )}
          {/* {businesses
            .slice(0)
            .reverse()
            .map((business) => (
              <BusinessCard
                description={business.description}
                business={business}
                index={0}
                // Convert the date to a human readable string
                date={new Date(
                  business.createdAt || Date.now()
                ).toLocaleDateString()}
              /> */}
          {/* ))} */}
        </div>
      </Sidebar>
    </>
  );
}

//@ts-ignore
function BusinessCard({
  description,
  index,
  date,
  business,
}: {
  description: string;
  index: number;
  date: string;
  business: BusinessI;
}) {
  // const [showDropdown, setShowDropdown] = useState(false);
  // const { deleteBusiness } = useBusiness();

  return (
    <span
      className="flex items-center hover:bg-gray-100 w-full"
      style={{ padding: "30px" }}
      onClick={(event) => {
        // go to /tools/:id
        window.location.href = "/persona/" + business._id;
        event.stopPropagation(); // Stop event propagation
      }}
    >
      <img
        src={"history_icons/" + index + ".png"}
        style={{ height: "60px" }}
        className="mr-4"
      />

      <div className=" w-10/12">
        <p className="text-gray-500 font-bold text-sm w-350">{date}</p>
        <p className="text-gray-700 font-bold text-sm w-350">{description}</p>
      </div>

      <div>
        <button
          className="text-gray-300 hover:text-gray-500"
          onClick={(event) => {
            // deleteBusiness(business);s

            event.stopPropagation(); // Stop event propagation
          }}
        >
          <TrashIcon style={{ height: "20px" }} />
        </button>

        {/* {showDropdown && (
          <div
            className="absolute right-36 z-10 mt-2 w-56 origin-top-right rounded-md bg-white hover:bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="py-1" role="none">
              <button
                type="submit"
                onClick={(event) => {
                  deleteBusiness(business);
                  setShowDropdown(false);
                  event.stopPropagation(); // Stop event propagation
                }}
                className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                role="menuitem"
                id="menu-item-3"
              >
                Delete Business
              </button>
            </div>
          </div>
        )} */}
      </div>
    </span>
  );
}

export function EllipsisVertical() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      height={30}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
      ></path>
    </svg>
  );
}
