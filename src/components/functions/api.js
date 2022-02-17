import axios from "axios";
import axiosThrottle from "axios-request-throttle";

axiosThrottle.use(axios, {requestsPerSecond: 10});

export async function getTokenList() {
    console.log('[API] get token list')
    const data = [];
    await axios.get("https://api.coingecko.com/api/v3/coins/list").then(response => {
        data.push(response.data)
    })
    return data[0];
}

export function splitPriceData(data) {
    const priceList = [];

    data.forEach((x) => {
        priceList.push(x.price);
    })
    return priceList
}

export async function getWatchlistData(watchlist) {
    let text = watchlist.join("%2C%20");
    const data = [];
    await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=" + text + "&order=market_cap_desc&per_page=100&page=1&sparkline=true").then(x => {
        // console.log(x.functions)
        data.push(x.data)
    })
    return data[0];
}

export async function getCurrentData(current) {
    console.log('[API] get search result data')
    const data = [];
    await axios.get("https://api.coingecko.com/api/v3/coins/" + current).then(x => {
        if (x.data.market_data.circulating_supply === null) {
            x.data.market_data.circulating_supply = 0;
        }
        if (x.data.market_data.max_supply === null) {
            x.data.market_data.max_supply = 0;
        }
        if (x.data.market_data.fully_diluted_valuation === null) {
            x.data.market_data.fully_diluted_valuation = 0;
        }
        data.push(x.data)
    })
    return data[0];
}

async function getLlamaList() {
    const data = [];
    await axios.get("https://api.llama.fi/protocols").then(x => {
        // console.log(x)
        data.push(x.data)
    })
    return data[0];
}

async function getChainList() {
    const data = [];
    await axios.get("https://api.llama.fi/chains").then(x => {
        // console.log(x.functions)
        data.push(x.data)
    })
    return data[0];
}

async function getLlamaId(tokens) {
    const llamaListIn = await getLlamaList();
    const chainListIn = await getChainList();
    const a = {};
    await tokens.forEach((x) => {
        const z = {};
        z["id"] = "-";
        z["project"] = "-";
        llamaListIn.forEach((y) => {
            if (y.gecko_id === x.id) {
                z["id"] = y.slug;
                z["project"] = "protocol";
            }
        })
        chainListIn.forEach((y) => {
            if (y.gecko_id === x.id) {
                z["id"] = y.name;
                z["project"] = "chain";
            }
        })
        a[x.id] = z
    });
    // console.log(a)
    return a;
}


export async function getPriceData(timeframe, current, denom) {
    console.log('[API] get search result price data')
    let data = [{
        prices: [0, 0],
        market_caps: [[0, 0], [0, 0]]
    }];
    const now = Math.floor(Date.now() / 1000);
    const from = timeCalc(now, timeframe);
    await axios.get("https://api.coingecko.com/api/v3/coins/" + current + "/market_chart/range?vs_currency=" + denom +"&from=" + from + "&to=" + now).then(x => {
        data.push(x.data)
        data = [x.data]
    })
    const formattedData = [];
    data[0].prices.forEach((x, i) => {
        const entry = {};
        entry.timestamp = x[0]
        entry.price = x[1]
        data[0].market_caps.forEach((y, h) => {
            if (y[0] === x[0]) {
                entry.market_cap = y[1]
            }
        })
        formattedData.push(entry)
    })

    return formattedData;
}

async function getLlamaData(filter, llamaId, geckoData) {
    const data = [];
    // console.log(llamaId)
    // console.log(filter)
    const llama_id = llamaId["id"];
    const llama_type = llamaId["project"];
    if (llama_type === "protocol") {
        await axios.get("https://api.llama.fi/protocol/" + llama_id).then(x => {
            // console.log(x.functions)
            console.log(x.data)
            x.data.tvl.forEach((y) => {
                if (y["date"] >= filter) {
                    data.push(y)
                }
            })
        })
    } else if (llama_type === "chain") {
        await axios.get("https://api.llama.fi/charts/" + llama_id).then(x => {
            // console.log(x.functions)
            x.data.forEach((y) => {
                if (y["date"] >= filter) {
                    data.push(y)
                }
            })
        })
    } else {
        geckoData.forEach((x) => {
            data.push('-')
        })
    }
    // console.log(functions[0])
    const newData = [];
    data.forEach((x) => {
        // console.log(x)
        const y = {};
        y["timestamp"] = parseInt(x.date * 1000);
        y["totalLiquidityUSD"] = x.totalLiquidityUSD;
        newData.push(y)
    })
    // console.log(newData)
    return newData;
}

function timeCalc(now, span) {
    let newValue = 0;
    const hour = 60 * 60;
    const day = 24 * hour;
    if (span === "24h") {
        newValue = now - (24 * hour)
    } else if (span === "7d") {
        newValue = now - (7 * day)
    } else if (span === "30d") {
        newValue = now - (30 * day)
    } else if (span === "90d") {
        newValue = now - (90 * day)
    } else if (span === "365d") {
        newValue = now - (365 * day)
    } else {
        newValue = 1367330400
    }
    return newValue
}

async function mergeData(geckoIn, llamaIn) {
    // console.log(geckoIn)
    const newArr = [];
    await geckoIn.forEach((x, i) => {
        const z = {
            timestamp: x.timestamp,
            price: x.price,
            market_cap: x.market_cap,
            totalLiquidityUSD: '-'
        };
        llamaIn.forEach((y, j) => {
            if (y.timestamp < x.timestamp && y.timestamp >= geckoIn[i - 1].timestamp) {
                // console.log(y)
                z["totalLiquidityUSD"] = y.totalLiquidityUSD
            }
        })
        newArr.push(z)
    });
    // console.log(newArr)
    return newArr;
}

async function splitData(data) {
    const timeList = [];
    const priceList = [];
    const capList = [];
    const tvlList = [];

    await data.forEach((x) => {
        const time = x.timestamp;
        priceList.push([time, x.price]);
        capList.push([time, x.market_cap]);
        tvlList.push([time, x.totalLiquidityUSD]);

    })
    return [timeList, priceList, capList, tvlList]
}

export async function getChartData(tokens, current, timeframe) {
    const llamaId = await getLlamaId(tokens)
    const priceDataIn = await getPriceData(timeframe, current);
    if (priceDataIn.length === 0) {
        return [[], [], [], []]
    } else {
        const llamaDataIn = await getLlamaData(Math.ceil(priceDataIn[0]["timestamp"] / 1000), llamaId[current], priceDataIn);
        const mergedIn = await mergeData(priceDataIn, llamaDataIn);
        return await splitData(mergedIn);
    }
}

export async function getIndexTokenData(indexTokens) {
    console.log('[API] get index token data')
    let text = indexTokens.join("%2C%20");
    const data = {};
    await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=" + text + "&order=market_cap_desc&per_page=100&page=1&sparkline=true").then(x => {
        // console.log(x.functions)
        // console.log(x)
        x.data.map((y) => {
            data[y.id] = y
        })
    })
    return data;
}

export async function getIndexTokenPrices(tokens, timeframe, denom) {
    console.log('[API] get token price data')
    let data = [];
    const now = Math.floor(Date.now() / 1000);
    const from = timeCalc(now, timeframe);
    await Promise.all(tokens.map(u => axios.get("https://api.coingecko.com/api/v3/coins/" + u + "/market_chart/range?vs_currency=" + denom + "&from=" + from + "&to=" + now)))
        .then(responses => {
                responses.map((results, index) => {
                        data.push(results.data)
                    }
                )
            }
        )

    const formattedData = {};
    data.forEach((x, i) => {
        const entries = [];
        x.prices.forEach((y, i) => {
            const entry = {};
            entry.timestamp = y[0]
            entry.price = y[1]
            x.market_caps.forEach((z, h) => {
                if (z[0] === y[0]) {
                    entry.market_cap = z[1]
                }
            })
            entries.push(entry)
        })
        formattedData[tokens[i]] = entries
    })
    return formattedData;
}

export async function getIndexTokenPriceData(indexes, priceDataIn) {
    console.log('[CALC] calculate index weights and prices')

    const output = {};
    Object.keys(indexes).forEach((x, i) => {
            const indexTokens = getIndexTokensSingle(indexes[x])
            output[x] = {
                equal: getEqualData(indexTokens, priceDataIn),
                manual: getManualData(indexTokens, priceDataIn),
                cap: getCapData(indexTokens, priceDataIn),
                vol: getVolData(indexTokens, priceDataIn),
            }
    })
    // console.log(output)
    return output;
}

function getIndexTokensSingle(data) {
    const tokenList = [];
    for (let x of Object.keys(data.assets)) {
        tokenList.push(x);
    }
    return tokenList
}

export function getEqualData(tokens, data) {
    let output = [];
    // let out = [];
    // const timeList = [];
    const timeList = [];
    const priceList = [];
    const capList = [];
    tokens.forEach((x, i) => {
        // console.log(x)
        // console.log(data)
        if (i === 0) {
            output = data[x]
        } else {
            data[x].forEach((y, h) => {
                // console.log(output[h])
                if (output[h] !== undefined) {
                    output[h].price = (output[h].price + y.price) / tokens.length
                    output[h].market_cap = (output[h].market_cap + y.market_cap) / tokens.length
                }
            })
        }
    })

    output.forEach((x, i) => {
        // out.push([x.timestamp, x.price, x.market_cap]);
        timeList.push([x.timestamp, x.price]);
        priceList.push([x.timestamp, x.price]);
        capList.push([x.timestamp, x.market_cap]);
    })
    // console.log(output);
    return [timeList, priceList];
}

export function getManualData(tokens, data) {
    let output = [];
    // let out = [];
    // const timeList = [];
    const timeList = [];
    const priceList = [];
    const capList = [];
    tokens.forEach((x, i) => {
        // console.log(x)
        // console.log(data)
        if (i === 0) {
            output = data[x]
        } else {
            data[x].forEach((y, h) => {
                // console.log(output[h])
                if (output[h] !== undefined) {
                    output[h].price = (output[h].price + y.price) / tokens.length * 2
                    output[h].market_cap = (output[h].market_cap + y.market_cap) / tokens.length * 2
                }
            })
        }
    })

    output.forEach((x, i) => {
        // out.push([x.timestamp, x.price, x.market_cap]);
        timeList.push([x.timestamp, x.price]);
        priceList.push([x.timestamp, x.price]);
        capList.push([x.timestamp, x.market_cap]);
    })
    // console.log(output);
    return [timeList, priceList];
}

export function getCapData(tokens, data) {
    let output = [];
    // let out = [];
    // const timeList = [];
    const timeList = [];
    const priceList = [];
    const capList = [];
    tokens.forEach((x, i) => {
        // console.log(x)
        // console.log(data)
        if (i === 0) {
            output = data[x]
        } else {
            data[x].forEach((y, h) => {
                // console.log(output[h])
                if (output[h] !== undefined) {
                    output[h].price = (output[h].price + y.price) / tokens.length * 3
                    output[h].market_cap = (output[h].market_cap + y.market_cap) / tokens.length * 3
                }
            })
        }
    })

    output.forEach((x, i) => {
        // out.push([x.timestamp, x.price, x.market_cap]);
        timeList.push([x.timestamp, x.price]);
        priceList.push([x.timestamp, x.price]);
        capList.push([x.timestamp, x.market_cap]);
    })
    // console.log(output);
    return [timeList, priceList];
}

export function getVolData(tokens, data) {
    let output = [];
    // let out = [];
    // const timeList = [];
    const timeList = [];
    const priceList = [];
    const capList = [];
    tokens.forEach((x, i) => {
        // console.log(x)
        // console.log(data)
        if (i === 0) {
            output = data[x]
        } else {
            data[x].forEach((y, h) => {
                // console.log(output[h])
                if (output[h] !== undefined) {
                    output[h].price = (output[h].price + y.price) / tokens.length / 2
                    output[h].market_cap = (output[h].market_cap + y.market_cap) / tokens.length / 2
                }
            })
        }
    })

    output.forEach((x, i) => {
        // out.push([x.timestamp, x.price, x.market_cap]);
        timeList.push([x.timestamp, x.price]);
        priceList.push([x.timestamp, x.price]);
        capList.push([x.timestamp, x.market_cap]);
    })
    // console.log(output);
    return [timeList, priceList];
}


