const parse = require('./index');

test('can parse the number 1', () => {
    expect(parse("   \n  |\n  |\n")).toBe(1);
});

test('can parse the number 2', () => {
    expect(parse("_\n _|\n |_\n")).toBe(2);
});

test('can parse the number 3', () => {
    expect(parse(" _\n _|\n _|\n")).toBe(3);
});

test('can parse the number 4', () => {
    expect(parse("   \n|_|\n  |\n")).toBe(4);
});


