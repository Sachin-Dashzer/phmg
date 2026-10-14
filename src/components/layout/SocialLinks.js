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

const pill =
  "inline-flex items-center justify-center rounded-full border border-current opacity-70 transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

export default function SocialLinks({ className = "" }) {
  const links = PROFILES.filter((p) => firm.social[p.key]);
  const whatsapp = waHref();

  return (
    <nav aria-label={`${firm.name} on social media`} className={className}>
      <ul className="flex flex-wrap items-center gap-2">
        {links.map(({ key, label, Icon }) => (
          <li key={key}>
            <a
              href={firm.social[key]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} (opens in a new tab)`}
              className={`${pill} h-10 w-10`}
            >
              <Icon aria-hidden="true" className="h-4 w-4" />
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
    </nav>
  );
}
