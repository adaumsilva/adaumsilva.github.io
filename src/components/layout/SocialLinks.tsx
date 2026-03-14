import Link from "next/link";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/adamsilva01",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        aria-label="GitHub"
      >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/adamsilva",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        aria-label="LinkedIn"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Kaggle",
    href: "https://kaggle.com/adamsilva01",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        aria-label="Kaggle"
        role="img"
      >
        <path d="M18.825 23.859c-.022.092-.097.141-.168.141h-3.027c-.178 0-.355-.078-.465-.217l-5.073-6.171-1.435 1.395v4.55c0 .243-.189.442-.435.442H5.965c-.243 0-.432-.2-.432-.442V.442C5.533.2 5.722 0 5.965 0h2.257c.243 0 .435.2.435.442v13.152l6.179-6.421c.11-.122.27-.206.452-.206h3.133c.065 0 .127.05.145.118.032.124-.028.256-.114.337l-6.483 6.53 6.835 8.605c.071.086.094.218.022.302z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:adam@example.com",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        aria-label="Email"
        role="img"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export function SocialLinks() {
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
