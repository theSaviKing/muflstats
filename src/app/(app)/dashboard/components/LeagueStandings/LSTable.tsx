"use client";
import {
    Divider,
    TableBody as TB,
    TableCell as TCell,
    TableColumn as TCol,
    TableHeader as TH,
    TableRow as TR,
    Table,
    Tooltip,
} from "@nextui-org/react";
import { Prisma } from "@prisma/client";
import { type teamRecordData } from "./functions";
import TeamInfo, { TeamTooltip } from "./TeamInfo";
import { useState } from "react";

export type TeamDataType = (Prisma.TeamGetPayload<typeof teamRecordData> & {
    record: ("win" | "not played" | "draw" | "loss")[];
    goalsCaught: number;
    goalsThrown: number;
    defensivePlays: number;
})[];

export default function LeagueStandingsTable({
    teams,
}: {
    teams: TeamDataType;
}) {
    const [selected, setSelected] = useState<number>();
    return (
        <Table
            aria-label="Current standings of teams in the league"
            classNames={{
                th: "bg-content2 text-foreground/75",
            }}
            shadow="none"
            className="@container"
        >
            <TH>
                <TCol>RANK</TCol>
                <TCol>TEAM</TCol>
                <TCol>
                    <p className="hidden @lg:inline">GOALS SCORED</p>
                    <p className="inline @lg:hidden">GOALS</p>
                </TCol>
                <TCol>
                    <p className="hidden @lg:inline">DEFENSIVE PLAYS</p>
                    <p className="inline @lg:hidden">DEF. PLAYS</p>
                </TCol>
            </TH>
            <TB>
                {teams.map((team, index) => (
                    <TR key={team.id}>
                        <TCell>{index + 1}</TCell>
                        <TCell>
                            {/* <TeamInfo
                                team={team}
                                selected={
                                    selected == index
                                        ? 1
                                        : selected == undefined
                                        ? 0
                                        : -1
                                }
                                setSelected={() =>
                                    selected == index
                                        ? setSelected(undefined)
                                        : setSelected(index)
                                }
                            /> */}
                            <TeamTooltip team={team} />
                        </TCell>
                        <TCell>
                            {(team.goalsCaught + team.goalsThrown) / 2}
                        </TCell>
                        <TCell>{team.defensivePlays}</TCell>
                    </TR>
                ))}
            </TB>
        </Table>
    );
}
