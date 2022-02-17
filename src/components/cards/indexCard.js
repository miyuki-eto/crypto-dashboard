import React, {useState, useEffect, useContext} from 'react';
import {currencyFormatZero, formatCurrency} from "../functions/format";
import EChart from "../charts/eChart";
// import {ReactSearchAutocomplete} from "react-search-autocomplete";
import {ThemeContext} from "../structure/themeContext";
// import Select from 'react-dropdown-select';
// import GlobalButton from "./globalButton";
import AddButton from "../buttons/addButton";
import IndexMethodButton from "../buttons/indexMethodButton";
// import RemoveButton from "./removeButton";
import {
    getCurrentData,
    getEqualData,
    getIndexTokenData,
    getIndexTokenPriceData,
    getPriceData,
    getTokenList
} from "../functions/api";
import ChartTableButton from "../buttons/chartTableButton";
import IndexTableRow from "./indexTableRow";
// import UpdateButton from "./updateButton";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
// import {methodMap} from "./defaults/defaults";
import RemoveIndexButton from "../buttons/removeIndexButton";
import {DataContext} from "../structure/dataContext";
import {DataContextHot} from "../structure/dataContextHot";

export default function IndexCard({ loading, index }) {
    const [data, setData] = useContext(DataContext)
    const [dataHot, setDataHot] = useContext(DataContextHot)

    const [expand, setExpand] = useState(false);
    const [tableChart, setTableChart] = useState(false);
    const [tempName, setTempName] = useState(index);
    // const [indexMethod, setIndexMethod] = useState(globalMethod);
    // const [indexMethodName, setIndexMethodName] = useState('global');
    const [global, setGlobal] = useState(true);
    const [equal, setEqual] = useState(false);
    const [manual, setManual] = useState(false);
    const [cap, setCap] = useState(false);
    const [vol, setVol] = useState(false);

    const denoms = ['global', 'equal', 'manual', 'cap', 'inv. vol'];

    useEffect(() => {
        setTempName(index);
        // setExpand(false);
    }, [index])

    function setMethod(value) {
        if (value === 'global') {
            if (global === true && equal === false && manual === false && cap === false && vol === false) {
                setGlobal(true)
            } else {
                setGlobal(!global);
            }
        } else if (value === 'equal') {
            if (global === false && equal === true && manual === false && cap === false && vol === false) {
                setGlobal(true)
                setEqual(!equal);
            } else {
                setEqual(!equal);
            }
        } else if (value === 'manual') {
            if (global === false && equal === false && manual === true && cap === false && vol === false) {
                setGlobal(true)
                setManual(!manual);
            } else {
                setManual(!manual);
            }
        } else if (value === 'cap') {
            if (global === false && equal === false && manual === false && cap === true && vol === false) {
                setGlobal(true)
                setCap(!cap);
            } else {
                setCap(!cap);
            }
        } else if (value === 'inv. vol') {
            if (global === false && equal === false && manual === false && cap === false && vol === true) {
                setGlobal(true)
                setVol(!vol);
            } else {
                setVol(!vol);
            }
        }
    }

    function setSeries(global, equal, manual, cap, vol) {
        // console.log(global)
        let series = [];
        if (equal || global === 'equal') {
            series.push({
                data: data.indexes[index].chartData.equal[1],
                name: "equal",
                type: "line",
                smooth: true,
                yAxisIndex: 0,
                symbolSize: 0,
                lineStyle: {
                    width: 1
                }
            })
        }
        if (manual || global === 'manual') {
            series.push({
                data: data.indexes[index].chartData.manual[1],
                name: "manual",
                type: "line",
                smooth: true,
                yAxisIndex: 0,
                symbolSize: 0,
                lineStyle: {
                    width: 1
                }
            })
        }
        if (cap || global === 'cap') {
            series.push({
                data: data.indexes[index].chartData.cap[1],
                name: "market cap",
                type: "line",
                smooth: true,
                yAxisIndex: 0,
                symbolSize: 0,
                lineStyle: {
                    width: 1
                }
            })
        }
        if (vol || global === 'inv. vol.') {
            series.push({
                data: data.indexes[index].chartData.vol[1],
                name: "inv vol",
                type: "line",
                smooth: true,
                yAxisIndex: 0,
                symbolSize: 0,
                lineStyle: {
                    width: 1
                }
            })
        }


        return series
    }


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
        grid: {top: 0, right: 55, bottom: expand ? 20 : 0, left: 0},
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                animation: false,
                label: {
                    backgroundColor: '#505765'
                }
            },
            // formatter: '{a0}: ${c0} <br /> {a1}: ${c1} <br /> {a2}: ${c2}',
            // formatter: function (params) {
            //
            //     return `${params.seriesName}<br />
            //   ${params.name}: ${params.data.price} (${params.data.market_cap}%)<br />
            //   ${params.data.tvl}`;
            // }
        },
        animationEasing: 'quadraticInOut',
        animationEasingUpdate: 'quadraticInOut',
        animationDuration: 2000,
        xAxis: {
            show: expand,
            type: "time",
            data: data.indexes[index].chartData.equal[0],
            axisLabel: {
                formatter: '{MM}-{dd}'
            }
        },
        yAxis: [
            {
                show: expand,
                name: "price",
                type: "value",
                scale: true,
                splitLine: {
                    show: false
                },
                position: "right",
                axisLabel: {
                    formatter: function (value, index) {
                        if (data.denomination === 'usd') {
                            return '$' + value
                        } else if (data.denomination === 'eth') {
                            return value + " Ξ"
                        } else if (data.denomination === 'btc') {
                            return value + " btc"
                        }
                    },
                    show: true,
                    position: 'inside'
                }
            }
        ],
        series: setSeries(data.globalMethod, equal, manual, cap, vol)
    };

    const {theme} = React.useContext(ThemeContext);
    const colorSearchBg = (theme === 'light') ? '#ffffff' : '#161b22';
    const colorSearchText = (theme === 'light') ? '#757575' : '#e0e0e0';
    const colorSearchBorder = (theme === 'light') ? '#f5f5f5' : '#424242';

    const handleSubmit = (e) => {

        e.preventDefault();

        // renameCallback(tempName, name)
        console.log(index)
        console.log(tempName)

    }

    function addCallback(item, check, index) {
        if (check) {
            console.log(`[STATE] add ${item.toUpperCase()} to ${index.toUpperCase()}`)

            // setIndexes({
            //     ...indexes, [index]: {
            //         ...indexes[index],
            //         assets: {
            //             ...indexes[index].assets,
            //             [item]: defaultIndexAssetData
            //         },
            //
            //     },
            // })
            // if (!Object.keys(tokenData).includes(item)) {
            //     setTokenData({
            //         ...tokenData, [item]: defaultTokenInfo,
            //     })
            // }
        }
        // setWeight(item)
        // console.log(item)
    }

    // function addIndex() {
    //     const newIndexName = "new index"
    //     console.log('[STATE] add new index')
    //     setIndexes({
    //         ...indexes, [newIndexName]: defaultIndexEmpty
    //     })
    //     setIndexChartData({
    //         ...indexChartData, [newIndexName]: {
    //             equal: defaultMethodData
    //         }
    //     })
    //
    // }

    function removeIndex(indexName) {
        console.log(`[STATE] remove index - ${indexName.toUpperCase()}`)
        // let newObjState = Object.assign({}, indexes)
        // delete newObjState[indexName]
        // setIndexes(newObjState);
        //
        // let newObjStateChart = Object.assign({}, indexChartData)
        //
        // delete newObjStateChart[indexName]
        // setIndexChartData(newObjStateChart);

        // const newIndexes = {};
        // indexNames.forEach((x, i) => {
        //     if (x !== indexName) {
        //         newIndexes[x] = indexes[x]
        //     }
        // })
        // setIndexes(newIndexes);
        // const newChart = {};
        // Object.keys(indexChartData).forEach((x, i) => {
        //     if (x !== indexName) {
        //         newChart[x] = indexChartData[x]
        //     }
        // })
        // setIndexChartData(newChart);

    }




    // function renameIndex(newName, oldName) {
    //     console.log(`[STATE] rename ${oldName.toUpperCase()} to ${newName.toUpperCase()}`)
    //     console.log(oldName)
    //     console.log(newName)
    //     const replaces = {[oldName]: newName}
    //     const newIndexes = renameProps (replaces, indexes)
    //     const newChart = renameProps (replaces, indexChartData)
    //
    //     setIndexes(newIndexes)
    //     setIndexChartData(newChart)
    //
    // }

    const fromEntries = entries =>
        entries.reduce ((o, [key, value]) => ({ ...o, [key]: value }), {})

    const renameProps = (replaces, obj) =>
        fromEntries (
            Object.entries (obj)
                .map (([key, value]) => [
                    replaces.hasOwnProperty (key) ? replaces[key] : key,
                    value
                ])
        )

    return (
        <div
            className={"flex flex-col p-4 gap-4 std-text std-card items-center text-center justify-center content-center mx-auto w-auto"}>
            <div className={"flex flex-row gap-2 w-full justify-center"}>
                <div className={"flex flex-col gap-2 justify-start items-center"}>
                    <div className={"flex flex-row gap-1 pr-4 items-center"}>
                        <button
                            onClick={() => {
                                setExpand(!expand)
                            }}>
                            <MdKeyboardArrowRight className={(expand ? "hidden " : "") + "text-3xl"}/>
                            <MdKeyboardArrowDown className={(expand ? "" : "hidden ") + "text-3xl"}/>
                        </button>


                        <div
                            className="flex flex-row gap-4 items-center justify-start px-4 text-left">
                            <form
                                onSubmit={handleSubmit}
                                className={"flex flex-row gap-1 "}>
                                <input
                                    className={"text-gray-600 dark:text-gray-300 bg-white dark:bg-custom-gray-a text-2xl w-48 rounded-full px-2"}
                                    onChange={(e) => setTempName(e.target.value)}
                                    value={tempName}>
                                </input>
                                <button type='submit'>
                                    <AiOutlineCheckCircle
                                        className={((index === tempName) ? "hidden " : "text-green-500 dark:text-green-500 ") + "text-2xl "}/>
                                </button>
                            </form>
                            {/*<div*/}
                            {/*    // contentEditable="false"*/}
                            {/*    // onKeyDown={(e) => e.key === 'Enter' && renameCallback(e.currentTarget.textContent, name)}*/}
                            {/*    className="text-3xl w-36 rounded-full px-2 py-1"*/}
                            {/*>*/}
                            {/*    {name}*/}
                            {/*</div>*/}
                            {/*<button*/}
                            {/*    onClick={() => {*/}
                            {/*        editable()*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    <MdKeyboardArrowDown className={"text-2xl"}*/}
                            {/*    />*/}
                            {/*</button>*/}
                            {/*<button*/}
                            {/*    onClick={() => {*/}
                            {/*        editable()*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    <MdKeyboardArrowDown className={"text-2xl"}*/}
                            {/*    />*/}
                            {/*</button>*/}

                            {/*<p className="text-3xl">{data.unit}</p>*/}
                            <div className="text-2xl ml-12">{formatCurrency(data.price)}</div>

                        </div>
                        <div className={"flex flex-row gap-2  items-center justify-start"}>
                            <IndexMethodButton value={'global'} check={global} callback={setMethod}/>
                            <IndexMethodButton value={'equal'} check={equal} callback={setMethod}/>
                            <IndexMethodButton value={'manual'} check={manual} callback={setMethod}/>
                            <IndexMethodButton value={'cap'} check={cap} callback={setMethod}/>
                            <IndexMethodButton value={'inv. vol'} check={vol} callback={setMethod}/>

                        </div>
                    </div>


                    <div
                        className={(expand ? " hidden " : "  ") + "flex flex-row gap-2 w-full px-4 py-2 justify-start items-center"}>
                        {Object.keys(data.indexes[index].assets).map((asset, i) => (
                            <img
                                key={i}
                                src={dataHot.tokenData[asset].image}
                                alt="ㅤ"
                                className="w-8"
                                title={dataHot.tokenData[asset].name.toLowerCase()}
                            />
                        ))}
                    </div>


                    <div className={(expand ? " " : " hidden ") + "flex flex-row justify-center w-full mt-4 h-full"}>
                        <div className={"flex flex-col gap-2 justify-between h-full w-full"}>
                            <div className={"flex flex-row gap-1 justify-between w-full"}>
                                <div className={"flex flex-row gap-3 px-2"}>
                                    <ChartTableButton check={tableChart} callback={setTableChart}/>
                                </div>
                                <div className={"flex flex-row gap-3 px-2"}>

                                    <AddButton value={data.searchResult} check={Object.keys(data.indexes[index].assets)}
                                               callback={addCallback}
                                               index={index} name={dataHot.searchData.name}/>
                                    {/*<RemoveButton value={current} check={Object.keys(data.assets)}*/}
                                    {/*              callback={removeCallback} index={name}/>*/}
                                </div>
                            </div>
                            <div className={"flex flex-col justify-start h-full"}>
                                <div
                                    className={(tableChart ? "hidden " : "  ") + "justify-self-start rounded-2xl border border-gray-300 dark:border-gray-700 p-2"}>
                                    <table>
                                        <thead>
                                        <tr className={"px-1"}>
                                            <th className={"px-2"}>ㅤ</th>
                                            <th className={"px-2"}>token</th>
                                            <th className={"px-2"}>symbol</th>
                                            <th className={"px-2"}>price</th>
                                            <th className={"px-2"}>market cap</th>
                                            {/*<th className={"px-2"}>manual</th>*/}
                                            {/*<th className={"px-2"}>market cap</th>*/}
                                            {/*<th className={"px-2"}>inv. vol.</th>*/}
                                            <th className={"px-2"}>manual</th>
                                            <th className={"px-2"}>ㅤ</th>
                                            <th className={"px-2"}>ㅤ</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {Object.keys(data.indexes[index].assets).map((asset, i) => (
                                            <IndexTableRow
                                                index={index}
                                                asset={asset}
                                            />
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className={(tableChart ? "  " : " hidden ") + "w-full h-full"}>
                                <p>chart</p>
                            </div>
                            <div className={"flex flex-row w-full justify-start"}>
                                <RemoveIndexButton index={index} callback={removeIndex}/>
                            </div>

                        </div>
                    </div>
                </div>

                <div className={(loading ? " " : " hidden ") + "w-96 h-[500] mx-auto my-auto"}>
                    <p className={"h-full"}>loading...</p>
                </div>
                <div className={(loading ? " hidden " : "  ") + "w-96 px-2"}>
                    <EChart
                        options={chart_options}
                        height={expand ? '400px' : '100px'}
                    />
                </div>
            </div>

        </div>
    );
}
