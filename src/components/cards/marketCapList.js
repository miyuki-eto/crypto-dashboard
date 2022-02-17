import React from "react";
import {currencyFormatZero, numberWithCommas} from "../functions/format";

export default function MarketCapList({ data }) {

    return (
        <div className="flex flex-col gap-2 px-2 py-2 dark:border-gray-700 rounded w-64">
            <div className="flex flex-row gap-1 justify-between w-full items-center">
                <p>market cap rank: </p>
                <p className="">{numberWithCommas(Math.ceil(data.market_cap_rank))}</p>
            </div>
            <div className="flex flex-row gap-1 justify-between">
                <p>market cap: </p>
                <p className="">{currencyFormatZero.format(data.market_data.market_cap.usd)}</p>
            </div>
            <div className="flex flex-row gap-1 justify-between">
                <p>fdv: </p>
                <p className="">{currencyFormatZero.format(data.market_data.fully_diluted_valuation.usd)}</p>
            </div>
            <div className="flex flex-row gap-1 justify-between items-center">
                <p>website: </p>
                {/*<p className="">{functions.links.homepage[0]}</p>*/}
                <a href={data.links.homepage[0]} target="_blank" rel="noreferrer"
                   className="text-sm">{data.links.homepage[0]}</a>
            </div>
        </div>
    )
}