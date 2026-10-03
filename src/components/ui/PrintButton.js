"use client";

export default function PrintButton() {
  return <button type="button" onClick={() => window.print()} className="btn btn-secondary print:hidden">Print or save as PDF</button>;
}
