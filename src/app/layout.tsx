import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../providers";

const inter = Inter({ subsets: ["latin"], weight: "variable" });

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
            <body className={inter.className}>
                <Providers>
                    <div className="flex flex-col justify-center items-center w-screen h-screen px-4 pb-4 pt-8">
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    );
}
