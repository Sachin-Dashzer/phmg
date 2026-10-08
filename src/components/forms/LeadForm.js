"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { track } from "@/components/layout/Analytics";
import Link from "next/link";
import { Check, Loader2 } from "lucide-react";

// variant "quick": name, mobile, service, city.
// variant "full": adds email + message.
// inline: three fields in a row on desktop (no city),
// consent and button on the next row.

export default function LeadForm({
  variant = "quick",
  defaultService = "",
  services = [],
  id = "lead",
  submitLabel = "Book Free Consultation",
  showSlot = false,
  inline = false,
}) {
  const router = useRouter();

  const [state, setState] = useState({
    busy: false,
    error: "",
  });

  const full = variant === "full";

  async function onSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;

    setState({
      busy: true,
      error: "",
    });

    try {
      const data0 = new FormData(form);

      const res = await fetch("/api/contact", {
        method: "POST",
        body: data0,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data?.error || "Something went wrong. Please try again."
        );
      }

      track("generate_lead", {
        form_id: id,
        service: data0.get("service") || undefined,
      });

      router.push("/thank-you");
    } catch (err) {
      setState({
        busy: false,
        error:
          err?.message ||
          "Something went wrong. Please try again.",
      });
    }
  }

  /* ---------------------------------
     Shared input styling
  --------------------------------- */

  const inputClass = `
    ${/* Compact variant stays compact only from sm up: below that a 38px/12px
          field is under the 44px touch target and makes iOS zoom on focus. */ ""}
    ${full ? "h-11 text-base sm:text-sm" : "h-11 text-base sm:h-9.5 sm:text-[12px]"}
    w-full
    rounded-md
    border
    border-neutral-200
    bg-white
    px-3
    text-brand-navy
    outline-none
    transition-all
    duration-200
    placeholder:text-neutral-400
    hover:border-neutral-300
    focus:border-brand-gold
    focus:ring-2
    focus:ring-brand-gold/10
  `;

  const labelClass = `
    mb-1
    block
    text-[11px]
    sm:text-[10px]
    font-semibold
    uppercase
    tracking-[0.04em]
    text-neutral-600
  `;

  const field = (name, label, props = {}) => (
    <div>
      <label
        htmlFor={`${id}-${name}`}
        className={labelClass}
      >
        {label}
      </label>

      <input
        id={`${id}-${name}`}
        name={name}
        className={inputClass}
        {...props}
      />
    </div>
  );

  return (
    <form
      onSubmit={onSubmit}
      className={
        inline
          ? "grid gap-3 md:grid-cols-3"
          : full
            ? "grid gap-4 sm:grid-cols-2"
            : "space-y-2.5"
      }
      aria-describedby={
        state.error ? `${id}-error` : undefined
      }
    >
      {/* ---------------------------------
          NAME
      --------------------------------- */}

      {field("name", "Your Name", {
        required: true,
        autoComplete: "name",
        minLength: 2,
        placeholder: "Enter your name",
      })}

      {/* ---------------------------------
          PHONE
      --------------------------------- */}

      {field("phone", "Mobile Number", {
        required: true,
        type: "tel",
        autoComplete: "tel",
        inputMode: "tel",
        pattern: "(\\+91[\\s\\-]?)?[6-9][0-9]{9}",
        title: "10-digit Indian mobile number",
        placeholder: "Enter mobile number",
      })}

      {/* ---------------------------------
          EMAIL
      --------------------------------- */}

      {full &&
        field("email", "Email Address", {
          type: "email",
          autoComplete: "email",
          placeholder: "Enter email address",
        })}

      {/* ---------------------------------
          SERVICE
      --------------------------------- */}

      <div>
        <label
          htmlFor={`${id}-service`}
          className={labelClass}
        >
          Service Needed
        </label>

        <select
          id={`${id}-service`}
          name="service"
          defaultValue={defaultService}
          className={`${inputClass} cursor-pointer appearance-none`}
        >
          <option value="">
            Select a service
          </option>

          {services.map((service) => (
            <option
              key={service}
              value={service}
            >
              {service}
            </option>
          ))}
        </select>
      </div>

      {/* ---------------------------------
          CITY
      --------------------------------- */}

      {!inline &&
        field("city", "City", {
          autoComplete: "address-level2",
          placeholder: "Enter your city",
        })}

      {/* ---------------------------------
          PREFERRED TIME
      --------------------------------- */}

      {showSlot && (
        <div>
          <label
            htmlFor={`${id}-slot`}
            className={labelClass}
          >
            Preferred Time
          </label>

          <select
            id={`${id}-slot`}
            name="slot"
            className={`${inputClass} cursor-pointer`}
          >
            <option value="">
              Any time
            </option>

            <option>
              Morning (10am–1pm)
            </option>

            <option>
              Afternoon (1pm–4pm)
            </option>

            <option>
              Evening (4pm–7pm)
            </option>
          </select>
        </div>
      )}

      {/* ---------------------------------
          MESSAGE
      --------------------------------- */}

      {full && (
        <div className="sm:col-span-2">
          <label
            htmlFor={`${id}-message`}
            className={labelClass}
          >
            How Can We Help?
          </label>

          <textarea
            id={`${id}-message`}
            name="message"
            rows={full ? 5 : 3}
            maxLength={1500}
            className={`
              ${full ? "min-h-27.5 text-base sm:text-sm" : "min-h-20 text-base sm:min-h-17 sm:text-[12px]"}
              w-full
              resize-none
              rounded-md
              border
              border-neutral-200
              bg-white
              px-3
              py-2
              leading-5
              text-brand-navy
              outline-none
              transition-all
              duration-200
              placeholder:text-neutral-400
              hover:border-neutral-300
              focus:border-brand-gold
              focus:ring-2
              focus:ring-brand-gold/10
            `}
            placeholder="Tell us briefly about your requirements"
          />
        </div>
      )}

      {/* ---------------------------------
          HONEYPOT
      --------------------------------- */}

      <div
        className="hidden"
        aria-hidden="true"
      >
        <input
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* ---------------------------------
          CONSENT + ERROR
      --------------------------------- */}

      <div
        className={
          inline
            ? "space-y-1.5 md:col-span-2 md:self-center"
            : full
              ? "space-y-1.5 sm:col-span-2"
              : "space-y-1.5"
        }
      >
        <label className="flex cursor-pointer items-start gap-2">
          <span className="relative mt-px flex h-3.5 w-3.5 shrink-0 items-center justify-center">
            <input
              type="checkbox"
              name="consent"
              required
              className="
                peer
                absolute
                inset-0
                h-full
                w-full
                cursor-pointer
                opacity-0
              "
            />

            <span
              className="
                flex
                h-3.5
                w-3.5
                items-center
                justify-center
                rounded-[3px]
                border
                border-neutral-300
                bg-white
                transition
                peer-checked:border-brand-gold
                peer-checked:bg-brand-gold
                peer-checked:*:opacity-100
                peer-focus-visible:ring-2
                peer-focus-visible:ring-brand-gold/40
              "
            >
              <Check
                size={9}
                strokeWidth={3}
                className="
                  text-white
                  opacity-0
                "
              />
            </span>
          </span>

          <span className="text-[11px] leading-3.5 text-neutral-500">
            I agree to be contacted about my enquiry and accept the{" "}
            <Link
              href="/privacy-policy"
              className="font-medium text-brand-blue-dark underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        {state.error && (
          <p
            id={`${id}-error`}
            role="alert"
            className="rounded-md bg-red-50 px-2.5 py-1.5 text-[10px] font-medium text-brand-danger"
          >
            {state.error}
          </p>
        )}
      </div>

      {/* ---------------------------------
          SUBMIT BUTTON
      --------------------------------- */}

      <button
        type="submit"
        disabled={state.busy}
        className={`
          ${full ? "h-12 text-sm sm:col-span-2" : "h-12 text-sm sm:h-10 sm:text-[11px]"}
          group
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-md
          bg-brand-navy
          px-4
          font-semibold
          tracking-wide
          text-white
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-px
          hover:bg-brand-navy/95
          hover:shadow-md
          disabled:pointer-events-none
          disabled:opacity-60
        `}
      >
        {state.busy ? (
          <>
            <Loader2
              size={14}
              className="animate-spin"
            />

            Sending...
          </>
        ) : (
          <>
            {submitLabel}

            <span className="text-brand-gold transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </>
        )}
      </button>
    </form>
  );
}