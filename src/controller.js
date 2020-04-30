const service = require("./service");

const go = () => {
    service.getMappedLessonData().then(result => {
        service.writeToCSV(result);
    });
}

exports.go = go;