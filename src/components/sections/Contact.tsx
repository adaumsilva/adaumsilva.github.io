import { FadeInWhenVisible } from "@/components/ui/FadeInWhenVisible";

export function Contact() {
  return (
    <section
      id="contact"
      className="py-24 lg:py-32 text-center max-w-lg mx-auto"
      aria-label="Contact"
    >
      <FadeInWhenVisible>
        <p className="font-mono text-green text-sm mb-4">06. What&apos;s Next?</p>
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.1}>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-lightest mb-5">
          Get In Touch
        </h2>
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.2}>
        <p className="text-slate leading-relaxed mb-10">
          I&apos;m currently open to new opportunities — whether it&apos;s a full-time AI Engineering role,
          a consulting engagement, or an interesting collaboration. My inbox is always open.
        </p>
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.3}>
        <a
          href="mailto:adam@example.com"
          className="btn-outline inline-block"
          aria-label="Send Adam an email"
        >
          Say Hello
        </a>
      </FadeInWhenVisible>
    </section>
  );
}
