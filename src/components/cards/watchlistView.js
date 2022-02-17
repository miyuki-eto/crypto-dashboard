import React, {useContext} from 'react';
import {DataContext} from "../structure/dataContext";
import {DataContextHot} from "../structure/dataContextHot";
import WatchlistCard from "./watchlistCard";

export default function WatchlistView({loading}) {
    const [data, setData] = useContext(DataContext)
    const [dataHot, setDataHot] = useContext(DataContextHot)

    return (
        <div className={((data.showWatchlist) ? "" : "hidden") + " w-full"}>

            <div
                className={"grid grid-cols-3 w-full h-full gap-4 items-stretch"}>
                {data.watchlist.map((project, index) => (
                    <div
                        key={index}
                        className={"w-full h-full"}
                        // onClick={setCurrent(project)}
                    >
                        <button
                            onClick={() => {
                                setData({...data, searchResult: project})
                            }}
                            className="std-text std-card items-center text-center w-full text-lg pt-2"
                        >
                            <WatchlistCard
                                loading={loading}
                                data={dataHot.tokenData[project]}
                                chartData={dataHot.tokenPriceData[project]}
                            />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
