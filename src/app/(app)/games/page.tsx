import prisma from "@/lib/prismaClient";
import LoadingError from "../../../components/LoadingError";
import { Suspense } from "react";
import LoadingBars from "@/components/LoadingBars";
import { Metadata } from "next";

async function getGames() {
    try {
        return await prisma.game.findMany({
            include: {
                homeTeam: true,
                awayTeam: true,
            },
            orderBy: {
                timestamp: "asc",
            },
            where: {
                timestamp: {
                    gte: new Date("2023-9-25"),
                },
            },
        });
    } catch (error) {
        return false;
    }
}

export const metadata: Metadata = {
    title: "Games",
};

async function Games() {
    const games = await getGames();
    if (typeof games === "boolean") return <LoadingError />;
    return (
        <div className="w-3/5 grid grid-cols-1 gap-2">
            {games.map((game) => {
                let past = game.timestamp < new Date();
                return (
                    <div className="flex-center w-full" key={game.id}>
                        <p className="p-4 w-16 h-full flex-center rounded-l border-l-2 border-y-2 border-content2 font-bold shrink-0">
                            {game.id}
                        </p>
                        <div className="p-4 rounded-r border-2 border-content2 grow flex-center flex-col gap-2">
                            <div className="flex-center gap-4">
                                <div
                                    className="w-4 h-4 rounded-full outline outline-1 outline-primary outline-offset-2"
                                    style={{
                                        backgroundColor: game.homeTeam.color,
                                    }}
                                ></div>
                                <p className="font-bold">
                                    {game.homeTeam.name} [{game.homeTeam.id}]
                                </p>
                                <p>vs.</p>
                                <p className="font-bold">
                                    {game.awayTeam.name} [{game.awayTeam.id}]
                                </p>
                                <div
                                    className="w-4 h-4 rounded-full outline outline-1 outline-primary outline-offset-2"
                                    style={{
                                        backgroundColor: game.awayTeam.color,
                                    }}
                                ></div>
                            </div>
                            <p className="text-sm opacity-60 text-center w-full">
                                {game.timestamp.toLocaleDateString("en-US", {
                                    weekday: "short",
                                    month: "long",
                                    day: "numeric",
                                })}{" "}
                                &mdash;{" "}
                                {game.timestamp.toLocaleTimeString("en-US", {
                                    timeStyle: "short",
                                })}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default async function GamesPage() {
    return (
        <>
            <h1 className="text-5xl font-thin">Games</h1>
            <Suspense fallback={<LoadingBars inCard={false} />}>
                <Games />
            </Suspense>
        </>
    );
}
