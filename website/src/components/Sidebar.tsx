import { Fragment, useEffect, useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  BanknotesIcon,
  BookmarkIcon,
  // BriefcaseIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { Dialog, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { Logo } from "./Logo";
import { PersonStandingIcon } from "lucide-react";

const navigation = [
  { name: "Persona Creator", href: "/persona", icon: PersonStandingIcon },
  { name: "History", href: "/history", icon: BookmarkIcon },
  { name: "Subscription", href: "/subscription", icon: BanknotesIcon },
  // { name: "Become an Affiliate", href: "/affiliate", icon: FireIcon },
  {
    name: "Send Feedback",
    href: "https://forms.gle/zei5QLdBTfTgssBv9",
    icon: PencilSquareIcon,
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = ({ currentSelectedPage, children }: any) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, refreshUser } = useUser();

  useEffect(() => {
    refreshUser();
  }, []);

  function Content() {
    return (
      <div
        className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#ffffff] px-3 "
        style={{ fontFamily: "Jost" }}
      >
        <title>Instant Personas | Dashboard</title>
        <div className="flex h-16 shrink-0 items-center">
          <p className="text-xl font-bold text-black flex">
            <Logo className="h-7 w-8 bg-cover object-contain mr-2" />
            Instant Personas
          </p>
        </div>

        <nav className="flex flex-1 flex-col px-3">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={classNames(
                        item.name == currentSelectedPage
                          ? "bg-green-50 text-black"
                          : "text-slate-500 hover:text-white hover:bg-green-400",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold select-none"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.name == currentSelectedPage
                            ? "text-green-400"
                            : "text-slate-200 group-hover:text-white",
                          "h-6 w-6 shrink-0"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li className="-mx-6 mt-auto">
              <a
                href=""
                className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-black hover:bg-blue-500"
              >
                <span className="sr-only">Your profile</span>
                <span aria-hidden="true">{user?.email}</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }

  return (
    <>
      <div>
        {/* Mobile Sidebar */}
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <Content />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <Content />
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-[white] px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-black lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-xl font-semibold leading-6 text-white">
            <p className="text-xl font-bold text-black flex">
              <Logo className="h-7 w-8 bg-cover object-contain mr-1" />
              Instant Personas
            </p>
          </div>
        </div>
        <main className="lg:pl-72 bg-slate-50 h-screen">{children}</main>
      </div>
    </>
  );
};

export default Sidebar;
