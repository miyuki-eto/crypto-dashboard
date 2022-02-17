import React from "react";

import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaChartPie } from "react-icons/fa";

export default function ChartTableButton({ check, callback }) {
return (
    <button
        className={(check ? "  " : "  ") + "text-xl rounded-full border-gray-500 items-center"}
        onClick={() => {
            // callback(value, check.includes(value), index)
                callback(!check)
            // localStorage.setItem(value, JSON.stringify(value));
        }}>
        {/*{(check.includes(value)) ? 'update' : 'add'}*/}
        <AiOutlineInfoCircle
            // onClick={() => addWatchlist(current)}
            className={(check ? "  " : " hidden ") + "fill-current text-gray-600 dark:text-gray-300 text-xl cursor-pointer"}
        />
        <FaChartPie
            // onClick={() => addWatchlist(current)}
            className={(check ? " hidden " : "  ") + "fill-current text-gray-600 dark:text-gray-300 text-xl cursor-pointer"}
        />
    </button>
)
}