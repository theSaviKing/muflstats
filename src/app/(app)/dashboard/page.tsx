import Ticker, { TickerTypes } from "@/components/Ticker";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Spinner } from "@nextui-org/spinner";
import { Divider } from "@nextui-org/divider";
import { PrismaClient, Game } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { Metadata } from "next";
import React, { Suspense } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

export const metadata: Metadata = {
    title: "Dashboard",
};

const information: TickerTypes = [
    "MUFL Season 8 is underway! &#129321; Check out the most recent games below!",
    "Donations of any amount help keep the league going. Your generosity is appreciated!",
];

const prisma = new PrismaClient();

async function MostRecentGame() {
    let mostRecentGame: Prisma.GameGetPayload<{
        include: {
            awayTeam: true;
            homeTeam: true;
            performances: { include: { player: true } };
        };
    }>;
    try {
        mostRecentGame = await prisma.game.findFirstOrThrow({
            orderBy: {
                timestamp: "desc",
            },
            include: {
                awayTeam: true,
                homeTeam: true,
                performances: {
                    include: { player: true },
                },
            },
            where: {
                timestamp: {
                    lt: new Date(),
                },
            },
        });
    } catch (error) {
        return (
            <CardBody className="flex flex-row flex-center gap-2">
                <ExclamationCircleIcon className="w-8 h-8 fill-danger" /> Could
                not retrieve data. Try reloading the page.
            </CardBody>
        );
    }

    const homeTeamScores = mostRecentGame.performances.reduce(
        (acc, { goalsCaught, player: { teamId } }) =>
            mostRecentGame.homeTeamId === teamId ? acc + goalsCaught : 0,
        0
    );
    const awayTeamScores = mostRecentGame.performances.reduce(
        (acc, { goalsCaught, player: { teamId } }) =>
            mostRecentGame.awayTeamId === teamId ? acc + goalsCaught : 0,
        0
    );
    return (
        <CardBody className="flex flex-row w-full flex-center gap-4 text-center">
            <div
                className="rounded-full w-5 aspect-square ring-1 ring-offset-2 ring-offset-content1 ring-primary shrink-0"
                style={{ backgroundColor: mostRecentGame.homeTeam.color }}
            ></div>
            <div className="text-right">{mostRecentGame.homeTeam.name}</div>
            <div className="flex shrink-0 justify-center items-center gap-2">
                <div className="rounded px-4 py-2 font-bold bg-content2 shadow">
                    {homeTeamScores}
                </div>
                <div className="w-6 h-[0.1rem] bg-white/75"></div>
                <div className="rounded px-4 py-2 font-bold bg-content2 shadow">
                    {awayTeamScores}
                </div>
            </div>
            <div>{mostRecentGame.awayTeam.name}</div>
            <div
                className="rounded-full w-5 aspect-square ring-1 ring-offset-2 ring-offset-content1 ring-primary shrink-0"
                style={{ backgroundColor: mostRecentGame.awayTeam.color }}
            ></div>
        </CardBody>
    );
}

export default async function Dashboard() {
    "use client";
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
                    <MostRecentGame />
                </Suspense>
            </Card>
        </>
    );
}
