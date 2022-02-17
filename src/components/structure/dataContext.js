import React from 'react';
import useLocalStorage from "../functions/useLocalStorage";
import {defaultColdData} from "../functions/defaults";

export const DataContext = React.createContext();

export const DataProvider = ({  children }) => {
    const [data, setData] = useLocalStorage('user-data',defaultColdData);

    return (
        <DataContext.Provider value={[ data, setData ]}>
            {children}
        </DataContext.Provider>
    );
};