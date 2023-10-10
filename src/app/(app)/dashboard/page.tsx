import LoadingBars from "@/components/LoadingBars";
import Ticker, { type TickerTypes } from "@/components/Ticker";
import { Card, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import MostRecentMatchup from "./components/MostRecentMatchup/MostRecentMatchup";
import TopPerformances from "./components/TopPerformances/TopPerformances";
import UpcomingGames from "./components/UpcomingGames";

const SectionHeader = ({ children }: { children: string }) => (
    <CardHeader className="p-4 font-display">
        <p className="uppercase font-black text-xs tracking-widest text-center">
            {children}
        </p>
    </CardHeader>
);

const DashSuspense = ({
    fallback = <LoadingBars />,
    children,
}: {
    fallback?: ReactNode;
    children: ReactNode;
}) => <Suspense fallback={fallback}>{children}</Suspense>;

export const dynamic = "force-dynamic",
    revalidate = 3600,
    metadata: Metadata = { title: "Dashboard" };

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
                <SectionHeader>most recent matchup</SectionHeader>
                <Divider />
                <DashSuspense>
                    <MostRecentMatchup />
                </DashSuspense>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-[masonry] gap-4 w-full md:w-3/4">
                <Card className="shrink-0">
                    <SectionHeader>upcoming games</SectionHeader>
                    <Divider />
                    <DashSuspense>
                        <UpcomingGames />
                    </DashSuspense>
                </Card>
                <Card className="shrink-0">
                    <SectionHeader>top players in the last week</SectionHeader>
                    <Divider />
                    <DashSuspense>
                        <TopPerformances />
                    </DashSuspense>
                </Card>
                <Card className="col-span-full shrink-0">
                    <SectionHeader>league standings</SectionHeader>
                </Card>
            </div>
        </>
    );
}
