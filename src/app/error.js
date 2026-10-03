"use client";

export default function Error({ reset }) {
  return (
    <section className="container-x section">
      <h1 className="text-3xl font-extrabold">Something went wrong</h1>
      <p className="mt-3">Please try again. If the problem continues, contact us.</p>
      <button onClick={reset} className="btn btn-primary mt-6">Try again</button>
    </section>
  );
}
