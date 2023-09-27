import prisma from "@/lib/prisma";
import { Card, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

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
        },
    });
}

export default async function UpcomingGames() {
    const upcomingGames = (await getUpcomingGames()).slice(0, 4);
    return (
        <CardBody className="grid grid-cols-2 gap-4">
            {upcomingGames.map((game, index) => (
                <>
                    <Card className="border-2 border-content2 p-4 hover:bg-content2 hover:shadow-lg flex-center flex-col gap-4">
                        <p className="md:flex-center md:flex-col text-center">
                            <span className="text-lg font-light">
                                {game.homeTeam.shortName}
                            </span>
                            <span className="font-bold text-xs">VS</span>
                            <span className="inline md:hidden">&nbsp;</span>
                            <span className="text-lg font-light">
                                {game.awayTeam.shortName}
                            </span>
                        </p>
                        <Divider />
                        <p className="text-sm font-medium text-center">
                            {`${game.timestamp.toLocaleDateString("en-US", {
                                weekday: "short",
                                timeZone: "America/Chicago",
                            })} ${game.timestamp.toLocaleDateString("en-US", {
                                month: "numeric",
                                day: "numeric",
                                timeZone: "America/Chicago",
                            })}`}
                            <br />
                            {game.timestamp.toLocaleTimeString("en-US", {
                                timeStyle: "short",
                                timeZone: "America/Chicago",
                            })}
                        </p>
                    </Card>
                </>
            ))}
        </CardBody>
    );
}
