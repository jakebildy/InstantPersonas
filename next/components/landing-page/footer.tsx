import { Container } from "../container";
import logo from "../assets/logo_new.png";
import { InstantPersonas } from "../instantPersonas";
import Link from "next/link";

export default function LandingFooter({ isBlog }: { isBlog?: boolean }) {
  return (
    <footer className="bg-slate-50">
      <Container>
        <div className="py-16">
          <div className="mx-auto grid place-items-center">
            <InstantPersonas isCollapsed={true} />
          </div>
          <nav className="mt-10 text-sm" aria-label="quick links">
            <div className="-my-1 flex justify-center gap-x-6">
              {[
                { text: "Features", href: "#features" },
                {
                  text: "Blog",
                  href: "/blog",
                },
                {
                  text: "Pricing",
                  href: "#pricing",
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
        <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse justify-center ">
          <p className="mt-6 text-sm text-slate-500 sm:mt-0">
            Copyright &copy; {new Date().getFullYear()} InstantPersonas.com All
            rights reserved. By using this site, you agree to our{" "}
            <a
              style={{ fontWeight: "bold" }}
              href="https://instantpersonas.com/terms-of-service"
            >
              Terms of Service
            </a>
            .
          </p>
        </div>
      </Container>
    </footer>
  );
}
