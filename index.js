const controller = require("./controller");

const getText = () => {
    return controller.getText().then(result => {
        return result;
    });
};

const getVocabulary = () => {
    return controller.getVocabulary().then(result => {
        return result;
    });
};

const getLessonData = () => {
    return Promise.all([getText(), getVocabulary()]).then(values => {
        return values;
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
        for (data of dataMap) {
            console.log(data);
        }
        console.log("Number of sentences in text: " + text.length);
        console.log("Number of items in map: " + dataMap.size);
    });
};

mapLessonData();
