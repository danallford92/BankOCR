const isAlternative = require('./isAlternative');

test("true when requiring single ' ' -> |", () => {
    expect(isAlternative("a b", "a|b")).toBe(true);
    expect(isAlternative(" ab", "|ab")).toBe(true);
    expect(isAlternative("ab ", "ab|")).toBe(true);
})

test("true when requiring single | -> ' '", () => {
    expect(isAlternative("a|b", "a b")).toBe(true);
})

test("false when requiring single _ -> |", () => {
    expect(isAlternative("a_b", "a|b")).toBe(false);
})

test("false when requiring single | -> _", () => {
    expect(isAlternative("a|b", "a_b")).toBe(false);
})

test("true when requiring single ' ' -> _", () => {
    expect(isAlternative("a b", "a_b")).toBe(true);
    expect(isAlternative("  b", " _b")).toBe(true);
})

test("false when two edits required", () => {
    expect(isAlternative('  ', '__')).toBe(false)
    expect(isAlternative(' _', '| ')).toBe(false)
    expect(isAlternative('__', '| ')).toBe(false)
})

test("false in the following cases", () => {
    expect(isAlternative(' | ', ' _ ')).toBe(false)
    expect(isAlternative(' |_| ', ' ||| ')).toBe(false)
    expect(isAlternative('| | _  _', '| |__  ')).toBe(false)
})

test("true in the following cases", () => {
    expect(isAlternative(' | | ', ' | ||')).toBe(true)
    expect(isAlternative(' |_| ', ' | | ')).toBe(true)
    expect(isAlternative('| | _  _', '| |__  _')).toBe(true)
})

test("false when strings are different lengths", () => {
    expect(isAlternative(' ', '  ')).toBe(false)
})
