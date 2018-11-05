const toColumns = require('./columnExtractor')

describe('columnExtractor', () => {
    it('should be able to break a row into columns', () => {
        const result = toColumns("000111222333\n000111222333\n000111222333\n")
        expect(result).toHaveLength(4)
        expect(result[0]).toEqual('000\n000\n000\n')
        expect(result[1]).toEqual('111\n111\n111\n')
        expect(result[2]).toEqual('222\n222\n222\n')
        expect(result[3]).toEqual('333\n333\n333\n')
    })
})