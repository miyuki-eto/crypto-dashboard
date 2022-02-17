import React from "react";
import {formatCurrency} from "../functions/format";

export default function TokenPrice({data}) {

    return (
        <div className="flex flex-col gap-2 w-56 items-center">
            <div className="flex flex-row items-center gap-1 justify-center content-center text-center mr-4">
                <img src={data.image.small} alt="logo" className="w-20"/>
                <div className="flex flex-col gap-1 content-center justify-center text-center ml-2">
                    <p className="text-3xl">{data.name.toLowerCase()}</p>
                    <p className="text-xl">{data.symbol.toLowerCase()}</p>
                    <p className="text-2xl">{formatCurrency(data.market_data.current_price.usd)}</p>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-1 text-sm">
                <p className={data.market_data.price_change_percentage_24h != null ? (data.market_data.price_change_percentage_24h > 0 ? " text-green-500 " : " text-red-500 ") + " " : " "}>
                    {data.market_data.price_change_percentage_24h != null ? data.market_data.price_change_percentage_24h.toFixed(2) + " %" : '-'}
                </p>
                <p className={data.market_data.price_change_percentage_7d != null ? (data.market_data.price_change_percentage_7d > 0 ? " text-green-500 " : " text-red-500 ") + " " : " "}>
                    {data.market_data.price_change_percentage_7d != null ? data.market_data.price_change_percentage_7d.toFixed(2) + " %" : '-'}
                </p>
                <p className={data.market_data.price_change_percentage_30d != null ? (data.market_data.price_change_percentage_30d > 0 ? " text-green-500 " : " text-red-500 ") + " " : " "}>
                    {data.market_data.price_change_percentage_30d != null ? data.market_data.price_change_percentage_30d.toFixed(2) + " %" : '-'}
                </p>
                <p>24h </p>
                <p>7d </p>
                <p>30d </p>
            </div>
        </div>
    )
}