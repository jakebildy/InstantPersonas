import { cn } from "@/lib/utils";

import { InstantPersonas } from "@/components/instantPersonas";
import Link from "next/link";
import { BLOG_FOOTER_LINKS } from "@/lib/site";

export function BlogFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("bg-slate-50", className)}>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <div className="mx-auto grid place-items-center">
            <InstantPersonas isCollapsed={true} />
          </div>
          <nav className="mt-4 text-sm" aria-label="quick links">
            <div className="-my-1 flex justify-center gap-x-6">
              {BLOG_FOOTER_LINKS.map((link) => (
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
        <div className="flex flex-col items-center justify-center border-t border-slate-400/10 py-4 sm:flex-row-reverse sm:py-10">
          <p className="text-sm text-slate-500 max-sm:text-center sm:mt-0">
            Copyright &copy; {new Date().getFullYear()} InstantPersonas.com all
            rights reserved. By using this site, you agree to our{" "}
            <Link href="/terms-of-service" className="font-bold">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </section>
    </footer>
  );
}
