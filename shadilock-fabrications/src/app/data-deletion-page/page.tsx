// app/data-deletion/page.tsx
"use client";

export default function DataDeletionPage() {
  return (
    <div className="min-h-screen text-lightText p-8 md:p-16">
      <div className="max-w-4xl mx-auto bg-blue p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-orange hover:text-orangeHover transition-colors duration-300">
          Data Deletion Instructions
        </h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-orange hover:text-orangeHover transition-colors duration-300">
            1. Introduction
          </h2>
          <p>
            We respect your privacy. If you want your data removed from our app,
            please follow the instructions below.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-orange hover:text-orangeHover transition-colors duration-300">
            2. Data We Collect
          </h2>
          <p>- Facebook photos you choose to share.</p>
          <p>- Basic account information (name, Facebook ID).</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-orange hover:text-orangeHover transition-colors duration-300">
            3. How to Request Deletion
          </h2>
          <p>
            To request deletion of your data, send an email to{" "}
            <span className="text-blue font-medium">
              [abrahamtrigs@gmail.com]
            </span>{" "}
            with the subject line:{" "}
            <span className="italic">“Delete My Data”</span>.
          </p>
          <p>
            Please include your{" "}
            <span className="text-orange font-medium">Facebook account ID</span>{" "}
            or the{" "}
            <span className="text-orange font-medium">email address</span> used
            to log in.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-orange hover:text-orangeHover transition-colors duration-300">
            4. What Happens Next
          </h2>
          <p>- We will remove all your photos from our public gallery.</p>
          <p>- Any stored personal information will be deleted permanently.</p>
          <p>
            - You will receive a confirmation email once deletion is complete.
          </p>
        </section>
      </div>
    </div>
  );
}
