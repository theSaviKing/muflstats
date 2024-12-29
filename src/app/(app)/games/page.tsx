import { MSErrorBoundary } from "@/lib/error";
import prisma from "@/lib/prismaClient";
import {
    includeGameWithTeams,
    includeTeamWithGamesAndPerformances,
} from "@/lib/types";
import { DashCard } from "@/lib/utils";
import { Metadata } from "next";
import FutureGames from "./components/FutureGames";
import NextGame from "./components/NextGame";
import PastGames from "./components/PastGames";

export async function getGames() {
    const games = await prisma.game.findMany({
        orderBy: {
            timestamp: "asc",
        },
        include: {
            performances: true,
            homeTeam: {
                include: {
                    players: true,
                    homeGames: { include: { performances: true } },
                    awayGames: { include: { performances: true } },
                },
            },
            awayTeam: {
                include: {
                    players: true,
                    homeGames: { include: { performances: true } },
                    awayGames: { include: { performances: true } },
                },
            },
        },
    });
    const pastGames = games.filter((game) => game.timestamp < new Date());
    const futureGames = games.filter((game) => game.timestamp >= new Date());
    const nextGame = futureGames.splice(0, 1)[0];
    return {
        pastGames,
        futureGames,
        nextGame,
    };
}

export const metadata: Metadata = {
    title: "Games",
};

export default async function GamesPage() {
    return (
        <>
            <h1 className="text-5xl font-thin">Games</h1>
            <MSErrorBoundary>
                <div className="grid gap-4 grid-cols-2 w-full md:px-[10vw]">
                    <DashCard className="col-span-full" title="next game">
                        <NextGame />
                    </DashCard>
                    <DashCard title="past games">
                        <PastGames />
                    </DashCard>
                    <DashCard title="future games">
                        <FutureGames />
                    </DashCard>
                </div>
            </MSErrorBoundary>
        </>
    );
}
