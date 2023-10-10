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

export function TopPlayerTable({
    performances,
}: {
    performances: (Prisma.PerformanceGetPayload<{
        include: { game: true; player: true; team: true };
    }> & { pts: number })[];
}) {
    performances.sort((a, b) => b.pts - a.pts);
    return (
        <>
            <Table
                aria-label="This week's top performances"
                classNames={{
                    th: "bg-content2 text-foreground/75",
                }}
                shadow="none"
            >
                <TH className="font-display">
                    <TCol>#</TCol>
                    <TCol>NAME</TCol>
                    <TCol>TEAM</TCol>
                    <TCol>PTS</TCol>
                </TH>
                <TB>
                    {performances.slice(0, 10).map((perf, index) => {
                        let nickname =
                            perf.player.nickname &&
                            perf.player.nickname.length > 0 &&
                            perf.player.nickname;
                        return (
                            <TR key={perf.id}>
                                <TCell>{index + 1}</TCell>
                                <TCell>
                                    <span className="hidden lg:inline">{`${
                                        perf.player.firstName
                                    } ${perf.player.lastName} ${
                                        nickname
                                            ? `("${perf.player.nickname}")`
                                            : ""
                                    }`}</span>
                                    <span className="inline lg:hidden">{`${
                                        perf.player.firstName
                                    } ${perf.player.lastName.charAt(
                                        0
                                    )}.`}</span>
                                </TCell>
                                <TCell>{perf.team.shortName}</TCell>
                                <TCell>
                                    <Tooltip
                                        content={
                                            <div className="flex-center flex-col gap-1 [&>div]:flex [&>div]:items-center [&>div]:justify-between [&>div]:gap-3 [&>div]:w-full [&>div]:h-full [&>div>p:first-child]:font-bold font-display py-2">
                                                <div>
                                                    <p>Goals Thrown</p>
                                                    <Divider orientation="vertical" />
                                                    <p>{perf.goalsThrown}</p>
                                                </div>
                                                <Divider />
                                                <div>
                                                    <p>Goals Caught</p>
                                                    <p>{perf.goalsCaught}</p>
                                                </div>
                                                <Divider />
                                                <div>
                                                    <p>Defensive Plays</p>
                                                    <p>{perf.defensivePlays}</p>
                                                </div>
                                            </div>
                                        }
                                        color="primary"
                                        showArrow
                                    >
                                        <p className="text-center w-full underline no-hover:no-underline decoration-foreground/50 underline-offset-4 decoration-dotted">
                                            {perf.pts}
                                        </p>
                                    </Tooltip>
                                </TCell>
                            </TR>
                        );
                    })}
                </TB>
            </Table>
        </>
    );
}
