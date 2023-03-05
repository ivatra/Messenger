
class dateService {
    countDate(minutes) {
        return new Date(Date.now() - minutesToTimeSwamp(minutes))
    }

    minutesToTimeSwamp(minutes) {
        return 1000 * 60 * minutes
    }

    daysToTimeSwamp(days) {
        return days * 24 * 60 * 60 * 1000
    }
}

module.exports = new dateService()