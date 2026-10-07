import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Ibrahim Sbouai's Portfolio.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container-narrow">
        <SectionHeading
          number="P1"
          label="Legal"
          title="Privacy Policy"
        />
        <div className="mt-12 text-muted text-fluid-body space-y-6">
          <p>
            This Privacy Policy explains how information is collected and used on this portfolio website.
          </p>
          <h2 className="text-xl font-light text-foreground mt-8 mb-4">Contact Form Data</h2>
          <p>
            When you use the contact form, the website collects data you voluntarily provide, including your First Name, Last Name, Email, Subject (optional), and Message. 
            This data is stored securely in a private Firebase Firestore database and is used solely to respond to your inquiry. A notification is sent via Resend.
          </p>
          <h2 className="text-xl font-light text-foreground mt-8 mb-4">Tracking and Cookies</h2>
          <p>
            This website does not use tracking cookies or third-party analytics that collect personally identifiable information. Standard server logs may capture anonymized data such as IP addresses for security and rate-limiting purposes to protect the contact capabilities from abuse.
          </p>
          <h2 className="text-xl font-light text-foreground mt-8 mb-4">Data Retention</h2>
          <p>
            Contact submissions are retained only as long as necessary to process your inquiry or maintain a professional correspondence. You may request the deletion of your contact data at any time by reaching out via the same contact form.
          </p>
        </div>
      </div>
    </div>
  );
}
