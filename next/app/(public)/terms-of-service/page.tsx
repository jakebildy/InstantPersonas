import { InstantPersonas } from "@/components/instantPersonas";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

type TOSSection = { title: string; content: JSX.Element };

const agreementToTermsSection: TOSSection = {
  title: "Agreement to Terms",
  content: (
    <p>
      By accessing or using our service, you agree to be bound by these terms.
      If you do not agree to these terms, please do not use our service.
    </p>
  ),
};

const serviceDescriptionSection: TOSSection = {
  title: "Service Description",
  content: (
    <p>
      InstantPersonas.com provides a service that generates user personas based
      on the input you provide. The service is provided &quot;as is&quot; and
      &quot;as available&quot; without any warranty or condition, express,
      implied or statutory.
    </p>
  ),
};

const accountsAndMembershipSection: TOSSection = {
  title: "Accounts and Membership",
  content: (
    <p>
      You must register for an account to access certain features of our
      service. You are responsible for maintaining the confidentiality of your
      account and password.
    </p>
  ),
};

const intellectualPropertySection: TOSSection = {
  title: "Intellectual Property",
  content: (
    <p>
      All intellectual property rights in the service and its content are the
      exclusive property of InstantPersonas.com and its licensors.
    </p>
  ),
};

const userConductSection: TOSSection = {
  title: "User Conduct",
  content: (
    <p>
      You must not misuse our services or interfere with the normal operation of
      our services, including by trying to access them using a method other than
      the interface and the instructions that we provide.
    </p>
  ),
};

const terminationSection: TOSSection = {
  title: "Termination",
  content: (
    <p>
      We may terminate or suspend access to our service immediately, without
      prior notice or liability, for any reason whatsoever, including without
      limitation if you breach the terms.
    </p>
  ),
};

const limitationOfLiabilitySection: TOSSection = {
  title: "Limitation of Liability",
  content: (
    <p>
      InstantPersonas.com shall not be liable for any indirect, incidental,
      special, consequential or punitive damages, including without limitation,
      loss of profits, data, use, goodwill, or other intangible losses.
    </p>
  ),
};

const governingLawSection: TOSSection = {
  title: "Governing Law",
  content: (
    <p>
      These terms shall be governed by and construed in accordance with the laws
      of Ontario, Canada, without regard to its conflict of law provisions.
    </p>
  ),
};

const changesToTermsSection: TOSSection = {
  title: "Changes to Terms",
  content: (
    <p>
      We reserve the right to modify or replace these terms at any time at our
      sole discretion. By continuing to access or use our service after
      revisions become effective, you agree to be bound by the revised terms.
    </p>
  ),
};

const contactUsSection: TOSSection = {
  title: "Contact Us",
  content: (
    <p className="mb-4">
      If you have any questions about these terms, please contact us{" "}
      <Link
        href="https://forms.gle/zei5QLdBTfTgssBv9"
        className="font-bold underline-offset-2 hover:underline"
      >
        here
      </Link>{" "}
      or reach out via email.
    </p>
  ),
};

const sections: TOSSection[] = [
  agreementToTermsSection,
  serviceDescriptionSection,
  accountsAndMembershipSection,
  intellectualPropertySection,
  userConductSection,
  terminationSection,
  limitationOfLiabilitySection,
  governingLawSection,
  changesToTermsSection,
  contactUsSection,
];

export default function TermsOfService() {
  return (
    <main className="bg-gradient-to-b from-slate-50 to-green-50">
      <div className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-8">
        <h1 className="flex gap-4 text-3xl font-bold">
          Terms of Service for <InstantPersonas className="text-3xl" />
        </h1>
        <p>
          <strong>Last updated:</strong> March 22, 2024
        </p>
        <Separator />
        <div className="flex flex-col gap-10">
          {sections.map((section, index) => (
            <section key={index}>
              <h2 className="mb-3 text-2xl font-semibold">
                {index}. {section.title}
              </h2>
              {section.content}
            </section>
          ))}
        </div>
        <Separator />
        <p className="text-sm">
          By using InstantPersonas.com, you acknowledge that you have read and
          understand these Terms of Service.
        </p>
      </div>
    </main>
  );
}
