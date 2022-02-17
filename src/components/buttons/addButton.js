import React from "react";

import { AiOutlinePlus } from "react-icons/ai";

export default function AddButton({ value, check, callback, index, name}) {
return (
    <button
        className={(check.includes(value) ? " hidden " : " text-green-500 dark:text-green-300 ") + "flex flex-row text-sm rounded-full border-gray-500 items-center px-1 h-full my-auto mx-auto"}
        onClick={() => {
            callback(value, check, index)
            // localStorage.setItem(value, JSON.stringify(value));
        }}>
        {/*{(check.includes(value)) ? 'update' : 'add'}*/}
        {/*<IoReload*/}
        {/*    // onClick={() => addWatchlist(current)}*/}
        {/*    className={"text-blue-500 text-xl cursor-pointer h-full items-center justify-center my-auto mx-auto"}*/}
        {/*/>*/}
        {/*<AiOutlinePlus*/}
        {/*    // onClick={() => addWatchlist(current)}*/}
        {/*    className={(check.includes(value) ? " hidden " : "  ") + "text-green-500 text-xl cursor-pointer"}*/}
        {/*/>*/}
        <AiOutlinePlus
            // onClick={() => addWatchlist(current)}
            className={"text-xl mr-1"}
        />
            add { name.toLowerCase() }
    </button>
)
}