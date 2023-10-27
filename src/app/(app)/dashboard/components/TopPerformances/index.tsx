import prisma from "@/lib/prismaClient";
import TopPlayerTable from "./TPTable";

async function getTopPerformances() {
    const lastWeekPerformances = await prisma.performance.findMany({
        include: {
            game: true,
            player: true,
            team: true,
        },
        orderBy: {
            game: {
                timestamp: "desc",
            },
        },
        take: 96,
    });
    let perfsWithPoints: ((typeof lastWeekPerformances)[number] & {
        pts: number;
    })[] = lastWeekPerformances.map((perf) => ({
        ...perf,
        pts: perf.defensivePlays + perf.goalsCaught + perf.goalsThrown,
    }));
    return perfsWithPoints;
}

export default async function TopPerformances() {
    const topPlayers = await getTopPerformances();
    return <TopPlayerTable performances={topPlayers} />;
}
