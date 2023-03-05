
const punctuationRegex = /[^\p{L}\p{N}]+/gu;
class stringService {
    removePunctuation(message) {
        const normalizedStr = message.normalize('NFD');
        const withoutPunctuation = normalizedStr.replace(punctuationRegex, ' ');
        const collapsedSpaces = withoutPunctuation.replace(/\s+/g, ' ');
        return collapsedSpaces.trim();
    }
    convertToLikeStructure(rawData) {
        const cleanedData = this.removePunctuation(rawData).toLowerCase()
        const keywords = cleanedData.split(/\s+/);
        const likeString = `%${keywords.join('%')}%`;
        return likeString;
    }
}

module.exports = new stringService()