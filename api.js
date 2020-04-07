const https = require("https");

const hostname = 'www.lingq.com';
const port = 443;
const token = 'Token ***REMOVED***';
let language = 'ko';
let contentId = 114407;

// 114407 ko
// 7478 ru

let options = {
    hostname: hostname,
    port: port,
    headers: {'Authorization': token}
};

const getLessonText = () => {
    options.path = '/api/languages/' + language + '/lessons/' + contentId + '/text/';

    return new Promise((resolve, reject) => {
        https.get(options, (response) => {
            let lessonText = '';
            response.on('data', function (data) {
                lessonText += data.toString();
            });
            response.on('end', function() {
                resolve(lessonText);
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

const getLessonLingQs = () => {
    options.path = '/api/languages/' + language + '/lessons/' + contentId + '/lingqs/';

    return new Promise((resolve, reject) => {
        https.get(options, (response) => {
            let lessonText = '';
            response.on('data', function (data) {
                lessonText += data.toString();
            });
            response.on('end', function() {
                resolve(lessonText);
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

exports.getLessonText = getLessonText;
exports.getLessonLingQs = getLessonLingQs;