import { FaLinkedinIn, FaInstagram, FaFacebookF, FaXTwitter, FaYoutube, FaWhatsapp } from "react-icons/fa6";
import { firm, waHref } from "@/data/firm";

// Profiles in display order. A platform missing from firm.social (or set to "") is skipped, so a
// link appears here the moment its URL is filled in — the same values feed `sameAs` in the schema.
const PROFILES = [
  { key: "linkedin", label: "LinkedIn", Icon: FaLinkedinIn },
  { key: "instagram", label: "Instagram", Icon: FaInstagram },
  { key: "facebook", label: "Facebook", Icon: FaFacebookF },
  { key: "x", label: "X", Icon: FaXTwitter },
  { key: "youtube", label: "YouTube", Icon: FaYoutube },
];

const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const pill = `inline-flex items-center justify-center rounded-full border border-current opacity-70 transition-opacity hover:opacity-100 ${focus}`;

// `compact` is the header utility-bar form: borderless, smaller, and without the WhatsApp pill
// (the floating CTA already carries that). Order and which profiles exist stay shared, so a URL
// filled into firm.social still shows up in both places at once.
const bare = `inline-flex items-center justify-center rounded-md transition-[color,transform] duration-200 ease-[cubic-bezier(.22,.8,.3,1)] hover:-translate-y-px hover:text-brand-gold motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focus}`;

export default function SocialLinks({ className = "", compact = false, label = "" }) {
  const links = PROFILES.filter((p) => firm.social[p.key]);
  const whatsapp = compact ? "" : waHref();

  // Header and footer both render this. Two <nav> landmarks with the same accessible name are
  // indistinguishable to a screen reader, so the compact (header) form is a plain labelled list.
  const Wrap = compact ? "div" : "nav";
  const navLabel = label || `${firm.name} on social media`;

  return (
    <Wrap aria-label={compact ? undefined : navLabel} className={className}>
      <ul aria-label={compact ? navLabel : undefined} className={`flex flex-wrap items-center ${compact ? "gap-0.5" : "gap-2"}`}>
        {links.map(({ key, label, Icon }) => (
          <li key={key}>
            <a
              href={firm.social[key]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} (opens in a new tab)`}
              className={compact ? `${bare} h-8 w-8` : `${pill} h-10 w-10`}
            >
              <Icon aria-hidden="true" className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
            </a>
          </li>
        ))}
        {whatsapp && (
          <li>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={`${pill} h-10 gap-2 px-4 text-sm`}
            >
              <FaWhatsapp aria-hidden="true" className="h-4 w-4" />
              WhatsApp
            </a>
          </li>
        )}
      </ul>
    </Wrap>
  );
}
