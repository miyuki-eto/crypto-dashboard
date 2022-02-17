export const denominations = ['usd', 'eth', 'btc'];
export const methods = ['equal', 'manual', 'cap', 'inv. vol.'];
export const timeframes = ['24h', '7d', '30d', '90d', '365d'];

const defaultMethodData = [[[0, 0], [0, 0]], [[0, 0], [0, 0]]]

const defaultChartData = {
    equal: defaultMethodData,
    manual: defaultMethodData,
    cap: defaultMethodData,
    vol: defaultMethodData
}

const defaultIndexChartData = {
    majors: defaultChartData,
    options: defaultChartData
}

const defaultSearchData = {
    image: {small: '-'},
    name: '-',
    symbol: '-',
    market_data: {
        current_price: {usd: 0},
        price_change_percentage_24h: 0,
        price_change_percentage_7d: 0,
        price_change_percentage_30d: 0,
        max_supply: 0,
        total_supply: 0,
        circulating_supply: 0,
        market_cap: {usd: 0},
        fully_diluted_valuation: {usd: 0}
    },
    links: {
        twitter_screen_name: '-',
        homepage: ['-'],
    },
    market_cap_rank: 0
}

const defaultTokenInfo = {
    image: '',
    name: '',
    symbol: '',
    market_cap: '',
    current_price: '',
}

const defaultTokenData = {
    bitcoin: defaultTokenInfo,
    ethereum: defaultTokenInfo,
    'ribbon-finance': defaultTokenInfo,
    dopex: defaultTokenInfo,
}

const defaultIndexAssetData = {price: 0, market_cap: 0, equal: 1, manual: 1, cap: 1, vol: 1}

const defaultIndex = {
    majors: {
        price: {
            equal: 0,
            manual: 0,
            cap: 0,
            vol: 0
        },
        assets: {
            bitcoin: defaultIndexAssetData,
            ethereum: defaultIndexAssetData,
        },
        chartData: defaultChartData
    },
    options: {
        price: {
            equal: 0,
            manual: 0,
            cap: 0,
            vol: 0
        },
        assets: {
            'ribbon-finance': defaultIndexAssetData,
            dopex: defaultIndexAssetData,
        },
        chartData: defaultChartData
    },
}

const defaultIndexEmpty = {
    unit: 'price',
    price: 0,
    assets: {}
}

const defaultWatchlistData = [{
    image: '',
    id: '',
    name: '',
    symbol: '',
    current_price: '',
    price_change_24h: '',
    market_cap: '',
    fully_diluted_valuation: '',
    sparkline: {price: []}
}]

export const defaultColdData = {
    timeframe: '7d',
    searchResult: 'ethereum',
    denomination: 'usd',
    globalMethod: 'equal',
    showSearch: true,
    showWatchlist: true,
    showIndex: true,
    indexes: defaultIndex,
    indexTokenNames: ['bitcoin', 'ethereum', 'ribbon-finance', 'dopex'],
    watchlist: ['bitcoin', 'ethereum']
}

export const defaultHotData = {
    searchData: defaultSearchData,
    searchPriceData: [],
    tokenData: defaultTokenData,
    searchNames: [],
    tokenPriceData: {
        bitcoin: [{timestamp: 0, price: 0, market_cap: 0}],
        ethereum: [{timestamp: 0, price: 0, market_cap: 0}],
        'ribbon-finance': [{timestamp: 0, price: 0, market_cap: 0}],
        dopex: [{timestamp: 0, price: 0, market_cap: 0}],
    },
}

function getIndexTokens(data) {
    const tokenList = [];
    for (let x of Object.keys(data.indexes)) {
        for (let y of Object.keys(data.indexes[x].assets)) {
            // console.log(y)
            tokenList.push(y);
        }
    }
    // console.log(data.watchlist)
    data.watchlist.forEach((x) => {
        // console.log(x)
        if (!tokenList.includes(x)) {
            tokenList.push(x)
        }
    })
    return tokenList
}


export function createDefaultTokenData(data) {
    let output = {};
    {
        getIndexTokens(data).forEach((x, i) => {
            console.log(x)
            output[x] = defaultTokenInfo
        })
    }
    console.log(output)
    return output
}

