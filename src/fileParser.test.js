const { parseFile, combine } = require('./fileParser')
const fs = require('fs')

describe("parseFile function", () => {
    it('can parse a single account number', () =>
        expect(parseFile('./test_fixtures/account-numbers/012345678.txt').map(x => x.asRead)).toEqual(["012345678"])
    )

    it('can parse two account number', () =>
        expect(parseFile('./test_fixtures/account-numbers/two_accounts.txt').map(x => x.asRead)).toEqual(["012345678", "123456789"])
    )

    it('can parse lots of accounts', () => {
        const accountNumbers = parseFile('./test_fixtures/account-numbers/1250_accounts.txt').map(x => x.asRead)
        expect(accountNumbers).toHaveLength(1250)
        expect(accountNumbers[1249]).toEqual("012345678")
    })

    it('replaces illegible columns with ?', () => {
        expect(parseFile('./test_fixtures/account-numbers/illegible.txt').map(x => x.asRead)).toEqual(["0123?5678"])
    })
});

const d = (initialMatch, alternatives = []) => ({ initialMatch: initialMatch && initialMatch.toString(), alternatives })

describe("combine function", () => {
    test("returns the string itself if no other alternatives", () => {
        expect(combine([d(1), d(2), d(3)], [''])).toEqual(["123"]);
        expect(combine([d(1), d(2), d(3)])).toEqual(["123"]);
    });

    test("returns the possibilities of an illegible string", () => {
        expect(combine([d(1), d(undefined, ["2", "4"]), d(3)])).toEqual(["123", "143"]);
    });

    test("returns the possibilities of a legible string", () => {
        expect(combine([d(1), d(2, ["3", "4"]), d(3)])).toEqual(["123", "133", "143"]);
    });

    test("returns the possibilities of a very illegible string", () => {
        expect(combine([d(1), d(undefined, ["3", "4"]), d(undefined, ["5", "6"])])).toEqual(["135", "136", "145", "146"]);
    });    
});