export default function manifest() {
  return {
    name: "PHMG & Associates",
    short_name: "PHMG",
    description: "Chartered accountants for tax, audit, GST and compliance.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0b1f3a",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
