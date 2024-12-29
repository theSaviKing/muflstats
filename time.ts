import prisma from "@/lib/prismaClient";

declare global {
    interface Date {
        addHours: (h: number) => Date;
    }
}

const getDSTGames = async () =>
    await prisma.game.findMany({
        where: {
            timestamp: {
                gte: new Date("2023-11-05"),
            },
        },
    });

const dstGames = await getDSTGames();

Date.prototype.addHours = function (h: number) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
};

// dstGames.forEach(async (game) => {
//     await prisma.game.update({
//         where: {
//             id: game.id,
//         },
//         data: {
//             timestamp: game.timestamp.addHours(1),
//         },
//     });
// });

console.log(await getDSTGames());
