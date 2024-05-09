import { cn } from "@/lib/utils";
import { Container } from "../container";
import { InstantPersonas } from "../instantPersonas";
import Link from "next/link";

export default function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("bg-slate-50", className)}>
      <Container>
        <div className="sm:py-16 py-4">
          <div className="mx-auto grid place-items-center">
            <InstantPersonas isCollapsed={true} />
          </div>
          <nav className="mt-4 sm:mt-10 text-sm" aria-label="quick links">
            <div className="-my-1 flex justify-center gap-x-6">
              {[
                { text: "Features", href: "/#features" },
                {
                  text: "Blog",
                  href: "/blog",
                },
                {
                  text: "Pricing",
                  href: "/#pricing",
                },
              ].map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  className="inline-block rounded-lg px-2 py-1 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </nav>
        </div>
        <div className="flex flex-col items-center border-t border-slate-400/10 py-4 sm:py-10 sm:flex-row-reverse justify-center ">
          <p className="text-sm text-slate-500 sm:mt-0 max-sm:text-center">
            Copyright &copy; {new Date().getFullYear()} InstantPersonas.com all
            rights reserved. By using this site, you agree to our{" "}
            <Link href="/terms-of-service" className="font-bold">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </Container>
    </footer>
  );
}
