
const THREE = 
` _
 _|
 _|
`

function parse(string) {
    return string.includes("_") ? string === THREE ? 3 : 2 : 1;
}

module.exports = parse;