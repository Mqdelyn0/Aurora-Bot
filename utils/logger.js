const fs = require('fs').promises;

module.exports = {
    log: async (type, message) => {
        switch(type) {
            case 'ERROR':
                console.log(`[ERROR / ${new Date().toUTCString()}] ${message}`);
                fs.appendFile('./logs/logs.txt', `[ERROR / ${new Date().toUTCString()}] ${message}\n`, (err) => {
                    if(!err) 
                        return;
                    console.log(`[ERROR / ${new Date().toUTCString()}] Couldn't make a entry in the logs!`);
                    logger.trace(err);
                });
                break;
            case 'INFO':
                console.log(`[INFO / ${new Date().toUTCString()}] ${message}`);
                fs.appendFile('./logs/logs.txt', `[INFO / ${new Date().toUTCString()}] ${message}\n`, (err) => {
                    if(!err) 
                        return;
                    console.log(`[ERROR / ${new Date().toUTCString()}] Couldn't make a entry in the logs!`);
                    logger.trace(err);
                });
                break;
            case 'INITIALIZE':
                console.log(`[INITIALIZE / ${new Date().toUTCString()}] ${message}`);
                fs.appendFile('./logs/logs.txt', `[INITIALIZE / ${new Date().toUTCString()}] ${message}\n`, (err) => {
                    if(!err) 
                        return;
                    console.log(`[ERROR / ${new Date().toUTCString()}] Couldn't make a entry in the logs!`);
                    logger.trace(err);
                });
                break;
            case 'READY':
                console.log(`[READY / ${new Date().toUTCString()}] ${message}`);
                fs.appendFile('./logs/logs.txt', `[READY / ${new Date().toUTCString()}] ${message}\n`, (err) => {
                    if(!err) 
                        return;
                    console.log(`[ERROR / ${new Date().toUTCString()}] Couldn't make a entry in the logs!`);
                    logger.trace(err);
                });
                break;
            case 'COMMAND EXECUTION':
                console.log(`[COMMAND EXECUTION / ${new Date().toUTCString()}] ${message}`);
                fs.appendFile('./logs/logs.txt', `[COMMAND EXECUTION / ${new Date().toUTCString()}] ${message}\n`, (err) => {
                    if(!err) 
                        return;
                    console.log(`[ERROR / ${new Date().toUTCString()}] Couldn't make a entry in the logs!`);
                    logger.trace(err);
                });
                break;
            default:
                console.log(`[NOT KNOWN / ${new Date().toUTCString()}] ${message}`);
                fs.appendFile('./logs/logs.txt', `[NOT KNOWN / ${new Date().toUTCString()}] ${message}\n`, (err) => {
                    if(!err) 
                        return;
                    console.log(`[ERROR / ${new Date().toUTCString()}] Couldn't make a entry in the logs!`);
                    logger.trace(err);
                });
                break;
        }
    }
}