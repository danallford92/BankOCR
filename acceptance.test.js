const accountParser = require('./accountParser')
const fs = require('fs')

it('can parse a single account number', () => {
    const text = fs.readFileSync('./account-numbers/012345678.txt').toString()
    expect(accountParser(text)).toEqual("012345678")
})
