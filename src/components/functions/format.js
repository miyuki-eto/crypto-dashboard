export const currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export const currencyFormatZero = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
});

export function formatCurrency(value) {
    let newVal = 0;
    if (value === 0) {
        newVal = currencyFormatZero.format(0);
    } else if (value >= 1000) {
        newVal = currencyFormatZero.format(value);
    } else {
        newVal = currencyFormat.format(value);
    }
    return newVal
}

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}