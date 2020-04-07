const unicodeToChar = (text) => {
    return text.replace(/\\u[\dA-F]{4}/gi, (match) => {
            return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
        });
}

const cleanText = (text) => {
    return text.replace(/<\/?[^>]+(>|$)/g, '').replace(/\r?\n|\r/g, ' ').replace(/\s{2,}/g, ' ').trim();
}

exports.unicodeToChar = unicodeToChar;
exports.cleanText = cleanText;