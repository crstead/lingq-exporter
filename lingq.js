const https = require("https");

const hostname = 'www.lingq.com';
const port = 443;
const token = 'Token ***REMOVED***';
let language = 'sv';
let contentId = 32892;

// 114407 ko
// 7478 ru
// 32892 sv

let options = {
    hostname: hostname,
    port: port,
    headers: {'Authorization': token}
};

const getText = () => {
    options.path = '/api/languages/' + language + '/lessons/' + contentId + '/text/';
    return getPromise(options);
};

const getVocabulary = () => {
    options.path = '/api/languages/' + language + '/lessons/' + contentId + '/lingqs/';
    return getPromise(options);
};

const getPromise = (options) => {
    return new Promise((resolve, reject) => {
        https.get(options, (response) => {
            let text = '';
            response.on('data', function (data) {
                text += data.toString();
            });
            response.on('end', function() {
                resolve(text);
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

exports.getText = getText;
exports.getVocabulary = getVocabulary;