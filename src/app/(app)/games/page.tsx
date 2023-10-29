import prisma from "@/lib/prismaClient";
import LoadingError from "@/components/LoadingError";
import { Suspense } from "react";
import LoadingBars from "@/components/LoadingBars";
import { Metadata } from "next";
import { DashCard } from "@/lib/utils";
import { DashSuspense } from "@/lib/utils";
import { SectionHeader } from "@/lib/utils";
import { Card } from "@nextui-org/card";
import NextGame from "./components/NextGame";

async function getGames() {
    return await prisma.game.findMany({
        include: {
            homeTeam: true,
            awayTeam: true,
        },
        orderBy: {
            timestamp: "asc",
        },
    });
}

export const metadata: Metadata = {
    title: "Games",
};

export default async function GamesPage() {
    return (
        <>
            <h1 className="text-5xl font-thin">Games</h1>
            <div className="grid gap-4 grid-cols-2 w-full px-[15vw]">
                <DashCard className="col-span-full" title="next game">
                    <NextGame />
                </DashCard>
            </div>
        </>
    );
}
