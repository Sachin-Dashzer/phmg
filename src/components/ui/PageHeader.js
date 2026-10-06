import Image from "next/image";
import Breadcrumbs from "./Breadcrumbs";
import BannerImg from "../../../public/banner.png";

// Inner-page hero in the homepage's language: photo, navy wash, gold eyebrow, serif headline.
// `children` renders under the intro (buttons, meta). `aside` fills a right-hand column.
export default function PageHeader({ crumbs, title, intro, eyebrow, image = BannerImg, children, aside }) {
  return (
    <section className="relative isolate overflow-hidden">

      {/* =========================================================
      BACKGROUND IMAGE
      ========================================================= */}
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="
      absolute
      inset-0
      -z-20
      object-cover
      object-center
    "
      />

      {/* =========================================================
      LEFT DARK GRADIENT
      Keeps text readable while keeping the right side
      of the image clearly visible.
      ========================================================= */}
      <div
        aria-hidden="true"
        className="
      absolute
      inset-0
      -z-10
      bg-linear-to-r
      from-black/85
      via-black/55
      via-42%
      to-transparent
    "
      />

      {/* =========================================================
      SUBTLE BOTTOM GRADIENT
      ========================================================= */}
      <div
        aria-hidden="true"
        className="
      absolute
      inset-x-0
      bottom-0
      -z-10
      h-24
      bg-linear-to-t
      from-black/30
      to-transparent
    "
      />

      {/* =========================================================
      MAIN CONTENT
      ========================================================= */}
      <div
        className={`
      container-x
      py-14
      md:py-20
      lg:py-24
      ${aside
            ? "grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14"
            : ""
          }
    `}
      >

        {/* =======================================================
        LEFT CONTENT
        ======================================================= */}
        <div className="hero-enter-1 max-w-3xl">

          {/* Breadcrumbs */}
          <Breadcrumbs
            light
            items={crumbs}
          />

          {/* =====================================================
          EYEBROW
          ===================================================== */}
          {eyebrow && (
            <div className="mt-8 flex items-center gap-3">

              <span
                className="
              h-px
              w-8
              shrink-0
              bg-brand-gold
              sm:w-11
            "
                aria-hidden="true"
              />

              <p
                className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.28em]
              text-brand-gold
              sm:text-xs
            "
              >
                {eyebrow}
              </p>

            </div>
          )}

          {/* =====================================================
          PAGE TITLE
          ===================================================== */}
          <h1
            className={`
          ${eyebrow
                ? "mt-4"
                : "mt-8"
              }

          max-w-180
          text-balance
          font-display
          text-4xl
          font-medium
          leading-[1.08]
          tracking-[-0.02em]
          text-white

          md:text-5xl
          lg:text-[56px]
          xl:text-[62px]
        `}
          >
            {title}
          </h1>

          {/* =====================================================
          INTRO
          ===================================================== */}
          {intro && (
            <p
              className="
            mt-6
            max-w-2xl
            text-pretty
            text-base
            leading-[1.85]
            text-white/85
            md:text-lg
          "
            >
              {intro}
            </p>
          )}

          {/* =====================================================
          CHILDREN / CTA
          ===================================================== */}
          {children && (
            <div className="mt-8">
              {children}
            </div>
          )}

        </div>

        {/* =======================================================
        RIGHT ASIDE
        ======================================================= */}
        {aside && (
          <div className="hero-enter-5">
            {aside}
          </div>
        )}

      </div>

      {/* =========================================================
      BOTTOM GOLD LINE
      ========================================================= */}
      <div
        aria-hidden="true"
        className="
      absolute
      inset-x-0
      bottom-0
      h-px
      bg-linear-to-r
      from-transparent
      via-brand-gold/60
      to-transparent
    "
      />

    </section>
  );
}
