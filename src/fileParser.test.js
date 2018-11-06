const parseFile = require('./fileParser')
const fs = require('fs')

it('can parse a single account number', () => 
    expect(parseFile('./test_fixtures/account-numbers/012345678.txt')).toEqual(["012345678"])
)

it('can parse two account number', () => 
    expect(parseFile('./test_fixtures/account-numbers/two_accounts.txt')).toEqual(["012345678", "123456789"])
)

it('can parse lots of accounts', () => {
    const accountNumbers = parseFile('./test_fixtures/account-numbers/1250_accounts.txt')
    expect(accountNumbers).toHaveLength(1250)
    expect(accountNumbers[1249]).toEqual("012345678")
})

it('replaces illegible columns with ?', () => {
    expect(parseFile('./test_fixtures/account-numbers/illegible.txt')).toEqual(["0123?5678"])
})