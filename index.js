const api = require("./api");
const util = require("./util");

api.getLessonText().then(lessonText => {
    lessonText = util.unicodeToChar(lessonText);
    lessonText = JSON.parse(lessonText);
    lessonText = util.cleanText(lessonText.text);

    console.log(lessonText);

}).catch(error => {console.log(error)});

// api.getLessonLingQs().then(lessonLingQs => {
//     console.log(util.unicodeToChar(lessonLingQs));
// }).catch(error => {console.log(error)});