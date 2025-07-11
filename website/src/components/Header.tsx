import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";

import { NavLink } from "./NavLink";
import { Container } from "./Container";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import logo from "../assets/logo_new.png";

function MobileNavLink({ href, children }: any) {
  return (
    <Popover.Button as={Link} to={href} className="block w-full p-2">
      {children}
    </Popover.Button>
  );
}

function MobileNavIcon({ open }: any) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          "origin-center transition",
          open && "scale-90 opacity-0"
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          "origin-center transition",
          !open && "scale-90 opacity-0"
        )}
      />
    </svg>
  );
}

function MobileNavigation() {
  return (
    <Popover>
      <Popover.Button
        className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            as="div"
            className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
          >
            <MobileNavLink href="#features">Features</MobileNavLink>
            <MobileNavLink href="#testimonials">Testimonials</MobileNavLink>
            <MobileNavLink href="#pricing">Pricing</MobileNavLink>
            <hr className="m-2 border-slate-300/40" />
            <MobileNavLink href="/login">Sign in</MobileNavLink>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  );
}

export function Header({
  title,
  isBlog,
}: {
  title?: string;
  isBlog?: boolean;
}) {
  return (
    <header className="py-10" style={{ fontFamily: "Jost" }}>
      <title>
        {title ? title : "Detailed User Personas in Seconds | Try for Free"}
      </title>
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <a
              href="https://InstantPersonas.com/"
              aria-label="Home"
              className="flex items-center"
            >
              <img
                src={logo}
                className="h-8 w-auto pr-2 "
                alt={"Instant Personas"}
              />
              {/* <p className="text-2xl font-bold text-gray-800">TeacherDashboard<b className="text-mypurple">.</b>ai</p> */}
              <p
                className="font-bold text-gray-800 xs:text-xs md:text-xl"
                style={{ fontFamily: "Jost" }}
              >
                Instant Personas
              </p>
            </a>
            <div className="hidden md:flex md:gap-x-6">
              {!isBlog ? <NavLink href="#features">Features</NavLink> : <div />}
              {!isBlog ? <NavLink href="/blog">Blog</NavLink> : <div />}
              {/* <NavLink href="#testimonials">Testimonials</NavLink> */}
              {!isBlog ? <NavLink href="#pricing">Pricing</NavLink> : <div />}
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block">
              <NavLink href="/login">Sign in</NavLink>
            </div>
            <Button href="/register" color="green" className="hidden sm:block">
              <span>Try for free</span>
            </Button>
            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}
