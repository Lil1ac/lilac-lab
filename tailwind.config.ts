import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        panel: "rgba(8, 14, 28, 0.76)",
        line: "rgba(125, 211, 252, 0.22)",
        cyanSignal: "#67e8f9",
        violetSignal: "#a78bfa",
        ink: "#dbeafe"
      },
      boxShadow: {
        panel: "0 0 0 1px rgba(125, 211, 252, 0.18), 0 24px 80px rgba(0, 0, 0, 0.35)",
        signal: "0 0 28px rgba(103, 232, 249, 0.22)"
      }
    }
  },
  plugins: []
};

export default config;
