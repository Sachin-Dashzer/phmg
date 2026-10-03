// HRA, GST, EMI and SIP maths. Pure functions, no rounding (format at display time).

export function hra({ basic, da = 0, hraReceived, rentPaid, metro }) {
  const salary = basic + da;
  const exempt = Math.max(0, Math.min(hraReceived, rentPaid - 0.1 * salary, (metro ? 0.5 : 0.4) * salary));
  return { exempt, taxable: Math.max(0, hraReceived - exempt) };
}

export function gst({ amount, rate, inclusive }) {
  const base = inclusive ? amount / (1 + rate / 100) : amount;
  const tax = base * (rate / 100);
  return { base, tax, cgst: tax / 2, sgst: tax / 2, total: base + tax };
}

export function emi({ principal, annualRate, years }) {
  const n = Math.round(years * 12);
  const r = annualRate / 1200;
  const monthly = r === 0 ? principal / n : (principal * r * (1 + r) ** n) / ((1 + r) ** n - 1);
  return { monthly, total: monthly * n, interest: monthly * n - principal };
}

export function sip({ monthly, annualRate, years }) {
  const n = Math.round(years * 12);
  const r = annualRate / 1200;
  const value = r === 0 ? monthly * n : monthly * (((1 + r) ** n - 1) / r) * (1 + r);
  const invested = monthly * n;
  return { invested, value, gain: value - invested };
}
