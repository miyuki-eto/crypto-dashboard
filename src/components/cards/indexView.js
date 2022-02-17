import React, {useContext} from 'react';
import {DataContext} from "../structure/dataContext";
import {DataContextHot} from "../structure/dataContextHot";
import WatchlistCard from "./watchlistCard";
import IndexCard from "./indexCard";

export default function IndexView({loading}) {
    const [data, setData] = useContext(DataContext)
    const [dataHot, setDataHot] = useContext(DataContextHot)

    return (
        <div className={((data.showIndex) ? "" : "hidden") + " w-full overflow-y-scroll h-full"}>

            <div
                className={"flex flex-col w-full h-full gap-4 items-stretch"}>
                {Object.keys(data.indexes).map((index) => (
                    <IndexCard loading={loading} index={index}/>
                ))}
            </div>
        </div>
    );
}
