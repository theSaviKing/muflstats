import "./globals.css";
import type { Metadata } from "next";
import { Manrope, Rubik, Martian_Mono } from "next/font/google";
import { Providers } from "../providers";

// export const martian = Martian_Mono({
//     subsets: ["latin"],
//     weight: "variable",
//     display: "swap",
//     variable: "--font-martian",
// });
export const manrope = Manrope({
    subsets: ["latin"],
    weight: "variable",
    display: "swap",
    variable: "--font-manrope",
});
export const rubik = Rubik({
    subsets: ["latin"],
    weight: "variable",
    display: "swap",
    variable: "--font-rubik",
});

export const metadata: Metadata = {
    title: {
        template: "%s | MUFLStats",
        default: "MUFLStats",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="mydark text-foreground bg-background">
            <body
                className={`${manrope.variable} ${rubik.variable} select-none font-sans`}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
