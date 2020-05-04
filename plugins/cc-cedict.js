const fs = require('fs');
const service = require('../src/service');
const readline = require('readline');

const readDict = () => {
    return new Promise((resolve, reject) => {
        const readInterface = readline.createInterface({
            input: fs.createReadStream('./cedict_ts.u8'),
            console: false
        });

        readInterface.on('line', (line) => {
            let parts = [];

            // Characters
            let found = line.match(/^([\w]*.+?\s)([\w]*.+?\s)/);
            if (found !== null) {
                parts.push(found[1].trim());
                parts.push(found[2].trim());
            }

            // Pronunciation
            found = line.match(/\[(.+)\](?=\s\/)/);

            if (found !== null) {
                found = found[0].match(/[^\[].+[^\]]/);
                if (found !== null) parts.push(found[0]);
            }

            // Translation
            found = line.match(/\/.+/);

            if (found !== null) {
                found = found[0].match(/[^\/].+[^\/]/);
                if (found !== null) parts.push(found[0]);
            }
            resolve()
        });
    });
}