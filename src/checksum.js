const checksum = acctNumber => {
    return acctNumber.split('')
        .map(i => parseInt(i))
        .reverse()
        .reduce((a, b, i) => (a + b * (i+1)) % 11, 0)
}

module.exports = checksum;