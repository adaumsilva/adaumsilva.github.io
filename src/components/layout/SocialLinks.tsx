import Link from "next/link";
import type { Social } from "@/types/content";

interface SocialLinksProps {
  social: Social;
}

function GitHubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function BehanceIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M7.803 5.731c.589 0 1.119.051 1.605.155.483.103.895.273 1.243.508.343.235.611.547.804.939.187.387.28.86.28 1.415 0 .607-.136 1.112-.408 1.511-.272.401-.676.733-1.215.999.735.212 1.285.585 1.654 1.118.369.531.553 1.171.553 1.917 0 .613-.117 1.141-.351 1.584a3.11 3.11 0 0 1-.96 1.104 4.315 4.315 0 0 1-1.404.64 6.354 6.354 0 0 1-1.658.207H1V5.731h6.803zm-.351 4.972c.49 0 .894-.116 1.212-.349.317-.232.476-.604.476-1.112 0-.29-.051-.529-.156-.715a1.104 1.104 0 0 0-.421-.435 1.793 1.793 0 0 0-.608-.219 3.895 3.895 0 0 0-.727-.063H3.454v2.893h3.998zm.16 5.239c.267 0 .521-.025.76-.077.241-.052.455-.14.635-.261.183-.12.329-.283.44-.491.109-.206.163-.475.163-.806 0-.641-.179-1.1-.535-1.374-.358-.273-.831-.41-1.419-.41H3.454v3.419h4.158zM15.612 16.631c.351.343.862.514 1.529.514.476 0 .888-.12 1.237-.361.345-.239.556-.493.633-.762h2.321c-.372 1.153-.943 1.977-1.71 2.471-.768.495-1.698.742-2.792.742-.757 0-1.438-.123-2.043-.367a4.277 4.277 0 0 1-1.545-1.047 4.705 4.705 0 0 1-.979-1.617c-.229-.622-.341-1.311-.341-2.063 0-.729.116-1.408.349-2.033a4.772 4.772 0 0 1 1-1.617 4.54 4.54 0 0 1 1.554-1.063c.604-.253 1.276-.379 2.015-.379.823 0 1.543.158 2.162.475a4.27 4.27 0 0 1 1.514 1.286c.397.543.683 1.164.857 1.861.173.697.233 1.437.181 2.219h-6.929c.04.783.248 1.355.597 1.697zm2.665-4.555c-.281-.309-.73-.463-1.348-.463-.392 0-.717.065-.973.197a1.935 1.935 0 0 0-.624.499 1.885 1.885 0 0 0-.337.651 3.44 3.44 0 0 0-.116.671h4.013c-.084-.651-.335-1.147-.615-1.555zM14.098 7.574h5.389V8.98h-5.389V7.574z"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

export function SocialLinks({ social }: SocialLinksProps) {
  const links = [
    { label: "GitHub",   href: social.github,              icon: <GitHubIcon /> },
    { label: "LinkedIn", href: social.linkedin,            icon: <LinkedInIcon /> },
    { label: "Behance",  href: social.behance,             icon: <BehanceIcon /> },
    { label: "Email",    href: `mailto:${social.email}`,   icon: <EmailIcon /> },
  ];

  return (
    <ul className="flex gap-5" aria-label="Social links">
      {links.map(({ label, href, icon }) => (
        <li key={label}>
          <Link
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            aria-label={label}
            className="text-slate hover:text-green hover:-translate-y-1 transition-all duration-200 inline-block"
          >
            {icon}
          </Link>
        </li>
      ))}
    </ul>
  );
}
