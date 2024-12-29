"use client";

import { useEffect } from "react";
import anime from "animejs";

export default function Animation() {
    let data = { pointA: 5, pointB: 10 };
    useEffect(() => {
        const tl = anime.timeline({
            easing: "easeInOutCubic",
            duration: 500,
        });
        tl.add({
            targets: "#start",
            scale: 1,
            easing: "easeInOutCubic",
        });
    }, []);
    return (
        <div className="w-screen h-screen -z-50 flex-center flex-col">
            <svg viewBox="0 0 100 100" className="w-32 scale-0" id="start">
                <rect
                    width={100}
                    height={100}
                    rx={75}
                    className="fill-primary"
                ></rect>
            </svg>
        </div>
    );
}
