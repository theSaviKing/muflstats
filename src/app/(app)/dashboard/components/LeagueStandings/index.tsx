import prisma from "@/lib/prismaClient";
import {
    getTeamPoints,
    getTeamRecord,
    teamRecordData,
} from "@/lib/teamFunctions";
import { firstBy } from "thenby";
import LeagueStandingsTable from "./LSTable";

async function getTeamStandings() {
    let teams = (await prisma.team.findMany(teamRecordData))
        .map((team) => ({
            ...team,
            ...getTeamPoints(team),
            record: getTeamRecord(team),
        }))
        .map((team) => {
            return {
                ...team,
                winCount: team.record.filter((v) => v.outcome === "win").length,
                loseCount: team.record.filter((v) => v.outcome === "loss")
                    .length,
                drawCount: team.record.filter((v) => v.outcome === "draw")
                    .length,
                notPlayedCount: team.record.filter(
                    (v) => v.outcome === "not played",
                ).length,
            };
        });

    return teams.sort(firstBy((v1, v2) => v1.winCount - v2.winCount));
}

export default async function LeagueStandings() {
    const teamStandings = await getTeamStandings();
    return <LeagueStandingsTable teams={teamStandings} />;
}
