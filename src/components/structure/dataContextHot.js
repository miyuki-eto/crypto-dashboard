import React, {useContext} from 'react';
import {defaultHotData} from "../functions/defaults";
export const DataContextHot = React.createContext();


export const DataProviderHot = ({  children }) => {
    const [dataHot, setDataHot] = React.useState(defaultHotData);

    return (
        <DataContextHot.Provider value={[ dataHot, setDataHot ]}>
            {children}
        </DataContextHot.Provider>
    );
};