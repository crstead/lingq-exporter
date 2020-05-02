const service = require('./service');

const go = () => {
    service.getMappedLessonData().then(result => {
        service.writeToCsv(result);
    });
}

exports.go = go;