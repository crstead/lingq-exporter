const https = require("https");
const hostname = 'www.lingq.com';
const port = 443;
const cliArgs = process.argv.slice(2);
const token = "Token " + cliArgs[0];
let language = cliArgs[1];
let contentId = cliArgs[2];

let options = {
    hostname: hostname,
    port: port,
    headers: {'Authorization': token}
};

const getText = () => {
    options.path = '/api/languages/' + language + '/lessons/' + contentId + '/text/';
    return callApi(options);
};

const getVocabulary = () => {
    options.path = '/api/languages/' + language + '/lessons/' + contentId + '/lingqs/';
    return callApi(options);
};

const callApi = (options) => {
    return new Promise((resolve, reject) => {
        https.get(options, (response) => {
            let text = '';
            response.on('data', function (data) {
                text += data.toString();
            });
            response.on('end', function() {
                try {
                    t = JSON.parse(text);
                    if (t.detail === "Invalid token.") reject("ERROR: Invalid Api token. Exiting.");
                } catch (error) {
                    reject("ERROR: Failed to parse API response. Exiting.");
                }
                resolve(text);
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

exports.getText = getText;
exports.getVocabulary = getVocabulary;