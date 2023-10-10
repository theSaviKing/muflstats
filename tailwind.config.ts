import type { Config } from "tailwindcss";
import chroma from "chroma-js";
import { nextui } from "@nextui-org/react";
import plugin from "tailwindcss/plugin";
import defaultTheme from "tailwindcss/defaultTheme";
const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                display: [
                    "var(--font-manrope)",
                    ...defaultTheme.fontFamily.serif,
                ],
                sans: ["var(--font-rubik)", ...defaultTheme.fontFamily.sans],
                // mono: ["var(--font-martian)", ...defaultTheme.fontFamily.mono],
            },
            screens: {
                "no-hover": { raw: "(hover:none)" },
                "can-hover": { raw: "(hover:hover)" },
            },
        },
    },
    plugins: [
        nextui({
            themes: {
                mydark: {
                    extend: "dark",
                    colors: {
                        primary: {
                            50: "#e4f5ff",
                            100: "#c6dbec",
                            200: "#a5c1da",
                            300: "#84a8c8",
                            400: "#6290b7",
                            500: "#48769d",
                            600: "#365c7b",
                            700: "#254259",
                            800: "#122738",
                            900: "#000e19",
                            DEFAULT: "#48769d",
                        },
                        secondary: {
                            50: "#ffe2e8",
                            100: "#ffb1bc",
                            200: "#ff7f91",
                            300: "#ff4d65",
                            400: "#fe1d3a",
                            500: "#e50520",
                            600: "#b30018",
                            700: "#810010",
                            800: "#4f0008",
                            900: "#200001",
                            DEFAULT: "#ff4d65",
                        },
                        background: "#051014",
                        foreground: "#FFFBFA",
                        success: "#48C934",
                        warning: "#FFB342",
                        danger: "#FF5242",
                        content1: chroma("#051014").brighten(0.5).hex(),
                        content2: chroma("#051014").brighten(1).hex(),
                        content3: chroma("#051014").brighten(1.5).hex(),
                        content4: chroma("#051014").brighten(2).hex(),
                    },
                },
            },
        }),
        plugin(function ({ addUtilities }) {
            addUtilities({
                // ".font-display": {
                //     "font-family": "var(--font-manrope)",
                // },
                // ".font-sans": {
                //     "font-family": "var(--font-rubik)",
                // },
                // ".font-mono": {
                //     "font-family": "var(--font-martian)",
                // },
                // ".font-number": {
                //     "@apply font-mono font-medium": {},
                // },
                ".flex-center": {
                    "@apply justify-center items-center": {},
                },
            });
        }),
    ],
    darkMode: "class",
};
export default config;
