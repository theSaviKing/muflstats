import { ImageResponse } from "next/server";

export const contentType = "image/png";

export const size = { width: 32, height: 32 };

let primary = "#48769d",
    secondary = "#ff4d65";

export const Icon = () => (
    <svg
        viewBox="0 0 160 160"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style={{
            width: "100%",
            height: "100%",
        }}
    >
        <defs>
            <linearGradient id="grad" gradientTransform="rotate(45)">
                <stop offset="25%" stopColor={primary}></stop>
                <stop offset="100%" stopColor={secondary}></stop>
            </linearGradient>
        </defs>
        <path
            id="path"
            d="M 0 80 C 0 20, 20 0, 80 0 S 160 20, 160 80, 140 160 80 160, 0 140, 0 80"
            transform="rotate(0,80,80) translate(0,0)"
            style={{ fill: "url(#grad)" }}
        ></path>
    </svg>
);

export default function Favicon() {
    return new ImageResponse(<Icon />, { ...size });
}
