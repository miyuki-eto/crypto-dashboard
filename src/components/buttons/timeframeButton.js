import React from "react";

export default function TimeframeButton({ timeframe, global, setTimeframe}) {
return (
    <button
        className={(global === timeframe ? " " : "text-sm text-gray-300 dark:text-gray-700 ") + "rounded-lg"}
        onClick={() => {
            setTimeframe(timeframe)
            localStorage.setItem("timeframe", JSON.stringify(timeframe));
        }}>{timeframe}
    </button>
)
}