// app/privacy-policy/page.tsx
"use client";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen text-lightText p-8 md:p-16">
      <div className="max-w-4xl mx-auto bg-blue p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-orange hover:text-orangeHover transition-colors duration-300">
          Privacy Policy
        </h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-orange hover:text-orangeHover transition-colors duration-300">
            1. Introduction
          </h2>
          <p>
            This website (“we”, “our”, “us”) allows clients to display their
            Facebook photos in a public gallery. Protecting your privacy and
            personal information is important to us.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-orange hover:text-orangeHover transition-colors duration-300">
            2. Data We Collect
          </h2>
          <p>
            When a client logs in with Facebook, we collect their Facebook
            photos that they choose to share.
          </p>
          <p>
            We also collect the minimum account information required to fetch
            and display these photos (e.g., name, Facebook ID).
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-orange hover:text-orangeHover transition-colors duration-300">
            3. How We Use Your Data
          </h2>
          <p>
            Photos are used only to display in the public gallery on this
            website.
          </p>
          <p>
            We do not share, sell, or distribute your photos or personal
            information to third parties.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-orange hover:text-orangeHover transition-colors duration-300">
            4. Storage and Security
          </h2>
          <p>Photos are stored securely on our servers or cloud storage.</p>
          <p>We implement reasonable security measures to protect your data.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-orange hover:text-orangeHover transition-colors duration-300">
            5. Your Rights
          </h2>
          <p>
            Clients can request removal of their photos at any time by
            contacting us at{" "}
            <a
              href="mailto:abrahamtrigs@gmail.com"
              className="text-blue font-medium hover:underline"
            >
              abrahamtrigs@gmail.com
            </a>
            .
          </p>
          <p>Users can also request access to or deletion of their data.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-orange hover:text-orangeHover transition-colors duration-300">
            6. Contact Us
          </h2>
          <p>
            If you have any questions about this privacy policy, please contact
            us at:
          </p>
          <p>
            Email:{" "}
            <a
              href="mailto:abrahamtrigs@gmail.com"
              className="text-blue font-medium hover:underline"
            >
              abrahamtrigs@gmail.com
            </a>
          </p>
          <p>
            Website:{" "}
            <a
              href="https://shadilockfabrications.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue font-medium hover:underline"
            >
              https://shadilockfabrications.com/
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
