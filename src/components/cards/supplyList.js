import React from "react";
import {numberWithCommas} from "../functions/format";

export default function SupplyList({ data }) {

    return (
        <div className="flex flex-col gap-2 px-2 py-2 dark:border-gray-700 rounded w-64">

            <div className="flex flex-row gap-1 justify-between items-center">
                <p>max supply: </p>
                <p className="">{numberWithCommas(Math.ceil(data.market_data.max_supply))}</p>
            </div>
            <div className="flex flex-row gap-1 justify-between">
                <p>total supply: </p>
                <p className="">{numberWithCommas(Math.ceil(data.market_data.total_supply))}</p>
            </div>
            <div className="flex flex-row gap-1 justify-between w-full">
                <p>circulating supply: </p>
                <p className="">{numberWithCommas(Math.ceil(data.market_data.circulating_supply))}</p>
            </div>
            <div className="flex flex-row gap-1 justify-between items-center">
                <p>twitter: </p>
                <a href={"https://twitter.com/" + data.links.twitter_screen_name} target="_blank"
                   rel="noreferrer"
                   className="text-sm">@{data.links.twitter_screen_name}</a>
            </div>
        </div>
    )
}