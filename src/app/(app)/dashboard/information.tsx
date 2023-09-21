"use client";

import Ticker, { type TickerTypes } from "@/components/Ticker";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Suspense } from "react";
import MostRecentMatchup from "./MostRecentMatchup";

const information: TickerTypes = [
    "MUFL Season 8 is underway! 🤩 Check out the most recent games below!",
    "Donations of any amount help keep the league going. Your generosity is appreciated!",
];

export default async function Dashboard() {
    return (
        <>
            <h1 className="text-5xl font-thin">Dashboard</h1>
            <Ticker infoList={information} className="mb-4 w-full md:w-2/3" />
            <Card className="w-full lg:w-1/2">
                <CardHeader className="p-4">
                    <p className="uppercase font-black text-xs tracking-widest text-center">
                        most recent matchup
                    </p>
                </CardHeader>
                <Divider />
                <Suspense
                    fallback={
                        <CardBody className="flex-center flex-row gap-2">
                            <span className="loading loading-bars w-8 h-8 text-secondary"></span>
                            Loading...
                        </CardBody>
                    }
                >
                    <MostRecentMatchup />
                </Suspense>
            </Card>
        </>
    );
}
