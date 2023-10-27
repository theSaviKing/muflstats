import prisma from "@/lib/prismaClient";
import LoadingError from "@/components/LoadingError";
import { MatchupCard } from "./MatchupCard";

async function getMostRecentMatchup() {
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
    let homeTeamScores: number = 0,
        awayTeamScores: number = 0;
    mostRecentGame.performances.forEach((perf) =>
        perf.teamId === mostRecentGame.homeTeamId
            ? (homeTeamScores += perf.goalsCaught)
            : (awayTeamScores += perf.goalsCaught),
    );
    return {
        ...mostRecentGame,
        homeTeamScores,
        awayTeamScores,
    };
}

export default async function MostRecentMatchup() {
    const mostRecentMatchup = await getMostRecentMatchup();
    return <MatchupCard matchup={mostRecentMatchup} />;
}
