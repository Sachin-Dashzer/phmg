"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";

const KEY = "phmg-consent";
const GA = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY = process.env.NEXT_PUBLIC_CLARITY_ID;

/** Fire a GA4 event. Does nothing until the visitor has consented and GA has loaded. */
export const track = (name, params = {}) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") window.gtag("event", name, params);
};

const subscribe = (cb) => {
  window.addEventListener("phmg-consent", cb);
  return () => window.removeEventListener("phmg-consent", cb);
};
const read = () => {
  try { return localStorage.getItem(KEY) || "unset"; } catch { return "denied"; }
};

function choose(value) {
  try { localStorage.setItem(KEY, value); } catch {}
  window.dispatchEvent(new Event("phmg-consent"));
}

// Privacy-first: nothing loads and no banner shows unless an analytics ID is configured and the visitor accepts.
export default function Analytics() {
  const consent = useSyncExternalStore(subscribe, read, () => "loading");
  const enabled = Boolean(GA || CLARITY);
  const granted = enabled && consent === "granted";

  useEffect(() => {
    if (!granted) return;
    const onClick = (e) => {
      const a = e.target.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href");
      if (href.startsWith("tel:")) track("click_call");
      else if (href.includes("wa.me")) track("click_whatsapp");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [granted]);

  if (!enabled) return null;
  return (
    <>
      {granted && GA && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA}');`}</Script>
        </>
      )}
      {granted && CLARITY && (
        <Script id="clarity-init" strategy="lazyOnload">{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY}");`}</Script>
      )}
      {consent === "unset" && (
        <div role="dialog" aria-label="Cookie consent" className="fixed inset-x-3 bottom-16 z-50 mx-auto max-w-xl rounded-2xl border border-brand-line bg-white p-4 shadow-xl md:bottom-4 md:left-4 md:right-auto">
          <p className="text-sm">
            We use analytics cookies to understand how the site is used. They are off unless you accept.{" "}
            <Link href="/privacy-policy" className="font-semibold text-brand-blue-dark underline">Privacy Policy</Link>
          </p>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={() => choose("granted")} className="btn btn-primary min-h-11 flex-1">Accept</button>
            <button type="button" onClick={() => choose("denied")} className="btn btn-secondary min-h-11 flex-1">Reject</button>
          </div>
        </div>
      )}
    </>
  );
}
