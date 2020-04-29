const lingq = require("./lingq");
const util = require("./util");

const getText = () => {
    return lingq.getText().then(result => {
        result = util.prepareText(result);

        result = result.text.split(/(?<=[^ge][^.\s][^pg][.?!]\)?\s)/g);

        const text = result.map(sentence => {
            return util.formatText(sentence);
        });
        return text;
    });
}

const getVocabulary = () => {
    return lingq.getVocabulary().then(result => {
        result = util.prepareText(result);
        const vocabulary = new Map();

        for (key in result) {
            const termKey = result[key]["term"];

            for (hint of result[key]["hints"]) {
                vocabulary.set(termKey, hint.text);
            }
        }
        return vocabulary;
    });
}

const getLessonData = () => {
    return Promise.all([getText(), getVocabulary()]).then(values => {
        return values;
    }).catch(error => {
        error !== undefined ? console.log(error) : console.log("Error: Failed to retrieve lesson data");
        process.exit();
    });
};

const mapLessonData = () => {
    getLessonData().then(values => {
        text = values[0];
        vocabulary = values[1];
        const dataMap = new Map();

        for (sentence of text) {
            const items = new Map();
            for (item of vocabulary) {
                if (sentence.toString().includes(item[0])) {
                    dataMap.set(sentence, items.set(item[0], item[1]));
                }
            }
        }

        // tmp
        for (data of dataMap) {
            console.log(data);
        }
        console.log("Number of sentences in text: " + text.length);
        console.log("Number of items in map: " + dataMap.size);
    });
};

exports.getText = getText;
exports.getVocabulary = getVocabulary;
exports.getLessonData = getLessonData;
exports.mapLessonData = mapLessonData;