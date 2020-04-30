const service = require("./service");

let myArgs = process.argv;
console.log(myArgs);

const go = () => {
    service.getMappedLessonData().then(result => {
        service.writeToCSV(result).then(result => {
            console.log(result);
        });
    });
}

go();