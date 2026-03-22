"use client";

import { useState, useEffect } from "react";

export default function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () =>  clearInterval(timer);
    }, []);

    if (!time) {
        return (
            <div className="bg-gray-900 rounded-2x1 p-6 border border-gray-800">
                <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                    Current Time
                </h2>
                <p className="text-4x1 font-bold mt-2">--:--:--</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 rounded-2x1 p-6 border border-gray-800">
            <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                Current Time
            </h2>
            <p className="text-4x1 font-bold mt-2">
                {time.toLocaleString()}
            </p>
            <p className="text-gray-400 mt-1">
                {time.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                })}
            </p>
        </div>
    );
}