import type { Metadata } from "next";
import {
    IBM_Plex_Sans as IBMSans,
    IBM_Plex_Sans_Condensed as IBMCondensed,
    IBM_Plex_Mono as IBMMono,
} from "next/font/google";
import { Providers } from "../providers";
import "./css/globals.css";

export const ibmSans = IBMSans({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    display: "swap",
    variable: "--font-sans",
});
export const ibmCondensed = IBMCondensed({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    display: "swap",
    variable: "--font-display",
});
export const ibmMono = IBMMono({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    display: "swap",
    variable: "--font-mono",
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
                className={`${ibmSans.variable} ${ibmCondensed.variable} ${ibmMono.variable} select-none font-sans`}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
