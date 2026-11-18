export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Renders article blocks: ["h2", text] | ["p", text] | ["ul", [items]]
//   | ["table", { head, rows }] | ["links", [{ href, label, note? }]]
// `links` exists so pages can cite official sources as real links while the data files stay plain data.
/** "Table under <nearest preceding h2>", or a plain label where the table comes before any. */
const tableLabel = (blocks, i) => {
  for (let j = i - 1; j >= 0; j--) if (blocks[j][0] === "h2") return `Table under ${blocks[j][1]}, scrolls horizontally`;
  return "Table, scrolls horizontally";
};

export default function ArticleBody({ blocks }) {
  return (
    <div className="prose-phmg">
      {blocks.map(([type, v], i) => {
        if (type === "h2") return <h2 key={i} id={slugify(v)} className="mt-12 scroll-mt-28 border-l-4 border-brand-gold pl-4 font-display text-2xl font-bold md:text-3xl">{v}</h2>;
        if (type === "p") return <p key={i}>{v}</p>;
        if (type === "ul") return <ul key={i}>{v.map((t) => <li key={t}>{t}</li>)}</ul>;
        if (type === "links")
          return (
            <ul key={i}>
              {v.map((l) => (
                <li key={l.href}>
                  <a href={l.href} rel="noopener">{l.label}</a>
                  {l.note ? ` — ${l.note}` : ""}
                </li>
              ))}
            </ul>
          );
        if (type === "table")
          return (
            // tabIndex makes the horizontal scroll reachable by keyboard (WCAG 2.1.1). The label
            // names the section the table sits under: two tables on one page with the same name
            // are two landmarks a screen reader cannot tell apart.
            <div key={i} tabIndex={0} role="region" aria-label={tableLabel(blocks, i)} className="my-6 overflow-x-auto rounded-2xl border border-brand-line">
              <table className="w-full min-w-120 text-left text-sm">
                <thead className="bg-brand-navy text-white">
                  {/* A comparison table's corner cell is deliberately blank. An empty <th> has no
                      accessible name, so it carries a visually hidden one instead. */}
                  <tr>{v.head.map((h, j) => <th key={j} scope="col" className="p-3">{h || <span className="sr-only">Row heading</span>}</th>)}</tr>
                </thead>
                <tbody>
                  {v.rows.map((r, j) => (
                    <tr key={j} className="border-t border-brand-line align-top even:bg-brand-mist/60">
                      {r.map((c, k) => (k === 0 ? <th key={k} scope="row" className="p-3 font-semibold text-brand-navy">{c}</th> : <td key={k} className="p-3">{c}</td>))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        return null;
      })}
    </div>
  );
}
