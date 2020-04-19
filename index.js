const controller = require("./controller");

const myArgs = process.argv;

console.log(myArgs);

let lessonText, lessonVocabulary;

if (myArgs[2] === "1") {
    lessonText = controller.getLessonText.then(result => {
        for (sentence of result) {
            sentence = sentence.trimStart();
            sentence += ".";
        }
    });
} else if (myArgs[2] === "2") {
    lessonVocabulary = controller.getLessonVocabulary.then(result => {
        for (let item of result) {
            //console.log(item);
        }
    });
}