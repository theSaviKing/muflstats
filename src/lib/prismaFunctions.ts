import { Prisma } from "@prisma/client";

export const teamRecordData = {
    include: {
        homeGames: { include: { performances: true } },
        awayGames: { include: { performances: true } },
    },
};

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
    }>,
) {
    /**
     * Determines the outcome of a game based on the points scored.
     * @param game - The game object containing performances.
     * @returns The outcome of the game: win, draw, loss, or not played
     */
    const determineOutcome = (
        game: Prisma.GameGetPayload<{ include: { performances: true } }>,
    ) => {
        const teamPoints = game.performances
            .filter((p) => p.teamId === team.id)
            .reduce((pAcc, pCurr) => pAcc + pCurr.goalsCaught, 0);
        const oppPoints = game.performances
            .filter((p) => p.teamId !== team.id)
            .reduce((pAcc, pCurr) => pAcc + pCurr.goalsCaught, 0);
        if (teamPoints - oppPoints > 0) {
            return "win";
        } else if (game.performances.length == 0) {
            return "not played";
        } else if (teamPoints - oppPoints == 0) {
            return "draw";
        } else {
            return "loss";
        }
    };

    return [...team.homeGames, ...team.awayGames]
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
        .map((game) => determineOutcome(game));
}

// import prisma from "./prismaClient";

// console.log(
//     getTeamRecord(
//         await prisma.team.findFirstOrThrow({
//             include: {
//                 homeGames: {
//                     include: {
//                         performances: true,
//                     },
//                 },
//                 awayGames: {
//                     include: {
//                         performances: true,
//                     },
//                 },
//             },
//             where: {
//                 id: 4,
//             },
//         })
//     )
// );
