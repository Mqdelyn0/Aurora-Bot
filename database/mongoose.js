const mongoose = require('mongoose');
const config = require('../config.json');

module.exports = {
    init: (bot) => {
        const dbOptions = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            poolSize: 5,
            connectTimeoutMS: 5000,
            family: 4
        };
        mongoose.connect(config.BOT_SETTINGS.MONGODB_URL, dbOptions);
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;
        mongoose.connection.on('connected', () => {
            bot.logMessage.log('INFO', `Connected to MongoDB! Listening on port ${mongoose.connection.port}`);
        });
        mongoose.connection.on('err', (err) => {
            bot.logMessage.log('INFO', 'Oh No! There was a error with MongoDB');
            bot.logMessage.log('ERROR', err);
        });
        mongoose.connection.on('disconnected', () => {
            bot.logMessage.log('INFO', 'Disconnected from MongoDB!');
        });
    }
}