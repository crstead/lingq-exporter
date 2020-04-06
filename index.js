const https = require("https");

const getLessonText = () => {
    const options = {
        hostname: 'www.lingq.com',
        port: 443,
        path: '/api/languages/ko/lessons/396053/text/',
        headers: {'Authorization': 'Token ***REMOVED***'}
    };

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

const unicodeToChar = (text) => {
    return text.replace(/\\u[\dA-F]{4}/gi, (match) => {
            return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
        });
}

getLessonText().then(lessonText => {
    console.log(unicodeToChar(lessonText));
}).catch(error => {console.log(error)});