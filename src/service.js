const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const lingq = require("./lingq");
const util = require("./util");

const getText = () => {
    return lingq.getText().then(result => {
        result = util.prepareText(result);
        result = util.formatText(result.text);

        result = result.split(/(?<=(?<!.\..|\n)[.?!]\)?\s)/);

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
                if (result[key]["notes"] != null) {
                    vocabulary.set(termKey, `${hint.text} (Note: ${result[key]["notes"]}) | `);
                } else {
                    vocabulary.set(termKey, `${hint.text} | `);
                }
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

const getMappedLessonData = () => {
    return getLessonData().then(values => {
        const text = values[0];
        const vocabulary = values[1];

        const dataMap = new Map();

        for (sentence of text) {
            const items = new Map();
            for (item of vocabulary) {
                if (sentence.toString().includes(item[0])) {
                    dataMap.set(sentence, items.set(item[0], item[1]));
                }
            }
        }
        return dataMap;
    });
};

const writeToCsv = (data) => {
    const arr = [];
    const iterator = data.keys();

    for (key of iterator) {

        value = data.get(key);

        const termIterator = value.keys();
        let vocabulary = '';

        for (termKey of termIterator) {
            vocabulary += `${termKey} = ${value.get(termKey)}`;
        }

        arr.push({sentence: [key], vocabulary: vocabulary});
    }

    const filepath = './file.csv'

    const csvWriter = createCsvWriter({
        path: filepath,
        header: [
            {id: 'sentence', title: 'SENTENCE'},
            {id: 'vocabulary', title: 'VOCABULARY'}
        ],
        append: true,
        fieldDelimiter: ';',
    });

    return csvWriter.writeRecords(arr)
    .then(() => {
        console.log(`Successfully wrote CSV file to ${filepath}`);
    });
}

exports.getText = getText;
exports.getVocabulary = getVocabulary;
exports.getLessonData = getLessonData;
exports.getMappedLessonData = getMappedLessonData;
exports.writeToCsv = writeToCsv;