import React, {useEffect, useState} from "react";
import {formatCurrency} from "../functions/format";
import EChart from "../charts/eChart";
import {splitPriceData} from "../functions/api";


export default function WatchlistCard({loading, data, chartData}) {
    const [chart, setChart] = useState([])

    useEffect(() => {
        setChart(splitPriceData(chartData))
    }, [chartData])

    const chart_options = {
        color: [
            '#e8c2ca',
            'rgba(199,144,186,0.36)',
            '#509a9a',
            '#d48265',
            '#91c7ae',
            '#e8c2ca',
            '#ca8622',
            '#bda29a',
            '#6e7074',
            '#546570',
            '#21dff6'
        ],
        grid: {top: 0, right: 15, bottom: 0, left: 0},
        animationEasing: 'quadraticInOut',
        animationEasingUpdate: 'quadraticInOut',
        animationDuration: 2000,
        xAxis: {
            type: "category",
            data: chart,
            show: false
        },
        yAxis: [
            {
                name: "price",
                type: "value",
                scale: true,
                splitLine: {
                    show: false
                },
                show: false
            }
        ],
        series: [
            {
                data: chart,
                name: "price",
                type: "line",
                smooth: true,
                yAxisIndex: 0,
                symbolSize: 0,
                lineStyle: {
                    width: 1
                }
            }]
    };

    return (
        <div
            className="items-center text-center justify-center content-center w-full">
            <div
                className={(loading ? " hidden " : "  ") + "flex flex-col gap-2 justify-center text-center items-center"}>
                <EChart
                    options={chart_options}
                    height={'125px'}
                />
            </div>
            <div className={(loading ? " " : " hidden ") + "w-72 mx-auto my-auto h-full items-center"}>
                <p className={"h-full my-auto h-[125px] content-center items-center"}>loading...</p>
            </div>
            <div className={"flex flex-row gap-3 text-center justify-center content-center items-center mt-1 w-full"}>
                <img src={data.image} alt="logo" className="w-6"/>
                <p className={"text-xl"}>{data.symbol}</p>
            </div>

            <div
                className="flex flex-row gap-2 text-sm mx-2 px-2 items-center text-center justify-center content-center mb-1 w-full">
                <p className="text-xl">{formatCurrency(data.current_price)}</p>
                <p className={data.price_change_percentage_24h != null ? (data.price_change_percentage_24h > 0 ? " text-green-500 " : " text-red-500 ") + " " : '-'}>
                    {data.price_change_percentage_24h != null ? data.price_change_percentage_24h.toFixed(2) + "%" : '-'}
                </p>
            </div>

        </div>
    );
}