"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone, ArrowRight } from "lucide-react";
import LogoImage from "./../../../public/logo.png";
import { firm, phoneHref } from "@/data/firm";
import { mainNav, megaMenu } from "@/data/navigation";
import TopUtilityBar from "./TopUtilityBar";

/* Keyframes used by the menus. Motion is switched off for reduced-motion users. */
const menuStyles = `
@keyframes megaItemIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes megaPaneIn {
  from { opacity: 0; transform: translateX(10px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes mobileIn {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.mega-item   { animation: megaItemIn 380ms cubic-bezier(.22,.8,.3,1) both; }
.mega-pane   { animation: megaPaneIn 320ms cubic-bezier(.22,.8,.3,1) both; }
.mobile-in   { animation: mobileIn 260ms cubic-bezier(.22,.8,.3,1) both; }
@media (prefers-reduced-motion: reduce) {
  .mega-item, .mega-pane, .mobile-in { animation: none; }
}
`;

const ROW = 48; // rail row height in px (h-12)
const GAP = 4; // gap between rail rows in px (space-y-1)

export function Logo() {
  return (
    <Link href="/" className="flex items-center" aria-label="PHMG & Associates home">
      <Image src={LogoImage} alt="PHMG & Associates" priority className="h-8 w-auto" />
    </Link>
  );
}

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

/* Gold underline that slides in on hover and stays on the current page */
const underline =
  "relative after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-brand-gold after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current=page]:after:scale-x-100 motion-reduce:after:transition-none";

/* -------------------------------------------------------------------------- */
/* Desktop mega menu                                                          */
/* -------------------------------------------------------------------------- */
function DesktopMega({ item, pathname }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const closeTimer = useRef(null);
  const toggleRef = useRef(null);

  const show = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const group = megaMenu[active] ?? megaMenu[0];
  const current = isActive(pathname, item.href);

  return (
    <div
      onMouseEnter={show}
      onMouseLeave={hide}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <div
        aria-current={current ? "page" : undefined}
        className={`${underline} flex items-center rounded-lg transition-colors hover:bg-brand-blue/5 ${
          open ? "bg-brand-blue/5 after:scale-x-100" : ""
        }`}
      >
        <Link
          href={item.href}
          className="rounded-l-lg py-2 pl-4 pr-1 text-sm font-medium text-neutral-700 transition-colors hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-brand-blue"
        >
          {item.title}
        </Link>
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="services-menu"
          aria-label={`${open ? "Close" : "Open"} ${item.title} menu`}
          onClick={() => setOpen((v) => !v)}
          className="rounded-r-lg py-2 pl-1 pr-3 text-neutral-400 transition-colors hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-brand-blue"
        >
          <ChevronDown
            size={15}
            className={`transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180 text-brand-blue" : ""}`}
          />
        </button>
      </div>

      {/* Panel is anchored to the sticky header so it lines up with the page container */}
      <div
        id="services-menu"
        className={`absolute inset-x-0 top-full origin-top px-4 pt-2 transition-all duration-200 ease-out motion-reduce:transition-none ${
          open ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-2 scale-[0.98] opacity-0"
        }`}
      >
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-neutral-200/70 bg-white shadow-xl shadow-brand-blue/10 ring-1 ring-white">
          <div className="grid grid-cols-[16rem_1fr]">
            {/* Category rail with a highlight that glides between rows */}
            <div className="border-r border-neutral-200/70 bg-gradient-to-b from-brand-blue/[0.07] to-brand-blue/[0.02] p-3">
              <ul className="relative space-y-1">
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 top-0 h-12 rounded-xl border border-brand-blue/15 bg-white shadow-sm transition-transform duration-300 ease-[cubic-bezier(.3,.8,.3,1)] motion-reduce:transition-none"
                  style={{ transform: `translateY(${active * (ROW + GAP)}px)` }}
                >
                  <span className="absolute inset-y-3 left-0 w-1 rounded-full bg-brand-gold" />
                </span>

                {megaMenu.map((g, i) => {
                  const selected = i === active;
                  return (
                    <li key={g.href} className="relative">
                      <Link
                        href={g.href}
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        className={`flex h-12 items-center justify-between rounded-xl px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-brand-blue ${
                          selected ? "text-brand-navy" : "text-neutral-600 hover:text-brand-navy"
                        }`}
                      >
                        <span>{g.title}</span>
                        <ArrowRight
                          size={14}
                          className={`text-brand-blue transition-all duration-300 motion-reduce:transition-none ${
                            selected ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                          }`}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Services in the active category. key= replays the entrance on every switch */}
            <div key={group.href} className="mega-pane flex min-h-[19rem] flex-col bg-gradient-to-br from-white to-brand-blue/[0.03] p-7">
              <div className="flex items-baseline justify-between gap-6 border-b border-neutral-200/70 pb-4">
                <h3 className="text-lg font-semibold text-brand-navy">{group.title}</h3>
                <Link
                  href={group.href}
                  className="group/all inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-brand-blue"
                >
                  <span className="underline-offset-4 group-hover/all:underline">See all {group.title.toLowerCase()}</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover/all:translate-x-1 motion-reduce:transition-none"
                  />
                </Link>
              </div>

              <ul className="mt-4 grid flex-1 grid-cols-2 content-start gap-x-4 gap-y-2">
                {group.items.slice(0, 8).map((sub, i) => (
                  <li key={sub.href} className="mega-item" style={{ animationDelay: `${60 + i * 45}ms` }}>
                    <Link
                      href={sub.href}
                      className="group/item flex items-center justify-between gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-all duration-200 hover:border-brand-blue/20 hover:bg-white hover:shadow-sm focus-visible:outline-2 focus-visible:outline-brand-blue motion-reduce:transition-none"
                    >
                      <span>
                        <span className="block text-sm font-medium text-neutral-800 transition-colors group-hover/item:text-brand-blue">
                          {sub.title}
                        </span>
                        {sub.description && (
                          <span className="mt-0.5 block text-xs leading-snug text-neutral-500">{sub.description}</span>
                        )}
                      </span>
                      <ArrowRight
                        size={14}
                        className="shrink-0 -translate-x-2 text-brand-blue opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100 motion-reduce:transition-none"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Help strip, softly tinted with the brand gold */}
          <div className="flex items-center justify-between gap-6 border-t border-brand-gold/25 bg-brand-gold/10 px-7 py-3.5">
            <p className="text-sm text-neutral-700">
              Not sure which service fits your business? A partner can point you to the right one.
            </p>
            <div className="flex shrink-0 items-center gap-4">
              {firm.phone && (
                <a
                  href={phoneHref()}
                  className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 transition-colors hover:text-brand-blue"
                >
                  <Phone size={14} />
                  {firm.phone}
                </a>
              )}
              <Link
                href="/contact"
                className="rounded-lg bg-brand-navy px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-px hover:bg-brand-blue hover:shadow-md motion-reduce:transition-none"
              >
                Book a call
              </Link>
              <Link
                href="/contact"
                className="rounded-lg bg-brand-navy px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-px hover:bg-brand-blue hover:shadow-md motion-reduce:transition-none"
              >
                Schedule a consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Mobile panel                                                               */
/* -------------------------------------------------------------------------- */
function MobilePanel({ pathname }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);

  return (
    <div className="mobile-in absolute inset-x-0 top-full max-h-[calc(100dvh-7rem)] overflow-y-auto border-t border-neutral-200/70 bg-white shadow-xl shadow-brand-blue/10 lg:hidden">
      <nav aria-label="Mobile Navigation" className="px-5 py-3">
        {mainNav.map((item) =>
          item.mega ? (
            <div key={item.href} className="border-b border-neutral-200/70">
              <button
                type="button"
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((v) => !v)}
                className="flex w-full items-center justify-between py-3.5 text-base font-semibold text-brand-navy"
              >
                {item.title}
                <ChevronDown
                  size={18}
                  className={`text-neutral-400 transition-transform duration-300 ${servicesOpen ? "rotate-180 text-brand-blue" : ""}`}
                />
              </button>

              {servicesOpen && (
                <div className="mobile-in space-y-2 pb-3">
                  {megaMenu.map((g, i) => {
                    const expanded = openGroup === i;
                    return (
                      <div
                        key={g.href}
                        className={`rounded-xl border transition-colors ${
                          expanded ? "border-brand-blue/20 bg-brand-blue/[0.04]" : "border-neutral-200/70"
                        }`}
                      >
                        <button
                          type="button"
                          aria-expanded={expanded}
                          onClick={() => setOpenGroup(expanded ? null : i)}
                          className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-brand-navy"
                        >
                          {g.title}
                          <ChevronDown
                            size={16}
                            className={`text-neutral-400 transition-transform duration-300 ${expanded ? "rotate-180 text-brand-blue" : ""}`}
                          />
                        </button>
                        {expanded && (
                          <ul className="mobile-in mx-4 mb-3 space-y-0.5 border-l-2 border-brand-gold/60 pl-3">
                            {g.items.map((sub) => (
                              <li key={sub.href}>
                                <Link href={sub.href} className="block py-2 text-sm text-neutral-600 hover:text-brand-blue">
                                  {sub.title}
                                </Link>
                              </li>
                            ))}
                            <li>
                              <Link href={g.href} className="block py-2 text-sm font-medium text-brand-blue">
                                See all {g.title.toLowerCase()}
                              </Link>
                            </li>
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className="block border-b border-neutral-200/70 py-3.5 text-base font-semibold text-brand-navy aria-[current=page]:text-brand-blue"
            >
              {item.title}
            </Link>
          )
        )}
      </nav>

      <div className="sticky bottom-0 flex gap-3 border-t border-brand-gold/25 bg-brand-gold/10 p-4 backdrop-blur">
        <Link
          href="/contact"
          className="flex flex-1 items-center justify-center rounded-xl bg-brand-navy py-3 text-sm font-semibold text-white"
        >
          <Phone /> Talk to a CA
        </Link>
        <Link
          href="/contact"
          className="flex flex-1 items-center justify-center rounded-xl bg-brand-navy py-3 text-sm font-semibold text-white"
        >
          Talk to a CA
        </Link>
        {firm.phone && (
          <a
            href={phoneHref()}
            aria-label="Call office"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-700"
          >
            <Phone size={18} />
          </a>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Header                                                                     */
/* -------------------------------------------------------------------------- */
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <style>{menuStyles}</style>
      <TopUtilityBar />
      <header className="sticky top-0 z-50 border-b border-neutral-200/60 bg-white/85 backdrop-blur-md">
        <div className="container-x flex h-20 items-center justify-between">
          <Logo />

          {/* Desktop navigation */}
          <nav aria-label="Main Navigation" className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) =>
              item.mega ? (
                <DesktopMega key={item.href} item={item} pathname={pathname} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={`${underline} rounded-lg px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-brand-blue/5 hover:text-brand-blue aria-[current=page]:text-brand-navy`}
                >
                  {item.title}
                </Link>
              )
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden rounded-xl bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-px hover:bg-brand-blue hover:shadow-md motion-reduce:transition-none sm:inline-flex"
            >
             <Phone className="mr-2 w-4" /> Call us
            </Link>
            <Link
              href="/contact"
              className="hidden rounded-xl bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-px hover:bg-brand-blue hover:shadow-md motion-reduce:transition-none sm:inline-flex"
            >
              WhatsApp us
            </Link>

            {firm.phone && (
              <a
                href={phoneHref()}
                aria-label="Call office"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200/80 text-neutral-700 transition-colors hover:bg-brand-blue/5 lg:hidden"
              >
                <Phone size={18} />
              </a>
            )}

            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200/80 text-neutral-700 transition-colors hover:bg-brand-blue/5 lg:hidden"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isOpen && <MobilePanel pathname={pathname} />}
      </header>
    </>
  );
}