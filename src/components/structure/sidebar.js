import React, {useContext, useState} from 'react';
import Toggle from "./themeToggle";
import {Link} from "react-router-dom";
// import {routes} from "./routes";
//
// import {FiMenu} from 'react-icons/fi';
// import {addWatchlist} from "../functions/watchlist";
import {AiOutlineStar} from "react-icons/ai";
import {FiSearch} from "react-icons/fi";
import {FaLayerGroup} from "react-icons/fa";

// import {AiOutlineTwitter} from "react-icons/ai";
import {DataContext} from "./dataContext";


function Sidebar() {
    const [data, setData] = useContext(DataContext)
    const [expand] = useState(false)

    const showSearch = () => {
        setData({...data, showSearch: !data.showSearch})
    }

    const showWatchlist = () => {
        setData({...data, showWatchlist: !data.showWatchlist})
    }

    const showIndex = () => {
        setData({...data, showIndex: !data.showIndex})
    }

    return (
        <div
            className={(expand ? "w-48 " : "w-14 ") + "hidden md:flex flex-col items-center justify-between h-full"}>
            <div className="w-full p-4 flex flex-col gap-4 items-center">
                {/*<div className={(expand ? "text-left w-full " : "text-center ") + "transition duration-500 ease-in-out rounded-full p-2 "}>*/}
                {/*    <FiMenu*/}
                {/*        onClick={() => handleToggle()}*/}
                {/*        className={"text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"}*/}
                {/*    />*/}
                {/*</div>*/}
                <Link to="/">
                    <p className="mb-8 text-lg text-center text-gray-600 dark:text-gray-300">
                        (˘ω˘)
                    </p>
                </Link>
                <div className="flex flex-col space-between justify-self-start gap-4 text-gray-600 dark:text-gray-300">
                    <ul className="text-xl text-center gap-2">
                        <li className="flex flex-row rounded-lg px-2 py-2 items-center gap-2 justify-center">
                            <button
                                onClick={showSearch}>
                                <FiSearch
                                    className={((data.showSearch) ? "text-gray-600 dark:text-gray-300" : "text-gray-300 dark:text-gray-600") + "  "}
                                />
                            </button>
                        </li>
                        <li className="flex flex-row rounded-lg px-2 py-2 items-center gap-2 justify-center">
                            <button
                                onClick={showWatchlist}>
                                <AiOutlineStar
                                    className={((data.showWatchlist) ? "text-gray-600 dark:text-gray-300" : "text-gray-300 dark:text-gray-600") + " "}
                                />
                            </button>
                        </li>
                        <li className="flex flex-row rounded-lg px-2 py-2 items-center gap-2 justify-center">
                            <button
                                onClick={showIndex}>
                                <FaLayerGroup
                                    className={((data.showIndex) ? "text-gray-600 dark:text-gray-300" : "text-gray-300 dark:text-gray-600") + " "}
                                />
                            </button>
                        </li>
                    </ul>

                </div>
            </div>
            <div className={"flex flex-col gap-2 justify-center items-center"}>
                {/*<a href='https://twitter.com/miyuki_crypto' target="_blank" rel="noreferrer">*/}
                {/*    <AiOutlineTwitter className={"text-xl text-center text-gray-600 dark:text-gray-300"}/>*/}
                {/*</a>*/}
                <div className="mb-2">
                    <Toggle/>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;