import prisma from "@/lib/prismaClient";
import { Player } from "@prisma/client";
import * as fs from "node:fs";

const filename = "./perfs.csv";

const csvData = fs.readFileSync(filename, { encoding: "utf8" });
let modifiedData = csvData
    .split("\n")
    .slice(1)
    .join("\n")
    .match(/[^,0-9\n]+\s[^,0-9\n]+/g)!
    .map((match) => match.trim());

console.log(modifiedData);

const getPlayers = async () => {
    let players = await prisma.player.findMany();
    let playersWithNames = players.slice() as (Player & { fullname: string })[];
    playersWithNames.forEach((player) => {
        player.firstName = player.firstName.trim();
        player.lastName = player.lastName.trim();
        player.fullname = `${player.firstName} ${player.lastName}`;
    });
    return playersWithNames;
};

const players = await getPlayers();

let matches: { player: string; id: number }[] = [];

for (let match of modifiedData) {
    let playerMatch = players.find((p) => p.fullname === match);
    if (playerMatch) {
        matches.push({ player: match, id: playerMatch.id });
    } else {
        console.log(`${match} not found in player list...`);
    }
}

let newCSVData = csvData;

for (let match of matches) {
    let dataMatch = newCSVData.match(match.player);
    if (dataMatch) {
        newCSVData = newCSVData.replace(match.player, String(match.id));
    }
}

console.log(newCSVData);

fs.writeFile(filename, newCSVData, { encoding: "utf-8" }, (err) => {
    if (err) {
        console.error(err);
    }
});
