import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for Ibrahim Sbouai's Portfolio.",
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container-narrow">
        <SectionHeading
          number="T1"
          label="Legal"
          title="Terms & Conditions"
        />
        <div className="mt-12 text-muted text-fluid-body space-y-6">
          <p>
            By accessing and using this portfolio website, you agree to these Terms and Conditions.
          </p>
          <h2 className="text-xl font-light text-foreground mt-8 mb-4">Intellectual Property</h2>
          <p>
            The content, design, and projects displayed on this website are the intellectual property of Ibrahim Sbouai unless otherwise stated. You may not reproduce, distribute, or use this material for commercial purposes without explicit permission. Open-source projects linked (e.g., via GitHub) operate under their respective repository licenses.
          </p>
          <h2 className="text-xl font-light text-foreground mt-8 mb-4">Website Usage & Acceptable Use</h2>
          <p>
            This website is provided for informational and professional networking purposes. You agree not to misuse the contact forms, attempt to bypass security measures, or engage in automated scraping, spamming, or attacks against the infrastructure.
          </p>
          <h2 className="text-xl font-light text-foreground mt-8 mb-4">External Links</h2>
          <p>
            This website contains links to external platforms such as GitHub and LinkedIn. We are not responsible for the content, privacy practices, or availability of external sites.
          </p>
          <h2 className="text-xl font-light text-foreground mt-8 mb-4">Limitation of Liability</h2>
          <p>
            The information on this website is provided &ldquo;as is&rdquo; for professional illustration. While efforts are made to ensure factual accuracy in project and experience descriptions, Ibrahim Sbouai assumes no liability for errors, omissions, or damages resulting from the use of this website.
          </p>
        </div>
      </div>
    </div>
  );
}
