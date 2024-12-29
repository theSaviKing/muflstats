import Ticker, { type TickerTypes } from "@/components/Ticker";
import { MSErrorBoundary } from "@/lib/error";
import { DashCard, DashSuspense, SectionHeader } from "@/lib/utils";
import { Card } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { type Metadata } from "next";
import LeagueStandings from "./components/LeagueStandings";
import MostRecentMatchup from "./components/MostRecentMatchup";
import TopPerformances from "./components/TopPerformances";
import UpcomingGames from "./components/UpcomingGames";

const information: TickerTypes = [
    "MUFL Season 8 is underway! 🤩 Check out the most recent games below!",
    "Donations of any amount help keep the league going. Your generosity is appreciated!",
];

export const dynamic = "auto",
    revalidate = 600,
    metadata: Metadata = { title: "Dashboard" };

export default async function Dashboard() {
    return (
        <>
            <h1 id="title">Dashboard</h1>
            <Ticker infoList={information} className="mb-4 w-full md:w-2/3" />
            <MSErrorBoundary>
                <DashCard
                    title="most recent matchup"
                    className="w-[48rem] max-w-full"
                >
                    <MostRecentMatchup />
                </DashCard>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:px-[10vw] [&>*]:shrink-0">
                    <Card>
                        <SectionHeader>upcoming games</SectionHeader>
                        <Divider />
                        <DashSuspense>
                            <UpcomingGames />
                        </DashSuspense>
                    </Card>
                    <Card>
                        <SectionHeader>
                            top players in the last week
                        </SectionHeader>
                        <Divider />
                        <DashSuspense noCard>
                            <TopPerformances />
                        </DashSuspense>
                    </Card>
                    <Card className="col-span-full">
                        <SectionHeader>league standings</SectionHeader>
                        <Divider />
                        <DashSuspense noCard>
                            <LeagueStandings />
                        </DashSuspense>
                    </Card>
                </div>
            </MSErrorBoundary>
        </>
    );
}
