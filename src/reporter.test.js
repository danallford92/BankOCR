const fs = require('fs')
const { report, reportLine } = require("./reporter")

const TEST_OUTPUT_DIR = './test_output'
const TEST_OUTPUT_FILE = TEST_OUTPUT_DIR + '/report.txt'


describe('report', () => {
    beforeEach(() => {
        if (!fs.existsSync(TEST_OUTPUT_DIR)) {
            fs.mkdirSync(TEST_OUTPUT_DIR)
        }
        if (fs.existsSync(TEST_OUTPUT_FILE)) {
            fs.unlinkSync(TEST_OUTPUT_FILE)
        }
    })

    it('can report on a valid account number', () => {
        if (fs.existsSync(TEST_OUTPUT_DIR + '/report123.txt')) {
            fs.unlinkSync(TEST_OUTPUT_DIR + '/report123.txt')
        }
        const outputFile = TEST_OUTPUT_DIR + '/report123.txt'
        report('./test_fixtures/account-numbers/acceptance_test.txt', outputFile)
    })

    it('can report on *nearly* all types of account numbers', () => {
        const outputFile = TEST_OUTPUT_FILE
        report('./test_fixtures/account-numbers/all_states.txt', outputFile)
        const output = fs.readFileSync(outputFile).toString().split('\n')

        expect(output[0]).toEqual("000000000")
        expect(output[1]).toEqual("888888888 AMB")
        expect(output[2]).toEqual("0123?5678 ILL")
    })

    it('can fix unambiguous missing pipe', () => {
        const outputFile = TEST_OUTPUT_FILE
        report('./test_fixtures/account-numbers/illegible_1.txt', outputFile)
        const output = fs.readFileSync(outputFile).toString()
        expect(output).toEqual("100000002")
    })
});

describe("reportLine function", () => {
    test("number with valid checksum remains as is", () => {
        expect(reportLine({ asRead: "000000000", getPossibles: () => [] })).toEqual("000000000");
    });

    test("number with valid checksum remains as is, even when possibles exist", () => {
        expect(reportLine({ asRead: "000000000", getPossibles: () => ["100000002"] })).toEqual("000000000");
    });

    test("number with invalid checksum, but single possible with valid checksum uses the possible", () => {
        expect(reportLine({ asRead: "000000008", getPossibles: () => ['000000000', '000000009'] })).toEqual("000000000");
    });

    test("number with invalid checksum, and multiple possibles with invalid checksum reports as an error", () => {
        expect(reportLine({ asRead: "000000008", getPossibles: () => ['000000001', '000000009'] })).toEqual("000000008 ERR");
    });

    test("number with invalid checksum, but multiple possibles with valid checksums, reports as ambiguous", () => {
        expect(reportLine({ asRead: "000000008", getPossibles: () => ['000000000', '100000002'] })).toEqual("000000008 AMB");
    });

    test("number with '?' in with no valid possibles, should be reported as illegible", () => {
        expect(reportLine({ asRead: "00000000?", getPossibles: () => ['000000001', '000000002'] })).toEqual("00000000? ILL");
    });

    test("number with '?' in with a single valid possible, uses the possible", () => {
        expect(reportLine({ asRead: "00000000?", getPossibles: () => ['000000000', '000000002'] })).toEqual("000000000");
    });

    test("number with '?' in with multiple valid possibles, reports as ambiguous", () => {
        expect(reportLine({ asRead: "00000000?", getPossibles: () => ['000000000', '100000002'] })).toEqual("00000000? AMB");
    });
});
