"use client";

import React from "react";
import { useState, useEffect } from "react";

export type TickerTypes = (string | React.JSX.Element)[];

export default function Ticker({
    infoList,
    className,
}: {
    infoList: TickerTypes;
    className?: string;
}) {
    const [currentIndex, setIndex] = useState(0),
        duration = 5;

    const tickerList = infoList.map((info, index) => {
        if (typeof info === "string") {
            return (
                <p
                    className="animate-fade-in"
                    key={index}
                    dangerouslySetInnerHTML={{ __html: info }}
                ></p>
            );
        } else {
            return (
                <div className="animate-fade-in" key={index}>
                    {info}
                </div>
            );
        }
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % infoList.length);
        }, duration * 1000);

        return () => clearInterval(interval);
    }, [infoList]);

    return (
        <div
            className={`border-2 border-content3 p-2 px-4 rounded-lg text-sm text-center select-none ${className}`}
        >
            {tickerList[currentIndex]}
        </div>
    );
}
