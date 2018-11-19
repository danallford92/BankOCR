const parseDigit = require('./digitParser');
const fs = require('fs')

describe('can parse numbers individually', () => {
    for (let i = 0; i < 10; i++) {
        it(`should be able to parse ${i}`, () => {
            const text = fs.readFileSync(`./test_fixtures/digits/${i}.txt`).toString();
            expect(parseDigit(text)).toMatchObject({ initialMatch: `${i}` });
        })
    }
})

describe('illegible digits are left unassigned', () => {
    const text = fs.readFileSync(`./test_fixtures/digits/illegible.txt`).toString();
    expect(parseDigit(text)).toMatchObject({ initialMatch: undefined });
})

describe('offer alternatives to illegible digits', () => {
    const text = fs.readFileSync(`./test_fixtures/digits/illegible_1.txt`).toString();
    expect(parseDigit(text)).toEqual({ initialMatch: undefined, alternatives: ['1'] });
})

describe('offer alternatives to legible digits', () => {
    [
        { n: 0, alternatives: ["8"] },
        { n: 1, alternatives: ["7"] },
        { n: 2, alternatives: [] },
        { n: 3, alternatives: ["9"] },
        { n: 4, alternatives: [] },
        { n: 5, alternatives: ["6", "9"] },
        { n: 6, alternatives: ["5", "8"] },
        { n: 7, alternatives: ["1"] },
        { n: 8, alternatives: ["0", "6", "9"] },
        { n: 9, alternatives: ["3", "5", "8"] }
    ].forEach(({ n, alternatives }) => {
        test(`${n} has alternatives ${alternatives}`, () => {
            const text = fs.readFileSync(`./test_fixtures/digits/${n}.txt`).toString();
            expect(parseDigit(text)).toEqual({ initialMatch: `${n}`, alternatives });
        })
    })

})