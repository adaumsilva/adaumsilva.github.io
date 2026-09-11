import type { Metadata } from "next";
import Link from "next/link";
import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";
import { TechTag } from "@/components/ui/TechTag";
import { ImageSlider } from "@/components/ui/ImageSlider";

export const metadata: Metadata = {
  title: "AI Shopping Assistant — Conversational Commerce for WooCommerce | Adam Silva",
  description:
    "Production WordPress plugin and metered SaaS gateway that lets shoppers search, build a cart, and check out inside an AI chat — with RAG-grounded answers and human takeover.",
};

const images = [
  {
    src: "/screenshots/ai-shopping-assistant/screenshot-1.jpg",
    alt: "The storefront assistant helping a shopper choose a product, with add to cart and checkout inside the chat.",
  },
  {
    src: "/screenshots/ai-shopping-assistant/screenshot-2.jpg",
    alt: "Full-screen interface with conversation history and the live cart side by side.",
  },
  {
    src: "/screenshots/ai-shopping-assistant/screenshot-3.jpg",
    alt: "Search-bar launcher on a shop page, one of three storefront layouts.",
  },
  {
    src: "/screenshots/ai-shopping-assistant/screenshot-4.jpg",
    alt: "Appearance settings: interface, launcher style and colour palette.",
  },
  {
    src: "/screenshots/ai-shopping-assistant/screenshot-5.jpg",
    alt: "Knowledge base: uploading documents to ground the assistant's answers.",
  },
  {
    src: "/screenshots/ai-shopping-assistant/screenshot-6.jpg",
    alt: "Conversations inbox, with the option to pause the AI and reply as a human.",
  },
  {
    src: "/screenshots/ai-shopping-assistant/screenshot-7.jpg",
    alt: "Sales analytics attributed to chat.",
  },
];

const techStack = [
  { layer: "AI Agent", technologies: ["OpenAI", "Tool Calling", "RAG"] },
  { layer: "Plugin Backend", technologies: ["PHP", "WordPress", "WooCommerce REST API"] },
  { layer: "Storefront", technologies: ["JavaScript", "Chat Launcher", "Shortcode"] },
  { layer: "SaaS Gateway", technologies: ["Metered Tokens", "Licensing", "Multi-store"] },
  { layer: "Knowledge Base", technologies: ["PDF", "Word", "Excel", "CSV", "Markdown"] },
  { layer: "Compatibility", technologies: ["WP 6.2+", "PHP 7.4+", "HPOS"] },
];

const architectureFeatures = [
  {
    title: "Agentic Commerce Loop",
    points: [
      "The assistant is a tool-calling agent, not a FAQ bot — it searches the catalogue, adds and removes items (including product variations), changes quantities, quotes real shipping rates and payment methods, and hands off to checkout, all from inside the conversation.",
      "Product cards and a live cart render directly in the chat, so the shopper never leaves the thread to complete a purchase.",
      "Signed-in shoppers get recommendations from their past orders and can ask about the status of their own orders.",
    ],
  },
  {
    title: "Metered SaaS Gateway",
    points: [
      "The plugin never calls OpenAI directly — every request goes through a licensed vendor gateway that owns the model keys, prompts, and metering, so merchants install and sign in without touching an API key.",
      "Usage is metered per store in tokens, with a no-card free tier (800k tokens/month, one store, three knowledge-base documents) and paid plans above it.",
    ],
  },
  {
    title: "WooCommerce-Native Integration",
    points: [
      "Product data is read through the WooCommerce REST API and shipping and payment options come from WooCommerce's own hooks — never direct table queries — so the plugin keeps working as WooCommerce evolves.",
      "Compatible with High-Performance Order Storage (HPOS) and ships three storefront layouts: an automatic chat launcher, a search-bar launcher, and a full-page assistant via the [aise_buy_with_ai] shortcode.",
      "Appearance settings control the interface, launcher style, and colour palette without custom CSS.",
    ],
  },
  {
    title: "Grounded Answers with a Human in the Loop",
    points: [
      "A RAG knowledge base ingests PDF, Word, Excel, CSV, TXT, and Markdown uploads so the assistant answers policy and product questions from the merchant's own documents, with custom instructions for persona and house rules.",
      "A conversations inbox in wp-admin shows every chat; a merchant can pause the AI on any thread and reply as a human, then hand it back.",
      "Multilingual by default — follows the site language or a forced language — with conversations stored locally and WordPress personal-data export and erase requests honoured.",
    ],
  },
];

const impacts = [
  {
    label: "Checkout Without Leaving the Chat",
    detail:
      "Discovery, cart management, shipping, and payment collapse into one conversation — removing the page-hops that lose shoppers between search and checkout.",
  },
  {
    label: "Attributable Revenue",
    detail:
      "Built-in sales analytics tie revenue and conversions to chat sessions, so merchants can see exactly what the assistant is worth instead of guessing.",
  },
  {
    label: "Zero-Config AI for Merchants",
    detail:
      "No API keys, no prompt engineering, no infrastructure — install the plugin, sign up with a name and email, and the assistant is live on the storefront.",
  },
  {
    label: "Privacy by Design",
    detail:
      "Shopper names, emails, and payment details never leave the store; conversations stay in the site's own database and respond to WordPress export and erase requests.",
  },
];

const glassStyle: React.CSSProperties = {
  background: "linear-gradient(rgba(255,255,255,0.04), transparent)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
};

export default function AiShoppingAssistantPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-navy)" }}>
      {/* Top nav */}
      <header
        className="sticky top-0 z-40 px-6 sm:px-12 py-4 border-b backdrop-blur-md"
        style={{
          backgroundColor: "rgba(13,13,13,0.85)",
          borderColor: "rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-sm text-slate hover:text-green transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <span className="font-mono text-xs" style={{ color: "var(--color-slate)" }}>
            Adam Silva
          </span>
        </div>
      </header>

      <main id="main-content" className="max-w-4xl mx-auto px-6 sm:px-12 py-16 lg:py-24">

        {/* Hero */}
        <FadeInWhenVisible>
          <section aria-label="Project overview" className="mb-20">
            <p
              className="font-mono text-xs tracking-widest uppercase mb-4"
              style={{ color: "var(--color-green)" }}
            >
              Featured Project
            </p>
            <h1
              className="text-5xl sm:text-6xl font-bold mb-5 leading-tight"
              style={{ color: "var(--color-slate-lightest)" }}
            >
              AI Shopping Assistant
            </h1>
            <p
              className="text-xl leading-relaxed max-w-2xl mb-8"
              style={{ color: "var(--color-slate-light)" }}
            >
              A conversational sales agent for WooCommerce — shoppers find products, build a
              cart, and check out without leaving the chat.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <Link
                href="https://store.f5digitalmarketing.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-2"
              >
                Live Demo
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
              <Link
                href="https://wordpress.org/plugins/extraordinary-ai-shopping-assistant/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-light hover:text-green transition-colors duration-200 text-sm"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View on WordPress.org
              </Link>
            </div>
          </section>
        </FadeInWhenVisible>

        {/* Gallery */}
        <FadeInWhenVisible delay={0.1}>
          <section aria-label="Project screenshots" className="mb-24">
            <ImageSlider images={images} />
          </section>
        </FadeInWhenVisible>

        {/* Overview */}
        <FadeInWhenVisible delay={0.1}>
          <section aria-label="Project description" className="mb-20">
            <h2
              className="text-2xl font-semibold mb-6"
              style={{ color: "var(--color-slate-lightest)" }}
            >
              Overview
            </h2>
            <div className="flex flex-col gap-4">
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-slate)" }}>
                AI Shopping Assistant is a production WordPress plugin, published on WordPress.org,
                that turns a WooCommerce storefront into a conversation. A shopper describes what
                they need in plain language; the assistant searches the catalogue, compares
                options, answers questions from the merchant&apos;s own documents, manages the cart,
                presents real shipping rates and payment methods, and takes the shopper to checkout
                — all without leaving the chat.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-slate)" }}>
                Behind the plugin is a metered SaaS gateway that runs the OpenAI-backed agent and
                its tools. Merchants never handle model keys or infrastructure: they install the
                plugin, sign up, and the assistant is live. On the merchant side, wp-admin exposes
                a knowledge base for grounding, a conversations inbox with human takeover, and sales
                analytics that attribute revenue to chat.
              </p>
            </div>
          </section>
        </FadeInWhenVisible>

        {/* Tech Stack */}
        <FadeInWhenVisible delay={0.1}>
          <section aria-label="Technology stack" className="mb-20">
            <h2
              className="text-2xl font-semibold mb-8"
              style={{ color: "var(--color-slate-lightest)" }}
            >
              Tech Stack
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {techStack.map(({ layer, technologies }) => (
                <div key={layer} className="rounded-xl p-5" style={glassStyle}>
                  <p
                    className="font-mono text-xs tracking-widest uppercase mb-3"
                    style={{ color: "var(--color-green)" }}
                  >
                    {layer}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((t) => (
                      <TechTag key={t} label={t} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeInWhenVisible>

        {/* Architecture */}
        <FadeInWhenVisible delay={0.1}>
          <section aria-label="Architecture" className="mb-20">
            <h2
              className="text-2xl font-semibold mb-8"
              style={{ color: "var(--color-slate-lightest)" }}
            >
              Key Architectural Features
            </h2>
            <ol className="flex flex-col gap-10">
              {architectureFeatures.map(({ title, points }, i) => (
                <li key={i} className="flex gap-6">
                  <span
                    className="font-mono text-sm shrink-0 mt-0.5 w-8"
                    style={{ color: "var(--color-green)" }}
                  >
                    0{i + 1}.
                  </span>
                  <div>
                    <h3
                      className="font-semibold text-base mb-3"
                      style={{ color: "var(--color-slate-lightest)" }}
                    >
                      {title}
                    </h3>
                    <ul className="flex flex-col gap-2.5">
                      {points.map((point, j) => (
                        <li key={j} className="flex gap-3 text-sm leading-relaxed" style={{ color: "var(--color-slate)" }}>
                          <span
                            className="font-mono shrink-0 mt-0.5"
                            style={{ color: "var(--color-green)" }}
                            aria-hidden="true"
                          >
                            ▸
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </FadeInWhenVisible>

        {/* Key Impacts */}
        <FadeInWhenVisible delay={0.1}>
          <section aria-label="Key impacts" className="mb-20">
            <h2
              className="text-2xl font-semibold mb-8"
              style={{ color: "var(--color-slate-lightest)" }}
            >
              Key Impacts
            </h2>
            <div className="flex flex-col gap-5">
              {impacts.map(({ label, detail }, i) => (
                <div
                  key={i}
                  className="flex gap-5 rounded-xl p-5"
                  style={glassStyle}
                >
                  <span
                    className="font-mono text-lg shrink-0 mt-0.5"
                    style={{ color: "var(--color-green)" }}
                    aria-hidden="true"
                  >
                    ▸
                  </span>
                  <div>
                    <p
                      className="font-semibold text-sm mb-1"
                      style={{ color: "var(--color-slate-lightest)" }}
                    >
                      {label}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-slate)" }}>
                      {detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeInWhenVisible>

        {/* Footer back link */}
        <FadeInWhenVisible delay={0.1}>
          <div
            className="pt-10 border-t flex items-center justify-between"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <Link href="/" className="btn-outline inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
            <p className="text-xs font-mono" style={{ color: "var(--color-slate)" }}>
              Designed &amp; Built by Adam Silva
            </p>
          </div>
        </FadeInWhenVisible>

      </main>
    </div>
  );
}
