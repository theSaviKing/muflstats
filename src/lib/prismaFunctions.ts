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
    ): -1 | 0 | 1 | 2 => {
        const teamPoints = game.performances
            .filter((p) => p.teamId === team.id)
            .reduce((pAcc, pCurr) => pAcc + pCurr.goalsCaught, 0);
        const oppPoints = game.performances
            .filter((p) => p.teamId !== team.id)
            .reduce((pAcc, pCurr) => pAcc + pCurr.goalsCaught, 0);
        if (teamPoints - oppPoints > 0) {
            return 2;
        } else if (game.performances.length == 0) {
            return -1;
        } else if (teamPoints - oppPoints == 0) {
            return 1;
        } else {
            return 0;
        }
    };

    return [...team.homeGames, ...team.awayGames]
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
        .map((game) => {
            switch (determineOutcome(game)) {
                case 2:
                    return "win";
                case 1:
                    return "draw";
                case 0:
                    return "loss";
                case -1:
                    return "not played";
            }
        });
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
