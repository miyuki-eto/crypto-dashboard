import React, {useContext} from 'react';
import {DataContext} from "../structure/dataContext";

export default function Blank() {
    const [data, setData] = useContext(DataContext)

    return (
        <div className="flex flex-col text-center mx-auto my-auto h-full">
            <div className={"flex flex-row gap-4 mx-auto my-auto p-8 std-card"}>
                home
            </div>
        </div>
    );
}
