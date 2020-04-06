const https = require("https");

const listLanguages = () => {
    const options = {
        hostname: 'www.lingq.com',
        port: 443,
        path: '/api/languages/',
        headers: { 'Authorization': 'Token ***REMOVED***' }
    };

    return new Promise((resolve, reject) => {
        https.get(options, (result) => {
            result.on("data", (chunk) => {
                resolve(chunk.toString());
            })
        }).on('error', (error) => {
            reject(error)
        });
    });
}

listLanguages().then(result => {
    //console.log(result.statusCode);
    console.log(result);
}).catch(e => {console.log(e)});