import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MotionProvider } from "@/components/layout/MotionProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Adam Silva — AI Engineer",
  description:
    "AI Engineer specialising in production LLM systems, RAG pipelines, and scalable ML infrastructure. Building intelligent products that deliver measurable outcomes.",
  metadataBase: new URL("https://adamsilva.github.io"),
  openGraph: {
    type: "website",
    url: "https://adamsilva.github.io",
    title: "Adam Silva — AI Engineer",
    description:
      "AI Engineer specialising in production LLM systems, RAG pipelines, and scalable ML infrastructure.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Adam Silva — AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adam Silva — AI Engineer",
    description:
      "AI Engineer specialising in production LLM systems, RAG pipelines, and scalable ML infrastructure.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://adamsilva.github.io",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Adam Silva",
  jobTitle: "AI Engineer",
  url: "https://adamsilva.github.io",
  sameAs: [
    "https://github.com/adamsilva01",
    "https://linkedin.com/in/adamsilva",
    "https://kaggle.com/adamsilva01",
  ],
  knowsAbout: [
    "Machine Learning",
    "Large Language Models",
    "Retrieval-Augmented Generation",
    "Python",
    "PyTorch",
    "FastAPI",
  ],
};

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https:",
  [
    "frame-src",
    "https://*.hf.space",
    "https://huggingface.co",
    "https://*.streamlit.app",
    "https://share.streamlit.io",
    "https://*.gradio.live",
    "https://gradio.app",
    "https://netron.app",
  ].join(" "),
  "connect-src 'self' https://api.github.com https://ghchart.rshah.org",
].join("; ");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-green focus:text-navy focus:rounded focus:font-mono focus:text-sm"
        >
          Skip to main content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
