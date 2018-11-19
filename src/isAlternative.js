const isAlternative = (from, to) => {
    if (from.length !== to.length) {
        return false
    }

    if (!isReachable(from, to)) {
        return false;
    }
    
    return numberOfEdits(from, to) === 1
}

const isReachable = (from, to) => {
    for (let i = 0; i < from.length; i++) {
        if (from[i] !== to[i] && !(from[i] === ' ' || to[i] === ' ')) {
            return false
        }
    }
    return true
}

const numberOfEdits = (from, to) => {
    let numberOfEdits = 0
    for (let i = 0; i < from.length; i++) {
        if (from[i] !== to[i]) {
            numberOfEdits++
        }
    }
    return numberOfEdits
}

module.exports = isAlternative