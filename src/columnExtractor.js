const getNthColumn = (lines, n) => {
    let result = '';
    for (let row = 0; row < 3; row++) {
        result += `${lines[row].substring(3 * n, 3 * n + 3)}\n`
    }
    return result
}

const range = n => [...new Array(n).keys()] 

const toColumns = string => {
    let lines = string.split("\n")
    let numChars = lines[0].length / 3

    return range(numChars)
        .map((index) => getNthColumn(lines, index))
}

module.exports = toColumns
