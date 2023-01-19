function countDate(minutes) {
    return new Date(Date.now() - minutesToTimeSwamp(minutes))
}

function minutesToTimeSwamp(minutes) {
    return 1000 * 60 * minutes
}

module.exports = countDate