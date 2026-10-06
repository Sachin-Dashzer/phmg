import ScrollReveal from "./ScrollReveal";

// One heading pattern for every section: label, h2, optional intro, optional action on the right.
export default function SectionHeading({ label, title, intro, action, center = false, dark = false, id }) {
  return (
    <ScrollReveal
      className={`mb-10 flex flex-col gap-6 md:mb-12 ${center ? "items-center text-center" : action ? "md:flex-row md:items-end md:justify-between" : ""}`}
    >
      <div className={`max-w-2xl ${center ? "mx-auto" : ""}`}>
        <div className={`section-label ${dark ? "section-label-dark" : "section-label-blue"} mb-4 w-fit ${center ? "mx-auto" : ""}`}>{label}</div>
        <h2 id={id} className={`font-display text-3xl font-bold leading-tight md:text-4xl ${dark ? "text-white" : "text-brand-navy"}`}>
          {title}
        </h2>
        {intro && <p className={`mt-3 leading-relaxed ${dark ? "text-white/65" : "text-brand-muted"}`}>{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </ScrollReveal>
  );
}
