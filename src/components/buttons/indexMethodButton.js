import React from "react";

export default function IndexMethodButton({ value, check, callback}) {
return (
    <button
        className={(check ? " text-sm " : "text-sm text-gray-300 dark:text-gray-700 ") + " rounded-full border-gray-500 px-2 py-1 items-center"}
        onClick={() => {
            callback(value)
            // localStorage.setItem(value, JSON.stringify(value));
        }}>{value}
    </button>
)
}