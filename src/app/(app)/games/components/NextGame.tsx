import prisma from "@/lib/prismaClient";

type NuM = number | Element;

async function getNextGame() {
    const games = await prisma.game.findMany({
        orderBy: {
            timestamp: "asc",
        },
    });
}

export default function NextGame() {
    return <div></div>;
}
