import React, {useContext} from 'react';
import {formatCurrency} from "../functions/format";
import EChart from "../charts/eChart";
import {ReactSearchAutocomplete} from "react-search-autocomplete";
import {ThemeContext} from "../structure/themeContext";
// import Select from 'react-dropdown-select';
import GlobalButton from "../buttons/globalButton";
// import {DropdownPage} from "./dropdown";
import TokenPrice from "./tokenPrice";
import SupplyList from "./supplyList";
import MarketCapList from "./marketCapList";
import {denominations, methods, timeframes} from "../functions/defaults";
import {DataContext} from "../structure/dataContext";
import {DataContextHot} from "../structure/dataContextHot";

export default function IndexSearch({ loading }) {
    const [data, setData] = useContext(DataContext)
    const [dataHot, setDataHot] = useContext(DataContextHot)

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
            data: dataHot.searchPriceData,
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
                data: dataHot.searchPriceData,
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

    const {theme} = React.useContext(ThemeContext);
    const colorSearchBg = (theme === 'light') ? '#ffffff' : '#161b22';
    const colorSearchText = (theme === 'light') ? '#757575' : '#e0e0e0';
    const colorSearchBorder = (theme === 'light') ? '#eeeeee' : '#424242';

    const handleOnSelect = (item) => {
        setData({...data, searchResult: item.id})
    }

    const setTimeframe = (item) => {
        setData({...data, timeframe: item})
    }

    const setDenomination = (item) => {
        setData({...data, denomination: item})
    }

    const setMethod = (item) => {
        setData({...data, globalMethod: item})
    }


    return (
        <div className={((data.showSearch) ? "" : "hidden") + " flex flex-col gap-2 justify-between items-center std-text std-card"}>
            <div
                className="flex flex-row p-4 justify-center items-center">
                <TokenPrice data={dataHot.searchData}/>
                <SupplyList data={dataHot.searchData}/>
                <MarketCapList data={dataHot.searchData}/>
                <div className={(loading ? " " : " hidden ") + "w-72 mx-auto my-auto h-full items-center"}>
                    <p className={"h-[175px] my-auto items-center content-center justify-items-center text-center"}>loading...</p>
                </div>
                <div
                    className={(loading ? " hidden " : "  ") + "flex flex-col gap-2 w-72 justify-center text-center items-center ml-4"}>

                    <EChart
                        options={chart_options}
                        height={'175px'}
                    />

                </div>

            </div>

            <div className={"flex flex-row gap-4 justify-between items-start px-4"}>

                <div className={"flex flex-col gap-2 justify-center"}>
                    <div className={"flex flex-row gap-2 justify-between items-center"}>
                        {/*<p className="text-2xl">token</p>*/}
                        <div style={{width: 230}} className={"w-full justify-center items-center"}>
                            <ReactSearchAutocomplete
                                items={dataHot.searchNames}
                                maxResults={6}
                                onSelect={handleOnSelect}
                                fuseOptions={
                                    {
                                        shouldSort: true,
                                        threshold: 0.7,
                                        location: 0,
                                        distance: 100,
                                        maxPatternLength: 32,
                                        minMatchCharLength: 2,
                                        keys: [
                                            "id",
                                            "symbol"
                                        ]
                                    }
                                }
                                styling={
                                    {
                                        height: "40px",
                                        border: "1px solid " + colorSearchBorder,
                                        borderRadius: "24px",
                                        backgroundColor: colorSearchBg,
                                        boxShadow: "rgba(32, 33, 36, 0.28) 0px 0px 0px 0px",
                                        hoverBackgroundColor: "#eee",
                                        color: colorSearchText,
                                        fontSize: "16px",
                                        fontFamily: "Segoe UI",
                                        iconColor: "grey",
                                        lineColor: colorSearchBorder,
                                        placeholderColor: "grey",
                                        clearIconMargin: '3px 14px 0 0',
                                        searchIconMargin: '0 0 0 16px'
                                    }
                                }
                            />
                        </div>
                        <div className={"flex flex-row gap-1 items-center justify-center px-8"}>
                            {methods.map((x, i) => (
                                <GlobalButton value={x} check={data.globalMethod} callback={setMethod}/>
                            ))}
                        </div>
                        <div className={"flex flex-row gap-1 items-center justify-center px-8"}>
                            {timeframes.map((x, i) => (
                                <GlobalButton value={x} check={data.timeframe} callback={setTimeframe}/>
                            ))}
                        </div>
                        <div className={"flex flex-row gap-1 items-center justify-center px-8"}>
                            {denominations.map((x, i) => (
                                <GlobalButton value={x} check={data.denomination} callback={setDenomination}/>
                            ))}
                        </div>
                    </div>
                </div>



                {/*<div className={"flex flex-col gap-2 justify-center"}>*/}
                {/*    <div className={"flex flex-row gap-2 justify-between items-center content-center"}>*/}
                {/*        /!*<p className="text-2xl">new index</p>*!/*/}
                {/*        /!*<p className="text-2xl">1</p>*!/*/}
                {/*        <input*/}
                {/*            className={"text-lg w-48 px-2 text-right text-gray-600 dark:text-gray-300 bg-white dark:bg-custom-gray-a rounded-2xl border border-gray-200 dark:border-gray-800"}*/}
                {/*            type="text"*/}
                {/*            placeholder="new index name"*/}
                {/*            value={newIndexName}*/}
                {/*            onChange={e => newIndexNameCallback(e.target.value)}*/}
                {/*        />*/}

                {/*    </div>*/}
                {/*    <div className={"flex flex-row justify-end"}>*/}
                {/*        <button*/}
                {/*            className={"text-xl text-gray-600 dark:text-gray-300 rounded-full border-gray-500 px-2 py-1 items-center"}*/}
                {/*            onClick={() => {*/}
                {/*                addIndexCallback(newIndexName, indexNames)*/}
                {/*                // localStorage.setItem(value, JSON.stringify(value));*/}
                {/*            }}>add new index*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</div>*/}

            </div>

            <div className={"flex flex-col gap-2 pt-4 pb-4 pl-4 justify-center"}>


                {/*<div className={"flex flex-row gap-2 justify-between items-center"}>*/}
                {/*    <p className="text-2xl">index</p>*/}
                {/*    <Select*/}
                {/*        className={"w-30 rounded-xl"}*/}
                {/*        options={indexList}*/}
                {/*        values={indexList.id}*/}
                {/*        onChange={(value) => console.log(value)}*/}
                {/*    />*/}

                {/*</div>*/}



                {/*<DropdownPage*/}
                {/*    indexNames={indexNames}*/}
                {/*/>*/}
            </div>
        </div>
    );
}
