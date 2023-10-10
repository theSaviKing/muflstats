import LoadingError from "@/components/LoadingError";
import prisma from "@/lib/prismaClient";
import { TopPlayerTable } from "./TPTable";
import dayjs from "dayjs";

async function getTopPerformances() {
    try {
        let lastWeek = dayjs().subtract(7, "day");
        const lastWeekPerformances = await prisma.performance.findMany({
            include: {
                game: true,
                player: true,
                team: true,
            },
            where: {
                game: {
                    timestamp: {
                        lte: new Date(),
                        gte: lastWeek.toDate(),
                    },
                },
            },
        });
        let perfsWithPoints: ((typeof lastWeekPerformances)[number] & {
            pts: number;
        })[] = lastWeekPerformances.map((perf) => ({
            ...perf,
            pts: perf.defensivePlays + perf.goalsCaught + perf.goalsThrown,
        }));
        return perfsWithPoints;
    } catch (error) {
        return false;
    }
}

export default async function TopPerformances() {
    const topPlayers = await getTopPerformances();
    if (typeof topPlayers === "boolean") {
        return <LoadingError length="short" />;
    }

    return <TopPlayerTable performances={topPlayers} />;
}
