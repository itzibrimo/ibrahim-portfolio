import type { Metadata, Viewport } from "next";
import { DM_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

// DM Sans — humanist sans for body/UI
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["300", "400", "500"],
});

// Instrument Serif — editorial display face
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: "400",
  style: ["normal", "italic"],
});

// JetBrains Mono — technical monospace
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["300", "400", "500"],
});

const SITE_URL = "https://ibrahimsbouai.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ibrahim Sbouai \u2014 Computer Engineering Student",
    template: "%s \u2014 Ibrahim Sbouai",
  },
  description:
    "Portfolio of Ibrahim Sbouai, a Computer Engineering student specializing in Embedded Systems & IoT \u2014 across software, embedded systems, networks and industrial automation.",
  keywords: [
    "Ibrahim Sbouai",
    "Computer Engineering",
    "Embedded Systems",
    "IoT",
    "Portfolio",
    "Software Engineering",
    "Computer Networks",
    "Industrial Automation",
    "STM32",
  ],
  authors: [{ name: "Ibrahim Sbouai", url: SITE_URL }],
  creator: "Ibrahim Sbouai",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ibrahim Sbouai \u2014 Computer Engineering Student",
    description:
      "Computer Engineering student specializing in Embedded Systems & IoT \u2014 across software, embedded systems, networks and industrial automation.",
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Ibrahim Sbouai",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ibrahim Sbouai \u2014 Computer Engineering Student",
    description:
      "Computer Engineering student specializing in Embedded Systems & IoT.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f3ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ibrahim Sbouai",
  url: SITE_URL,
  email: "mailto:ibrahimsbouaai@gmail.com",
  jobTitle: "Computer Engineering Student",
  description:
    "Computer Engineering student specializing in Embedded Systems & IoT.",
  knowsAbout: [
    "Embedded Systems",
    "Internet of Things",
    "Software Engineering",
    "Computer Networks",
    "Industrial Automation",
  ],
  sameAs: [
    "https://github.com/itzibrimo",
    "https://linkedin.com/in/ibrahimsbouai",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        <ThemeProvider>{children}</ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
