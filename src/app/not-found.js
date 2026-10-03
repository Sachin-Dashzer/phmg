import Link from "next/link";
import { categories } from "@/data/categories";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="container-x section">
      <h1 className="text-4xl font-extrabold">Page not found</h1>
      <p className="mt-3 max-w-prose text-lg">The page you are looking for does not exist or has moved. Try one of these instead.</p>
      <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <li key={c.slug}><Link href={`/services/${c.slug}`} className="card card-hover block p-4 font-semibold">{c.title}</Link></li>
        ))}
      </ul>
      <Link href="/" className="btn btn-primary mt-8">Go to home</Link>
    </section>
  );
}
