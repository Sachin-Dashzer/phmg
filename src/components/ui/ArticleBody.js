export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Renders article blocks: ["h2", text] | ["p", text] | ["ul", [items]] | ["table", { head, rows }]
export default function ArticleBody({ blocks }) {
  return (
    <div className="prose-phmg">
      {blocks.map(([type, v], i) => {
        if (type === "h2") return <h2 key={i} id={slugify(v)} className="mt-12 scroll-mt-28 border-l-4 border-brand-gold pl-4 font-display text-2xl font-bold md:text-3xl">{v}</h2>;
        if (type === "p") return <p key={i}>{v}</p>;
        if (type === "ul") return <ul key={i}>{v.map((t) => <li key={t}>{t}</li>)}</ul>;
        if (type === "table")
          return (
            <div key={i} className="my-6 overflow-x-auto rounded-2xl border border-brand-line">
              <table className="w-full min-w-120 text-left text-sm">
                <thead className="bg-brand-navy text-white">
                  <tr>{v.head.map((h, j) => <th key={j} scope="col" className="p-3">{h}</th>)}</tr>
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
