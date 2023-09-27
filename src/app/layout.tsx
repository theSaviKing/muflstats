import "./globals.css";
import type { Metadata } from "next";
import { Inter, Rubik } from "next/font/google";
import { Providers } from "../providers";

export const inter = Inter({ subsets: ["latin"], weight: "variable" });
export const rubik = Rubik({ subsets: ["latin"], weight: "variable" });

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
                className={`${inter.className} ${rubik.className} w-screen h-screen select-none`}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
