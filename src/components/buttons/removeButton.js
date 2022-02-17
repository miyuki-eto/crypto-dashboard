import React from "react";

import { HiOutlineTrash} from "react-icons/hi";

export default function RemoveButton({ value, check, callback, index}) {
return (
    <button
        className={"text-xl rounded-full border-gray-500 items-center px-1 pl-4"}
        onClick={() => {
            callback(value, index)
            // localStorage.setItem(value, JSON.stringify(value));
        }}><HiOutlineTrash
        // onClick={() => addWatchlist(current)}
        className={"text-red-500 text-xl cursor-pointer"}
    />
    </button>
)
}