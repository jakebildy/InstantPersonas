"use client";
import Link from "next/link";
import { InstantPersonas } from "@/components/instantPersonas";
import { Button } from "@/components/ui/button";
import { Container } from "./container";
import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { LANDING_HEADER_LINKS } from "@/lib/site";

type Props = { title?: string };

export default function Header({ title }: Props) {
  return (
    <header className="py-10 font-jost">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <InstantPersonas />
            <div className="hidden md:flex md:gap-x-6">
              {LANDING_HEADER_LINKS.map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  className="inline-block rounded-lg px-2 py-1 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block">
              <Link
                href="/login"
                className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              >
                Sign in
              </Link>
            </div>
            <Button
              variant={"green"}
              size="rounded"
              className="hidden sm:block"
            >
              <Link href="/register">Try for free</Link>
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
        className={cn("origin-center transition", open && "scale-90 opacity-0")}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={cn(
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
            <Link href="#features" className="block w-full p-2">
              Features
            </Link>
            <Link href="#testimonials" className="block w-full p-2">
              Testimonials
            </Link>
            <Link href="#pricing" className="block w-full p-2">
              Pricing
            </Link>
            <hr className="m-2 border-slate-300/40" />
            <Link href="/login" className="block w-full p-2">
              Sign in
            </Link>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  );
}
