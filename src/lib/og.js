import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogType = "image/png";

// Brand card used for every Open Graph image. Keep text short: long titles are clipped.
export function ogImage(title, kicker = "Chartered Accountants") {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "linear-gradient(135deg, #0b1f3a 0%, #0f5fd0 100%)", color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 14, background: "#1678fb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 800 }}>PH</div>
          <div style={{ fontSize: 34, fontWeight: 700 }}>PHMG &amp; Associates</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 28, color: "#25abba", textTransform: "uppercase", letterSpacing: 4 }}>{kicker}</div>
          <div style={{ fontSize: title.length > 60 ? 54 : 68, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
        </div>
        <div style={{ fontSize: 26, color: "#cfe0ff" }}>phmgindia.com</div>
      </div>
    ),
    ogSize
  );
}
