import prisma from "@/lib/prismaClient";
import { getTeamRecord, teamRecordData } from "@/lib/prismaFunctions";

async function getTeamStandings() {
    const teams = await prisma.team.findMany(teamRecordData);
    const teamsWithRecords = new Map<
        (typeof teams)[number],
        ReturnType<typeof getTeamRecord>
    >();
    for (const team of teams) {
        let record = getTeamRecord(team);
        teamsWithRecords.set(team, record);
    }
}

export default async function LeagueStandings() {
    return <div></div>;
}
