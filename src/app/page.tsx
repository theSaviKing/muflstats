import type { Metadata } from "next";
import { Icon } from "./icon";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { ChartBarIcon } from "@heroicons/react/20/solid";

export const metadata: Metadata = {
    title: {
        absolute: "MUFLStats: the Ultimate source",
    },
};

export default function Homepage() {
    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen px-4 pb-4 pt-8">
            <div className="flex flex-col gap-8">
                <header className="flex flex-col lg:flex-row gap-4 lg:gap-8 justify-center items-center select-none">
                    <Icon className="w-full h-full max-h-32" />
                    <div className="flex flex-col flex-center gap-2 text-center">
                        <h1 className="text-secondary text-4xl lg:text-6xl font-bold">
                            MUFLStats
                        </h1>
                        <p className="uppercase tracking-widest text-primary-100">
                            the Ultimate source
                        </p>
                    </div>
                </header>
                <Button
                    variant="shadow"
                    color="primary"
                    as={Link}
                    href="/dashboard"
                    startContent={<ChartBarIcon className="w-6 h-6" />}
                    size="lg"
                >
                    Start tracking
                </Button>
            </div>
        </div>
    );
}
