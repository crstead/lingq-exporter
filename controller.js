const lingq = require("./lingq");
const util = require("./util");

const getText = () => {
    return lingq.getText().then(result => {
        result = util.convertUnicodeToChar(result);
        result = JSON.parse(result);
        result = util.formatText(result.text);

        text = result.split('.');

        if (text[text.length - 1] === "") {
            text.pop(text.length - 1)
        }

        text = text.map(sentence => {
            sentence = sentence.trimStart();
            sentence += ".";
            return sentence;
        })

        return text;
    }).catch(error => { console.log(error) });
}

const getVocabulary = () => {
    return lingq.getVocabulary().then(result => {
        util.convertUnicodeToChar(result);
        result = JSON.parse(result);
        const vocabulary = new Map();

        for (key in result) {
            const termKey = result[key]["term"];

            for (hint of result[key]["hints"]) {
                vocabulary.set(termKey, hint.text);
            }
        }

        return vocabulary;
    }).catch(error => { console.log(error) });
}

exports.getText = getText;
exports.getVocabulary = getVocabulary;