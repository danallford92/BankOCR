const fs = require('fs')
const report = require("./reporter")

const TEST_OUTPUT_DIR = './test_output'
const TEST_OUTPUT_FILE = TEST_OUTPUT_DIR + '/report.txt'

beforeEach(() => {
    if (!fs.existsSync(TEST_OUTPUT_DIR)) {
        fs.mkdirSync(TEST_OUTPUT_DIR)
    }
    if (fs.existsSync(TEST_OUTPUT_FILE)) {
        fs.unlinkSync(TEST_OUTPUT_FILE)
    }
})

it('can report on a valid account number', () => {
    const outputFile = TEST_OUTPUT_FILE
    report('./test_fixtures/account-numbers/000000000.txt', outputFile)
    const output = fs.readFileSync(outputFile).toString()
    expect(output).toEqual("000000000")
})

it('can report on a invalid account number', () => {
    const outputFile = TEST_OUTPUT_FILE
    report('./test_fixtures/account-numbers/012345678.txt', outputFile)
    const output = fs.readFileSync(outputFile).toString()
    expect(output).toEqual("012345678 ERR")
})

it('can report on an illegible account number', () => {
    const outputFile = TEST_OUTPUT_FILE
    report('./test_fixtures/account-numbers/illegible.txt', outputFile)
    const output = fs.readFileSync(outputFile).toString()
    expect(output).toEqual("0123?5678 ILL")
})

it('can report on all types of account numbers', () => {
    const outputFile = TEST_OUTPUT_FILE
    report('./test_fixtures/account-numbers/all_states.txt', outputFile)
    const output = fs.readFileSync(outputFile).toString().split('\n')

    expect(output[0]).toEqual("000000000")
    expect(output[1]).toEqual("012345678 ERR")
    expect(output[2]).toEqual("0123?5678 ILL")
})

it('can fix unambiguous missing pipe', () => {
    const outputFile = TEST_OUTPUT_FILE
    report('./test_fixtures/account-numbers/illegible_1.txt', outputFile)
    const output = fs.readFileSync(outputFile).toString()
    expect(output).toEqual("100000002")
})
