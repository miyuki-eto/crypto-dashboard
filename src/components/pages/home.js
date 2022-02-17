import React, {useContext, useEffect, useState} from 'react';
import {DataContext} from "../structure/dataContext";
import {DataContextHot} from "../structure/dataContextHot";
import {
    getCurrentData,
    getIndexTokenData,
    getIndexTokenPriceData,
    getIndexTokenPrices,
    getPriceData,
    getTokenList,
    splitPriceData
} from "../functions/api";
import {useDidMountEffect} from "../functions/useDidMountEffect";
import WatchlistView from "../cards/watchlistView";
import IndexSearch from "../cards/indexSearch";
import IndexView from "../cards/indexView";

export default function Home() {
    const [data, setData] = useContext(DataContext)
    const [dataHot, setDataHot] = useContext(DataContextHot)
    const [loadingSearch, setLoadingSearch] = useState(true);
    const [loadingIndex, setLoadingIndex] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            console.log("[EFFECT] initial mount")
            setLoadingSearch(true);
            setLoadingIndex(true);

            const newDataHot = dataHot;
            newDataHot.searchNames = await getTokenList()
            newDataHot.searchData = await getCurrentData(data.searchResult)
            newDataHot.tokenData = await getIndexTokenData(data.indexTokenNames)
            const chartDataIn = await getPriceData(data.timeframe, data.searchResult, data.denomination);
            newDataHot.searchPriceData = await splitPriceData(chartDataIn)
            const priceDataIn = await getIndexTokenPrices(data.indexTokenNames, data.timeframe, data.denomination);
            newDataHot.tokenPriceData = priceDataIn
            newDataHot.indexCalcData = await getIndexTokenPriceData(data.indexes, priceDataIn)
            setDataHot(newDataHot)

            setLoadingSearch(false);
            setLoadingIndex(false);
        }
        fetchData();
    }, [])

    useDidMountEffect(() => {
        const updateCurrent = async () => {
            console.log("[EFFECT] update current")
            setLoadingSearch(true);

            const newDataHot = dataHot;
            newDataHot.searchData = await getCurrentData(data.searchResult)
            const chartDataIn = await getPriceData(data.timeframe, data.searchResult, data.denomination);
            newDataHot.searchPriceData = await splitPriceData(chartDataIn)
            setDataHot(newDataHot)

            setLoadingSearch(false);
        }
        updateCurrent();
    }, [data.searchResult])

    useDidMountEffect(() => {
        const updateTimeframe = async () => {
            console.log("[EFFECT] update timeframe")
            setLoadingSearch(true);
            setLoadingIndex(true);

            const newDataHot = dataHot;
            const chartDataIn = await getPriceData(data.timeframe, data.searchResult, data.denomination);
            newDataHot.searchPriceData = await splitPriceData(chartDataIn)
            const priceDataIn = await getIndexTokenPrices(data.indexTokenNames, data.timeframe, data.denomination);
            newDataHot.tokenPriceData = priceDataIn
            newDataHot.indexCalcData = await getIndexTokenPriceData(data.indexes, priceDataIn)
            setDataHot(newDataHot)

            setLoadingSearch(false);
            setLoadingIndex(false);
        }
        updateTimeframe();
    }, [data.timeframe, data.denomination])

    useDidMountEffect(() => {
        const updateTimeframe = async () => {
            console.log("[EFFECT] update index tokens")
            setLoadingIndex(true);

            const newDataHot = dataHot;
            newDataHot.tokenData = await getIndexTokenData(data.indexTokenNames)
            const priceDataIn = await getIndexTokenPrices(data.indexTokenNames, data.timeframe, data.denomination);
            newDataHot.tokenPriceData = priceDataIn
            newDataHot.indexCalcData = await getIndexTokenPriceData(data.indexes, priceDataIn)
            setDataHot(newDataHot)

            setLoadingIndex(false);
        }
        updateTimeframe();
    }, [data.indexTokenNames])

    return (
        <div className="flex flex-col text-center mx-auto my-auto h-full p-4 gap-4">
            <IndexSearch loading={loadingSearch}/>
            <WatchlistView loading={loadingIndex}/>
            <IndexView loading={loadingIndex}/>
        </div>
    );
}
