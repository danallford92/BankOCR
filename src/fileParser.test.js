const parseFile = require('./fileParser')
const fs = require('fs')

it('can parse a single account number', () => {
    expect(parseFile('./test_fixtures/account-numbers/012345678.txt')).toEqual(["012345678"])
})

it('can parse two account number', () => {
    expect(parseFile('./test_fixtures/account-numbers/two_accounts.txt')).toEqual(["012345678", "123456789"])
})
