"use client";

import { useState } from "react";
import { config } from "@/data/config";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const EMPTY_FORM: FormState = { name: "", email: "", message: "" };

export function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [website, setWebsite] = useState(""); // honeypot — must stay empty
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverMessage, setServerMessage] = useState("");

  const update = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrors({});
    setServerMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
          setStatus("error");
        } else {
          setServerMessage(data.message ?? "Failed to send message. Please try again.");
          setStatus("error");
        }
        return;
      }

      setStatus("sent");
      setForm(EMPTY_FORM);
      setWebsite("");
    } catch {
      setServerMessage("Failed to send message. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 bg-background">
      <div className="container relative z-10">
        <SectionHeading
          number="09"
          label="Contact"
          title="Let's Build Something Real"
          description={config.contactNote}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
          {/* Info sidebar */}
          <div className="lg:col-span-4">
            <dl className="space-y-6">
              <div>
                <dt className="text-tech-label text-[0.6rem] uppercase text-muted mb-1.5">
                  Email
                </dt>
                <dd>
                  <a
                    href={`mailto:${config.email}`}
                    className="text-sm text-foreground hover:text-accent transition-colors duration-200 break-all"
                    data-cursor="EMAIL"
                  >
                    {config.email}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-tech-label text-[0.6rem] uppercase text-muted mb-1.5">
                  Phone
                </dt>
                <dd>
                  <a
                    href={`tel:${config.phone.replace(/\s/g, "")}`}
                    className="text-sm text-foreground hover:text-accent transition-colors duration-200"
                  >
                    {config.phone}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-tech-label text-[0.6rem] uppercase text-muted mb-1.5">
                  Elsewhere
                </dt>
                <dd className="flex flex-wrap gap-x-5 gap-y-2">
                  {config.linkedinUrl && (
                    <a
                      href={config.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-tech-label text-[0.7rem] uppercase text-foreground hover:text-accent transition-colors duration-200"
                      data-cursor="LINKEDIN"
                    >
                      LinkedIn
                    </a>
                  )}
                  {config.githubUrl && (
                    <a
                      href={config.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-tech-label text-[0.7rem] uppercase text-foreground hover:text-accent transition-colors duration-200"
                      data-cursor="GITHUB"
                    >
                      GitHub
                    </a>
                  )}
                  <a
                    href={config.cvPath}
                    download="CV_Ibrahim_Sbouai.pdf"
                    className="text-tech-label text-[0.7rem] uppercase text-foreground hover:text-accent transition-colors duration-200"
                    data-cursor="CV"
                  >
                    Download CV
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            {status === "sent" ? (
              <div className="border border-border bg-card p-8 md:p-10">
                <p className="text-tech-label text-[0.6rem] uppercase text-accent mb-4">
                  Message sent
                </p>
                <h3 className="text-xl font-normal text-foreground mb-3">
                  Thank you for reaching out.
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-7 max-w-[46ch]">
                  Your message was delivered. I&apos;ll get back to you as soon as I can.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="inline-flex items-center gap-2 h-10 px-5 border border-border text-tech-label text-[0.7rem] uppercase text-foreground hover:border-border-strong transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Honeypot — hidden from humans, visible to naive bots */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-tech-label text-[0.6rem] uppercase text-muted mb-2"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      maxLength={80}
                      autoComplete="name"
                      value={form.name}
                      onChange={update("name")}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={`w-full bg-transparent border-b py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:outline-none transition-colors duration-200 ${
                        errors.name
                          ? "border-danger focus:border-danger"
                          : "border-border focus:border-foreground"
                      }`}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-2 text-[0.78rem] text-danger" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-tech-label text-[0.6rem] uppercase text-muted mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      maxLength={254}
                      autoComplete="email"
                      value={form.email}
                      onChange={update("email")}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={`w-full bg-transparent border-b py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:outline-none transition-colors duration-200 ${
                        errors.email
                          ? "border-danger focus:border-danger"
                          : "border-border focus:border-foreground"
                      }`}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-2 text-[0.78rem] text-danger" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-tech-label text-[0.6rem] uppercase text-muted mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    maxLength={2000}
                    value={form.message}
                    onChange={update("message")}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : "message-hint"}
                    className={`w-full bg-transparent border-b py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:outline-none transition-colors duration-200 resize-y min-h-32 ${
                      errors.message
                        ? "border-danger focus:border-danger"
                        : "border-border focus:border-foreground"
                    }`}
                  />
                  <div className="mt-2 flex items-start justify-between gap-4">
                    {errors.message ? (
                      <p id="message-error" className="text-[0.78rem] text-danger" role="alert">
                        {errors.message}
                      </p>
                    ) : (
                      <p id="message-hint" className="text-[0.75rem] text-muted">
                        Messages are stored securely and used only to reply to you.
                      </p>
                    )}
                    <span className="text-tech-label text-[0.6rem] text-muted shrink-0">
                      {form.message.length}/2000
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-2 flex flex-wrap items-center gap-5">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    data-cursor="SEND"
                    className="inline-flex items-center gap-2 h-11 px-7 bg-foreground text-background text-tech-label text-[0.7rem] uppercase hover:opacity-85 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {status === "error" && (
                    <p className="text-[0.8rem] text-danger" role="alert">
                      {serverMessage || "Failed to send message. Please try again."}
                    </p>
                  )}

                  {status === "sending" && (
                    <p className="text-[0.8rem] text-muted" role="status">
                      Sending…
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
