import Link from "next/link";

export const metadata = {
  title: "Terms of Service — Hicham Nostik Live Q&A",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back to Home
      </Link>

      <h1 className="mb-6 text-3xl font-bold">📜 Terms of Service</h1>
      <p className="mb-4 text-sm text-muted-foreground">
        Last updated: February 25, 2026
      </p>

      <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            1. Overview
          </h2>
          <p>
            Welcome to Hicham Nostik Live Q&A (&quot;the Service&quot;). By
            using this website, you agree to the following terms and conditions.
            The Service allows users to submit anonymous questions for the live
            stream show &quot;Hicham Nostik Live&quot;.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            2. Anonymity &amp; Privacy
          </h2>
          <p>
            We do not require any login, account creation, or personal
            information to use the free tier of our Service. We do not use
            cookies, tracking pixels, or any analytics tools that could identify
            individual users. Your privacy is our priority.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            3. VIP Questions (Paid Service)
          </h2>
          <p>
            Users may choose to submit a VIP question for a one-time fee of $5
            USD. Payment is processed securely by Paddle.com, our Merchant of
            Record. By purchasing a VIP question, you agree to Paddle&apos;s{" "}
            <a
              href="https://www.paddle.com/legal/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-2"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="https://www.paddle.com/legal/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-2"
            >
              Privacy Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            4. Refund Policy
          </h2>
          <p>
            VIP question payments are non-refundable once the question has been
            submitted and received by our system. If a technical error prevents
            your question from being delivered, please contact us and we will
            issue a full refund.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            5. Acceptable Use
          </h2>
          <p>
            You agree not to submit questions that contain hate speech, threats,
            illegal content, spam, or any content that violates the rights of
            others. We reserve the right to remove any question at our sole
            discretion without notice or refund.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            6. Content Ownership
          </h2>
          <p>
            By submitting a question, you grant Hicham Nostik Live a
            non-exclusive, royalty-free license to read, display, and discuss
            your question on the live stream and any related content.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            7. Disclaimer
          </h2>
          <p>
            The Service is provided &quot;as is&quot; without warranties of any
            kind. We do not guarantee that every submitted question will be read
            or answered on the live stream, including VIP questions.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            8. Changes to Terms
          </h2>
          <p>
            We may update these terms at any time. Continued use of the Service
            after changes constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            9. Contact
          </h2>
          <p>
            For any questions regarding these terms, please reach out during the
            live stream or through the show&apos;s official channels.
          </p>
        </section>
      </div>

      <div className="mt-12 border-t border-border/40 pt-6 text-center text-xs text-muted-foreground">
        <p>© 2026 Hicham Nostik Live. All rights reserved.</p>
      </div>
    </main>
  );
}
