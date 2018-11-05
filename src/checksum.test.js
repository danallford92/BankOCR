const checksum = require("./checksum");

[
    ['000000000', 0],
    ['000000001', 1],
    ['000000010', 2],
    ['000000100', 3],
    ['000001000', 4],
    ['000010000', 5],
    ['000100000', 6],
    ['001000000', 7],
    ['010000000', 8],
    ['100000000', 9],
    ['100000010', 0],
    ['640000050', 8],
].forEach(([accountNumber, expected]) => {
    test(`checksum for account number ${accountNumber} should be ${expected}`, () => {
        expect(checksum(accountNumber)).toEqual(expected)
    })
})
