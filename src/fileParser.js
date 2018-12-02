const fs = require('fs')
const toColumns = require('./columnExtractor')
const digitParser = require('./digitParser')

const parseRow = string => {
    const digits = toColumns(string).map(digitParser)
    return {
        asRead: digits
            .map(({ initialMatch, alternatives }) => initialMatch || '?')
            .join(''),
        getPossibles: () => combine(digits)
    }
}

const combine = (digits) => {
    if (digits.filter(d => d.initialMatch === undefined).length > 1) {
        return [];
    }

    if (digits.filter(d => d.initialMatch === undefined).length === 1) {
        return replaceUndefined(digits)
    }

    return replaceOne(digits)
}

const replaceUndefined = (digits) => {
    const x = digits.map(d => d.initialMatch);
    const n = x.indexOf(undefined);
    const prefix = x.slice(0, n).join('')
    const suffix = x.slice(n + 1).join('')
    return digits[n].alternatives.map(s => prefix + s + suffix);
}

const replaceOne = (digits, seen = "", acc = []) => {
    if (digits.length === 0) {
        return acc;
    }

    const [{ initialMatch, alternatives }, ...rest] = digits

    return replaceOne(rest, seen + initialMatch, [...acc.map(s => s + initialMatch), ...alternatives.map(s => seen + s)])
}

// {
//     asRead: '1234595342',
//     possible: ['5435653', '453455643']
// }

const flatMap = (f, arr) => arr.reduce((x, y) => [...x, ...f(y)], [])

const parseRows = string =>
    string.split("\n\n").map(parseRow)

const parseFile = fileName =>
    parseRows(fs.readFileSync(fileName).toString())

module.exports = { parseFile, combine };


// '032456754' -> '032456754 CHECKSUM'
// '03245675?' -> '03245675? ILL'
// '03245675?' -> '03245675? AMB'

// {
//     accountNumber: '12345?457',
//     // match: '123455457',
//     // error: 'ILL' || 'AMB'
// }

// {
//     accountNumber: '12345?45?',
//     error: 'AMB'
//     alternatives: [[1], [7,9]]
// }