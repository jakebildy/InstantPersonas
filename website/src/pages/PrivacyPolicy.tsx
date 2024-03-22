export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        Privacy Policy for InstantPersonas.com
      </h1>

      <p className="mb-2">
        <strong>Last updated:</strong> March 22, 2024
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
        <p className="mb-4">
          We are committed to protecting your privacy. This privacy policy
          explains how we collect, use, and disclose your personal information.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          2. Information We Collect
        </h2>
        <p className="mb-4">
          We collect information you provide directly to us, such as when you
          create or modify your account, request support, or otherwise
          communicate with us.
        </p>

        {/* we may collect anonymized data for the purposes of finetuning our AI */}
        <p className="mb-4">
          We may collect anonymized data for the purposes of finetuning our AI.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          3. How We Use Your Information
        </h2>
        <p className="mb-4">
          We use the information we collect to provide, maintain, and improve
          our services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          4. How We Share Your Information
        </h2>
        <p className="mb-4">
          We may share your information with third-party service providers for
          the purpose of providing our services to you.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">5. Security</h2>
        <p className="mb-4">
          We take reasonable measures to help protect your information from
          loss, theft, misuse, and unauthorized access, disclosure, alteration,
          and destruction.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          6. Changes to this Policy
        </h2>
        <p className="mb-4">
          We may revise this privacy policy from time to time. The most current
          version of the policy will govern our use of your information and will
          always be at instantpersonas.com/privacy-policy.
        </p>
      </section>
    </div>
  );
}
