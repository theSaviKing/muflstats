import prisma from "@/lib/prisma";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { CardBody } from "@nextui-org/react";
import { Prisma } from "@prisma/client";

export async function getMostRecentMatchup(): Promise<
    | (Prisma.GameGetPayload<{
          include: {
              awayTeam: true;
              homeTeam: true;
              performances: { include: { player: true } };
          };
      }> & { homeTeamScores: number; awayTeamScores: number; error: boolean })
    | boolean
> {
    try {
        console.log("Trying to get most recent matchup...");
        const mostRecentGame = await prisma.game.findFirstOrThrow({
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
        return {
            ...mostRecentGame,
            homeTeamScores,
            awayTeamScores,
            error: false,
        };
    } catch (error) {
        return false;
    }
}

export default async function MostRecentMatchup() {
    const mostRecentMatchup = await getMostRecentMatchup();
    if (typeof mostRecentMatchup === "boolean") {
        return (
            <CardBody className="flex flex-row flex-center gap-2">
                <ExclamationCircleIcon className="w-8 h-8 fill-danger" /> Could
                not retrieve data. Try reloading the page.
            </CardBody>
        );
    } else {
        return (
            <CardBody className="flex flex-row w-full flex-center gap-4 text-center">
                <div
                    className="rounded-full w-5 aspect-square ring-1 ring-offset-2 ring-offset-content1 ring-primary shrink-0"
                    style={{
                        backgroundColor: mostRecentMatchup.homeTeam.color,
                    }}
                ></div>
                <div className="text-right">
                    {mostRecentMatchup.homeTeam.name}
                </div>
                <div className="flex shrink-0 justify-center items-center gap-2">
                    <div className="rounded px-4 py-2 font-bold bg-content2 shadow">
                        {mostRecentMatchup.homeTeamScores}
                    </div>
                    <div className="w-6 h-[0.1rem] bg-white/75"></div>
                    <div className="rounded px-4 py-2 font-bold bg-content2 shadow">
                        {mostRecentMatchup.awayTeamScores}
                    </div>
                </div>
                <div>{mostRecentMatchup.awayTeam.name}</div>
                <div
                    className="rounded-full w-5 aspect-square ring-1 ring-offset-2 ring-offset-content1 ring-primary shrink-0"
                    style={{
                        backgroundColor: mostRecentMatchup.awayTeam.color,
                    }}
                ></div>
            </CardBody>
        );
    }
}
