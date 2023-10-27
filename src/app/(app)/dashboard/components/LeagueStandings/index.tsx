import prisma from "@/lib/prismaClient";
import { getTeamRecord, teamRecordData, getTeamPoints } from "./functions";
import { CardBody } from "@nextui-org/card";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import LoadingError from "@/components/LoadingError";
import LeagueStandingsTable from "./LSTable";
import { firstBy } from "thenby";

async function getTeamStandings() {
    const teams = (await prisma.team.findMany(teamRecordData))
        .map((team) => ({
            ...team,
            ...getTeamPoints(team),
            record: getTeamRecord(team),
        }))
        .map((team) => ({
            ...team,
            winCount: team.record.filter((v) => v === "win").length,
            loseCount: team.record.filter((v) => v === "loss").length,
            drawCount: team.record.filter((v) => v === "draw").length,
            notPlayedCount: team.record.filter((v) => v === "not played")
                .length,
        }));

    return teams.sort(firstBy((v1, v2) => v1.winCount - v2.winCount));
}

export default async function LeagueStandings() {
    const teamStandings = await getTeamStandings();
    return <LeagueStandingsTable teams={teamStandings} />;
}
