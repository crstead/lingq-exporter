const controller = require("./controller");

const getLessonText = () => {
    controller.getLessonText().then(result => {
        for (sentence of result) {
            console.log(sentence);
        }
    });
}

const getLessonVocabulary = () => {
    return controller.getLessonVocabulary().then(result => {
        for (let item of result) {
            console.log(item);
        }
    });
}