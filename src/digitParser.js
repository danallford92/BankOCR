const DIGITS = {
    " _ \n| |\n|_|\n": '0',
    "   \n  |\n  |\n": '1',
    " _ \n _|\n|_ \n": '2',
    " _ \n _|\n _|\n": '3',
    "   \n|_|\n  |\n": '4',
    " _ \n|_ \n _|\n": '5',
    " _ \n|_ \n|_|\n": '6',
    " _ \n  |\n  |\n": '7',
    " _ \n|_|\n|_|\n": '8',
    " _ \n|_|\n _|\n": '9'
}

function parseDigit(string) {
    return DIGITS[string] || '?'
}

module.exports = parseDigit;