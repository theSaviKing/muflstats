import type { Config } from "tailwindcss";
import chroma from "chroma-js";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {},
    plugins: [
        require("@headlessui/tailwindcss"),
        /* require("daisyui") */
    ],
    daisyui: {
        themes: [
            // THEME COLORS: https://coolors.co/4d7ea8-b6c2d9-ff5d73-726953-051014
            {
                mytheme: {
                    primary: "#4D7EA8",
                    secondary: "#B6C2D9",
                    accent: "#FF5D73",
                    neutral: "#212935",
                    "base-100": "#051014",
                    "base-200": chroma("#051014").brighten(1).hex(),
                    "base-300": chroma("#051014").brighten(2).hex(),
                    info: "#22d3ee",
                    success: "#4ade80",
                    warning: "#facc15",
                    error: "#e11d48",
                },
            },
        ],
    },
};

export default config;
