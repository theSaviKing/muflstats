import prisma from "@/lib/prismaClient";
import { getTeamRecord, teamRecordData } from "@/lib/teamFunctions";
import { Divider, Spacer, Tooltip } from "@nextui-org/react";
import { Prisma } from "@prisma/client";

async function getNextGame() {
    return await prisma.game.findFirstOrThrow({
        orderBy: {
            timestamp: "asc",
        },
        where: {
            timestamp: {
                gt: new Date(),
            },
        },
        include: {
            performances: true,
            homeTeam: {
                include: {
                    players: true,
                    homeGames: {
                        include: {
                            performances: true,
                            homeTeam: true,
                            awayTeam: true,
                        },
                    },
                    awayGames: {
                        include: {
                            performances: true,
                            homeTeam: true,
                            awayTeam: true,
                        },
                    },
                },
            },
            awayTeam: {
                include: {
                    players: true,
                    homeGames: {
                        include: {
                            performances: true,
                            homeTeam: true,
                            awayTeam: true,
                        },
                    },
                    awayGames: {
                        include: {
                            performances: true,
                            homeTeam: true,
                            awayTeam: true,
                        },
                    },
                },
            },
        },
    });
}

function VSDivider() {
    return (
        <div className="md:flex-col flex-center gap-2 shrink-0">
            <Divider orientation="vertical" className="h-12 hidden md:inline" />
            <Divider orientation="horizontal" className="w-24 md:hidden" />
            <p className="font-bold">VS</p>
            <Divider orientation="vertical" className="h-12 hidden md:inline" />
            <Divider orientation="horizontal" className="w-24 md:hidden" />
        </div>
    );
}

async function TeamInfo({
    team,
}: {
    team: Prisma.TeamGetPayload<typeof teamRecordData>;
}) {
    const captain = team.players.find((player) => player.role === "Captain");
    const record = getTeamRecord<
        Prisma.TeamGetPayload<{
            include: {
                players: true;
                homeGames: {
                    include: {
                        performances: true;
                        homeTeam: true;
                        awayTeam: true;
                    };
                };
                awayGames: {
                    include: {
                        performances: true;
                        homeTeam: true;
                        awayTeam: true;
                    };
                };
            };
        }>
    >(team).sort(
        (a, b) => a.game.timestamp.getTime() - b.game.timestamp.getTime(),
    );
    return (
        <div className="w-full grow flex-center flex-col">
            <p className="font-display font-bold text-xl lg:text-2xl">
                {team.name}
            </p>
            <p className="opacity-50 uppercase text-sm">
                Captain:&nbsp;
                <span className="font-bold">{`${captain?.firstName} ${captain?.lastName}`}</span>
            </p>
            <Spacer x={0} y={4} />
            <div className="flex-center gap-1">
                {record.map((record) => {
                    const otherTeam =
                        record.game.homeTeamId == team.id
                            ? record.game.awayTeamId
                            : team;
                    return (
                        <Tooltip
                            key={record.game.id}
                            content={record.outcome}
                            placement="bottom"
                            delay={0}
                            closeDelay={0}
                            motionProps={{
                                variants: {
                                    exit: {
                                        opacity: 0,
                                        transition: {
                                            duration: 0,
                                        },
                                    },
                                    enter: {
                                        opacity: 1,
                                        transition: {
                                            duration: 0,
                                        },
                                    },
                                },
                            }}
                            classNames={{
                                base: "font-mono uppercase text-sm",
                            }}
                        >
                            <div
                                className={`w-3 h-4 rounded ${
                                    record.outcome === "win"
                                        ? "bg-success"
                                        : record.outcome === "not played"
                                        ? "bg-transparent border-2 border-content3"
                                        : "bg-danger"
                                }`}
                            ></div>
                        </Tooltip>
                    );
                })}
            </div>
        </div>
    );
}

export default async function NextGame() {
    const nextGame = await getNextGame();
    return (
        <div>
            <div className="flex-center flex-col md:flex-row gap-8 md:gap-4">
                <TeamInfo team={nextGame.homeTeam} />
                <VSDivider />
                <TeamInfo team={nextGame.awayTeam} />
            </div>
        </div>
    );
}
