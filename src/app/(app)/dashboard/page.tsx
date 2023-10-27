import LoadingBars from "@/components/LoadingBars";
import Ticker, { type TickerTypes } from "@/components/Ticker";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { type Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import LeagueStandings from "./components/LeagueStandings";
import MostRecentMatchup from "./components/MostRecentMatchup";
import TopPerformances from "./components/TopPerformances";
import UpcomingGames from "./components/UpcomingGames";

const SectionHeader = ({ children }: { children: string }) => (
    <CardHeader className="p-4">
        <p className="font-display uppercase text-sm font-bold tracking-widest text-center">
            {children}
        </p>
    </CardHeader>
);

const DashSuspense = ({
    fallback = (
        <CardBody>
            <LoadingBars />
        </CardBody>
    ),
    noCard = false,
    children,
}: {
    fallback?: ReactNode;
    noCard?: boolean;
    children: ReactNode;
}) => (
    <Suspense fallback={fallback}>
        {noCard ? <div>{children}</div> : <CardBody>{children}</CardBody>}
    </Suspense>
);

export const dynamic = "auto",
    revalidate = 600,
    metadata: Metadata = { title: "Dashboard" };

const information: TickerTypes = [
    "MUFL Season 8 is underway! 🤩 Check out the most recent games below!",
    "Donations of any amount help keep the league going. Your generosity is appreciated!",
];

export default async function Dashboard() {
    return (
        <>
            <h1 id="title">Dashboard</h1>
            <Ticker infoList={information} className="mb-4 w-full md:w-2/3" />
            <ErrorBoundary
                fallbackRender={function () {
                    "use server";
                    return (
                        <Card className="w-1/2">
                            <CardHeader className="flex-center font-bold text-xl font-display">
                                An error occurred.
                            </CardHeader>
                            <Divider />
                            <CardBody className="flex-center">
                                <p>Try refreshing the page.</p>
                            </CardBody>
                            <Divider />
                            <CardFooter className="flex-center">
                                <p className="font-bold font-display">ERROR</p>
                                <pre>{/* <code>{error.message}</code> */}</pre>
                            </CardFooter>
                        </Card>
                    );
                }}
            >
                <Card className="w-[48rem] max-w-full shrink-0">
                    <SectionHeader>most recent matchup</SectionHeader>
                    <Divider />
                    <DashSuspense>
                        <MostRecentMatchup />
                    </DashSuspense>
                </Card>
                <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-[masonry] gap-4 w-full md:w-3/4 [&>*]:shrink-0">
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
            </ErrorBoundary>
        </>
    );
}
