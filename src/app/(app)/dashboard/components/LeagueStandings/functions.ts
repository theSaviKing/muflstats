import { Prisma } from "@prisma/client";

export const teamRecordData = {
    include: {
        homeGames: { include: { performances: true } },
        awayGames: { include: { performances: true } },
        players: true,
    },
};

/**
 * Calculates the outcomes (win, loss, or draw) of a team's games based on the points scored.
 * @param team - The team object containing home and away games with performances.
 * @returns An array of outcomes for each game.
 */
export function getTeamRecord(
    team: Prisma.TeamGetPayload<typeof teamRecordData>,
) {
    /**
     * Determines the outcome of a game based on the points scored.
     * @param game - The game object containing performances.
     * @returns The outcome of the game: win, draw, loss, or not played
     */
    const determineOutcome = (
        game: Prisma.GameGetPayload<typeof teamRecordData.include.homeGames>,
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

/**
 * Calculates the team's points based on their performances in home and away games.
 * @param team - The team object containing home and away games.
 * @returns An object with the total goals caught, goals thrown, and defensive plays.
 */
export function getTeamPoints(
    team: Prisma.TeamGetPayload<typeof teamRecordData>,
): { goalsCaught: number; goalsThrown: number; defensivePlays: number } {
    const performances = [...team.homeGames, ...team.awayGames]
        .map((gm) => gm.performances)
        .flat();
    const goalsCaught = performances.reduce(
        (prev, { goalsCaught }) => prev + goalsCaught,
        0,
    );
    const goalsThrown = performances.reduce(
        (prev, { goalsThrown }) => prev + goalsThrown,
        0,
    );
    const defensivePlays = performances.reduce(
        (prev, { defensivePlays }) => prev + defensivePlays,
        0,
    );
    return {
        goalsCaught: goalsCaught,
        goalsThrown: goalsThrown,
        defensivePlays: defensivePlays,
    };
}
