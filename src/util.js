const convertUnicodeToChar = (t) => {
    return t.replace(/\\u[\dA-F]{4}/gi, (match) => {
            return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
        });
};

const formatText = (t) => {
    return t.replace(/<\/?[^>]+(>|$)/g, '').replace(/\r?\n|\r/g, ' ').replace(/\s{2,}/g, ' ').trim();
};

const prepareText = (t) => {
    t = convertUnicodeToChar(t);
    return JSON.parse(t);
}

exports.convertUnicodeToChar = convertUnicodeToChar;
exports.formatText = formatText;
exports.prepareText = prepareText;