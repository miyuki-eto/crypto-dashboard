import React from "react";

import { HiOutlineTrash} from "react-icons/hi";

export default function RemoveIndexButton({ index, callback}) {
return (
    <button
        className={"flex flex-row text-red-500 text-lg gap-2 rounded-full border-gray-500 items-center px-1 pl-4"}
        onClick={() => {
            callback(index)
            // localStorage.setItem(value, JSON.stringify(value));
        }}><HiOutlineTrash
        // onClick={() => addWatchlist(current)}
        className={" text-xl cursor-pointer"}
    />
        delete index
    </button>
)
}