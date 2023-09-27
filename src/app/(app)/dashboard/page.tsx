import Ticker, { type TickerTypes } from "@/components/Ticker";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Suspense } from "react";
import { Metadata } from "next";
import MostRecentMatchup from "./MostRecentMatchup";
import UpcomingGames from "./UpcomingGames";

const SectionHeader = ({ text }: { text: string }) => (
    <CardHeader className="p-4 font-display">
        <p className="uppercase font-black text-xs tracking-widest text-center">
            {text}
        </p>
    </CardHeader>
);

export const dynamic = "force-dynamic",
    revalidate = 60;

export const metadata: Metadata = {
    title: "Dashboard",
};

const information: TickerTypes = [
    "MUFL Season 8 is underway! 🤩 Check out the most recent games below!",
    "Donations of any amount help keep the league going. Your generosity is appreciated!",
];

export default async function Dashboard() {
    return (
        <>
            <h1 className="text-5xl font-thin">Dashboard</h1>
            <Ticker infoList={information} className="mb-4 w-full md:w-2/3" />
            <Card className="w-[48rem] max-w-full shrink-0">
                <SectionHeader text="most recent matchup" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-3/4">
                <Card className="shrink-0">
                    <SectionHeader text="upcoming games" />
                    <Divider />
                    <Suspense
                        fallback={
                            <CardBody className="flex-center">
                                <span className="loading loading-bars w-8 h-8 text-secondary"></span>
                            </CardBody>
                        }
                    >
                        <UpcomingGames />
                    </Suspense>
                </Card>
                <Card>
                    <SectionHeader text="this week's top players" />
                    <Divider />
                    <CardBody></CardBody>
                </Card>
            </div>
        </>
    );
}
