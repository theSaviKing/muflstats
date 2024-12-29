import { Prisma } from "@prisma/client";
import prisma from "./prismaClient";

export const includePlayerWithTeam = {
    team: true,
};

export const includeTeamWithPlayers = {
    players: true,
};

export const includeTeamWithPerformances = {
    performances: true,
};

export const includeTeamWithGames = {
    homeGames: true,
    awayGames: true,
};

export const includeGameWithPerformances = {
    performances: true,
};

export const includeTeamWithGamesAndPerformances = {
    homeGames: includeGameWithPerformances,
    awayGames: includeGameWithPerformances,
};

export const includeGameWithTeams = {
    homeTeam: true,
    awayTeam: true,
};
