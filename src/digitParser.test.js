const parseDigit = require('./digitParser');
const fs = require('fs')

describe('can parse numbers individually', () => {
    for(let i = 0; i < 10; i++) {
        it(`should be able to parse ${i}`, () => {
            const text = fs.readFileSync(`./test_fixtures/digits/${i}.txt`).toString();
            expect(parseDigit(text)).toBe(`${i}`);
        })
    }
})

describe('replace illegible digits with ?', () => {
    const text = fs.readFileSync(`./test_fixtures/digits/illegible.txt`).toString();
    expect(parseDigit(text)).toBe('?');
})