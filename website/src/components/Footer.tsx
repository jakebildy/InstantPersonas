// import { Container } from './Container'
import { NavLink } from "./NavLink";
import { Container } from "./Container";
import logo from "../assets/logo_new.png";

export function Footer({ isBlog }: { isBlog?: boolean }) {
  return (
    <footer className="bg-slate-50">
      <Container>
        <div className="py-16">
          <img src={logo} className="mx-auto h-10 w-auto" />
          <nav className="mt-10 text-sm" aria-label="quick links">
            <div className="-my-1 flex justify-center gap-x-6">
              {isBlog ? null : <NavLink href="#features">Features</NavLink>}
              {isBlog ? null : <NavLink href="/blog">Blog</NavLink>}
              {isBlog ? null : <NavLink href="#pricing">Pricing</NavLink>}
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
