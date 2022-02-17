import React from "react";

export default function DenomButton({ denom, global, setDenom}) {
return (
    <button
        className={(global === denom ? " " : "text-sm text-gray-300 dark:text-gray-700 ") + " hidden rounded-lg"}
        onClick={() => {
            setDenom(denom)
            localStorage.setItem("denom", JSON.stringify(denom));
        }}>{denom}
    </button>
)
}