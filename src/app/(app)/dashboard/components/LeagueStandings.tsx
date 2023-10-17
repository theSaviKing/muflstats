import prisma from "@/lib/prismaClient";
import { getTeamRecord, teamRecordData } from "@/lib/prismaFunctions";
import { CardBody } from "@nextui-org/card";

async function getTeamStandings() {
    const teams = await prisma.team.findMany(teamRecordData);
    let teamsWithRecords: ((typeof teams)[number] & {
        record: ReturnType<typeof getTeamRecord>;
    })[] = teams.map((team) => ({
        ...team,
        record: getTeamRecord(team),
    }));
    return teamsWithRecords;
}

export default async function LeagueStandings() {
    const ts = await getTeamStandings();
    ts.sort(
        (a, b) =>
            a.record.filter((v) => v === "win").length -
            b.record.filter((v) => v === "win").length,
    );
    let tt = ts.map((t) => ({
        name: t.name,
        record: t.record,
    }));
    return (
        <CardBody>
            <pre>
                <code>{JSON.stringify(tt, undefined, 4)}</code>
            </pre>
        </CardBody>
    );
}
