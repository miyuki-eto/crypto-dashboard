import React, {useContext, useState} from "react";

// import {IoReload, AiOutlinePlus} from "react-icons/all";
import {currencyFormatZero, formatCurrency} from "../functions/format";
// import AddButton from "./addButton";
import RemoveButton from "../buttons/removeButton";
import UpdateButton from "../buttons/updateButton";
import {DataContext} from "../structure/dataContext";
import {DataContextHot} from "../structure/dataContextHot";

export default function IndexTableRow({index, asset}) {
    const [data, setData] = useContext(DataContext)
    const [dataHot, setDataHot] = useContext(DataContextHot)
    const [weight, setWeight] = useState(1);

    function removeCallback(item, index) {
        console.log(`[STATE] remove ${item.toUpperCase()} from ${index.toUpperCase()}`)
        let newObjState = Object.assign({}, data.indexes)
        delete newObjState[index].assets[item]
        // console.log(newObjState);
        setData({...data, indexes: newObjState});

    }

    const handleOnSelect = () => {
        setData({...data, searchResult: dataHot.tokenData[asset].id})
        console.log(`[STATE] set search to ${dataHot.tokenData[asset].id.toUpperCase()}`)
    }

    function updateTokenWeight(index, item, weight) {
        if (!isNaN(weight) && dataHot.indexes[index].assets[item].manual !== weight) {
            console.log(`[STATE] update ${item.toUpperCase()} weight to ${weight} in ${index.toUpperCase()}`)
            // setIndexes({
            //     ...indexes, [index]: {
            //         ...indexes[index],
            //         assets: {...indexes[index].assets, [item]: {...indexes[index].assets[item], manual: weight}},
            //
            //     },
            // })
        } else {
            console.log("empty or unchanged weight")
        }
    }

    return (
        <tr className={"whitespace-nowrap gap-1 px-1"}>
            <td className={"px-2"}>
                <img
                    src={dataHot.tokenData[asset].image}
                    alt="ㅤ"
                    className="w-6"/>
            </td>
            <td className={"px-2"}>
                <button
                    onClick={() => {
                        handleOnSelect(asset)
                    }}
                    className=""
                >
                    {dataHot.tokenData[asset].name.toLowerCase()}
                </button>
            </td>
            <td className={"px-2"}>{dataHot.tokenData[asset].symbol.toLowerCase()}</td>
            <td className={"px-2 text-end"}>{formatCurrency(dataHot.tokenData[asset].current_price)}</td>
            <td className={"px-2 text-end"}>{currencyFormatZero.format(dataHot.tokenData[asset].market_cap)}</td>
            {/*<td className={"px-2"}>{data.assets[asset].manual}</td>*/}
            {/*<td className={"px-2"}>{data.assets[asset].cap}</td>*/}
            {/*<td className={"px-2"}>{data.assets[asset].vol}</td>*/}
            <input
                className={"w-20 px-2 text-center text-gray-600 dark:text-gray-300 bg-white dark:bg-custom-gray-a rounded-2xl border border-gray-200 dark:border-gray-800"}
                type="text"
                pattern="[0-9]*"
                value={weight}
                onChange={e => setWeight(e.target.value)}
            />
            <UpdateButton
                value={asset}
                callback={updateTokenWeight}
                index={index}
                weight={weight}
            />
            <RemoveButton
                value={asset}
                callback={removeCallback}
                index={index}
            />
        </tr>
    )
}