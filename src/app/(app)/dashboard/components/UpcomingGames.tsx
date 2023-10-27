import prisma from "@/lib/prismaClient";
import { Card, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import LoadingError from "@/components/LoadingError";
import dayjs from "dayjs";
import { ErrorBoundary } from "react-error-boundary";
import { Prisma } from "@prisma/client";

async function getUpcomingGames() {
    return await prisma.game.findMany({
        orderBy: {
            timestamp: "asc",
        },
        where: {
            timestamp: {
                gte: new Date(),
            },
        },
        select: {
            homeTeam: true,
            awayTeam: true,
            timestamp: true,
            id: true,
        },
    });
}

export default async function UpcomingGames() {
    const upcomingGames = await getUpcomingGames();
    const gameList = upcomingGames.slice(0, 4);
    return (
        <div className="grid grid-cols-2 gap-4">
            {gameList.map((game, index) => (
                <Card
                    className={
                        "border-content2 hover:bg-content2 border-2 p-4 hover:shadow-lg flex-center flex-col gap-4 group"
                    }
                    key={game.id}
                >
                    <p className="flex-center flex-wrap flex-col text-center gap-x-2 md:gap-0">
                        <span className="text-lg font-light flex-center !inline-flex group-hover:gap-x-2 transition-all duration-500">
                            {game.homeTeam.shortName}
                            <div
                                className="w-2 h-2 border-2 rounded-full -ml-2 group-hover:ml-0 transition-all opacity-0 group-hover:opacity-100"
                                style={{
                                    borderColor: game.homeTeam.color,
                                }}
                            ></div>
                        </span>
                        <span className="font-bold text-xs">VS</span>
                        <span className="text-lg font-light flex-center !inline-flex group-hover:gap-x-2 transition-all duration-500">
                            <div
                                className="w-2 h-2 border-2 rounded-full -mr-2 group-hover:mr-0 transition-all opacity-0 group-hover:opacity-100"
                                style={{ borderColor: game.awayTeam.color }}
                            ></div>
                            {game.awayTeam.shortName}
                        </span>
                    </p>
                    <Divider />
                    <p className="text-sm font-medium text-center">
                        {dayjs(game.timestamp).isSame(dayjs(), "day")
                            ? "Today"
                            : dayjs(game.timestamp).isSame(
                                  dayjs().add(1, "day"),
                                  "day",
                              )
                            ? "Tomorrow"
                            : game.timestamp.toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "numeric",
                                  day: "numeric",
                              })}
                        <br />
                        {game.timestamp.toLocaleTimeString("en-US", {
                            timeStyle: "short",
                        })}
                    </p>
                </Card>
            ))}
        </div>
    );
}
