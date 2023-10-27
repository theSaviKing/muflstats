"use client";

import { Tooltip } from "@nextui-org/react";
import { Team } from "@prisma/client";
import ExpandIcon from "./ExpandIcon";
import { TeamDataType } from "./LSTable";

export default function TeamInfo({
    team,
    selected,
    setSelected,
}: {
    team: Team;
    selected: 1 | 0 | -1;
    setSelected: () => void;
}) {
    return (
        <div
            className={`transition-all ease-in-out duration-500 ${
                selected == 1 ? "p-4 rounded-xl bg-content2" : ""
            }`}
        >
            <button
                className={`group flex items-center justify-between w-full gap-4`}
                onClick={setSelected}
            >
                <p className="relative">
                    <span
                        className={`w-full transition-[font-weight,_font-size,_line-height,_opacity] ease-in-out duration-500 ${
                            selected == 1
                                ? "font-bold text-2xl"
                                : selected == -1
                                ? "opacity-60"
                                : ""
                        }`}
                    >
                        {team.name}
                    </span>
                </p>

                <ExpandIcon
                    className={`[&_svg]:stroke-1 group-hover:opacity-50 opacity-0 transition-opacity duration-75`}
                    expanded={selected == 1}
                />
            </button>
            <div className={`h-max`}>
                <div className={`h-8 bg-primary-50`}></div>
            </div>
        </div>
    );
}

export function TeamTooltip({ team }: { team: TeamDataType[number] }) {
    return (
        <Tooltip
            className="border border-content3"
            radius="sm"
            content={
                <div className="space-y-2">
                    <p className="text-base font-bold font-display">
                        {team.name}
                    </p>
                </div>
            }
            closeDelay={0}
            motionProps={{
                variants: {
                    exit: {
                        opacity: 0,
                        transition: {
                            duration: 0.1,
                            ease: "easeIn",
                        },
                    },
                    enter: {
                        opacity: 1,
                        transition: {
                            duration: 0.15,
                            ease: "easeOut",
                        },
                    },
                },
            }}
        >
            <p className="inline underline no-hover:no-underline decoration-foreground/50 underline-offset-4 decoration-dotted">
                {team.name}
            </p>
        </Tooltip>
    );
}
