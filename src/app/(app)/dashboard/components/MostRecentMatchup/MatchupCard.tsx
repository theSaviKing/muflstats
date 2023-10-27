"use client";

import { Prisma } from "@prisma/client";
import { CSSProperties, useEffect, useState } from "react";

export function MatchupCard({
    matchup,
}: {
    matchup: Prisma.GameGetPayload<{
        include: { homeTeam: true; awayTeam: true };
    }> & { homeTeamScores: number; awayTeamScores: number };
}) {
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        setTimeout(() => setIsLoaded(true), 100);
        // console.log("window loaded.");
    }, []);
    let homeTeamWin = matchup.homeTeamScores > matchup.awayTeamScores;
    return (
        <div className="flex flex-col sm:flex-row w-full flex-center gap-4 text-center">
            <div className="text-right flex-center gap-4">
                <div
                    className="rounded-full w-5 h-5 outline outline-1 outline-primary outline-offset-2 shrink-0"
                    style={{
                        backgroundColor: matchup.homeTeam.color,
                    }}
                ></div>
                {matchup.homeTeam.name}
            </div>
            <div className="flex shrink-0 justify-center items-center gap-2">
                <div
                    className={`font-mono rounded px-4 py-2 font-bold shadow transition-colors duration-1000 ${
                        isLoaded && homeTeamWin
                            ? "bg-success-700"
                            : "bg-content2"
                    }`}
                >
                    <span className="countdown">
                        <span
                            style={
                                {
                                    "--value": isLoaded
                                        ? matchup.homeTeamScores
                                        : 0,
                                } as CSSProperties
                            }
                        ></span>
                    </span>
                </div>
                <div className="w-6 h-[0.1rem] bg-white/75"></div>
                <div
                    className={`font-mono rounded px-4 py-2 font-bold shadow transition-colors duration-1000 ${
                        isLoaded && !homeTeamWin
                            ? "bg-success-700"
                            : "bg-content2"
                    }`}
                >
                    <span className="countdown">
                        <span
                            style={
                                {
                                    "--value": isLoaded
                                        ? matchup.awayTeamScores
                                        : 0,
                                } as CSSProperties
                            }
                            className="font-number"
                        ></span>
                    </span>
                </div>
            </div>
            <div className="text-left flex-center gap-4">
                {matchup.awayTeam.name}
                <div
                    className="rounded-full w-5 h-5 outline outline-1 outline-offset-2 outline-primary shrink-0"
                    style={{
                        backgroundColor: matchup.awayTeam.color,
                    }}
                ></div>
            </div>
        </div>
    );
}
