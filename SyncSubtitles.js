let fs = require('fs');

/**
 * @param {number} timeDelta the time in milliseconds that needs to be synced
 * @param {string} data data of the subtitle file.
 * @returns {string} updated subtitles file
 */
function syncSubtitles(timeDelta, data) {
    let regExTimeStamp = /(\d+):(\d+):(\d+),(\d+)/g;
    let updatedSubtitlesFile = data.replace(regExTimeStamp, (match, g1, g2, g3, g4, offset, string) => {
        let date = new Date(0, 0, 0, g1, g2, g3, g4);
        date.setTime(date.getTime() + timeDelta);
        let adjustedTime = d2(date.getHours()) + ":" + d2(date.getMinutes()) + ":" + d2(date.getSeconds()) + "," + d3(date.getMilliseconds());
        return adjustedTime;
    });
    return updatedSubtitlesFile;
}

/**
 * formats single digit numbers to 2 digits numbers
 * @param {number} n number to be formatted
 * @returns {number} number in 2 digits format
 */
function d2(n) {
    return n.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
}

/**
 * formats single digit numbers to 3 digits numbers
 * @param {number} n number to be formatted
 * @returns {number} number in 3 digits format
 */
function d3(n) {
    return ("0" + n).slice(-3);
}

let timeDelta = Number(process.argv[2]);
let fileName = process.argv[3];
let data = fs.readFileSync(fileName, 'UTF-8');
let updatedSubtitlesFile = syncSubtitles(timeDelta, data);
fs.writeFileSync(fileName, updatedSubtitlesFile);
