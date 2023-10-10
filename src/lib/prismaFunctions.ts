import { Prisma } from "@prisma/client";

/**
 * Calculates the outcomes (win, loss, or draw) of a team's games based on the points scored.
 * @param team - The team object containing home and away games with performances.
 * @returns An array of outcomes for each game.
 */
export function getTeamRecord(
    team: Prisma.TeamGetPayload<{
        include: {
            homeGames: { include: { performances: true } };
            awayGames: { include: { performances: true } };
        };
    }>
) {
    /**
     * Determines the outcome of a game based on the points scored.
     * @param game - The game object containing performances.
     * @returns The outcome of the game: 2 for win, 1 for draw, 0 for loss.
     */
    const determineOutcome = (
        game: Prisma.GameGetPayload<{ include: { performances: true } }>
    ): 0 | 1 | 2 => {
        const teamPoints = game.performances
            .filter((p) => p.teamId === team.id)
            .reduce((pAcc, pCurr) => pAcc + pCurr.goalsCaught, 0);
        const oppPoints = game.performances
            .filter((p) => p.teamId !== team.id)
            .reduce((pAcc, pCurr) => pAcc + pCurr.goalsCaught, 0);
        if (teamPoints - oppPoints > 0) {
            return 2;
        } else if (teamPoints - oppPoints == 0) {
            return 1;
        } else {
            return 0;
        }
    };

    return [...team.homeGames, ...team.awayGames].map((game) => {
        switch (determineOutcome(game)) {
            case 2:
                return "win";
            case 1:
                return "draw";
            case 0:
                return "loss";
        }
    });
}

import prisma from "./prismaClient";
import dayjs from "dayjs";

const teams = await prisma.team.findMany({
    include: {
        homeGames: {
            include: { performances: true },
            orderBy: { timestamp: "asc" },
            where: {
                timestamp: { lt: dayjs().subtract(1.5, "hours").toDate() },
            },
        },
        awayGames: {
            include: { performances: true },
            orderBy: { timestamp: "asc" },
            where: {
                timestamp: { lt: dayjs().subtract(1.5, "hours").toDate() },
            },
        },
    },
});

console.log(
    `teams[0]:\t${teams[0].name}\nteam record:\t${getTeamRecord(
        teams[0]
    )}\ntimestamps:\t${[...teams[0].homeGames, ...teams[0].awayGames]
        .map((gm) => dayjs(gm.timestamp).format("ddd M/D"))
        .join(", ")}`
);
