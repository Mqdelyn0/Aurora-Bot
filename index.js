const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fs = require('fs').promises;
const path = require('path');
const mongo = require('./database/mongoose');
const logger = require('./utils/logger');

mongo.init(client);

client.commands = new Discord.Collection();
client.logMessage = logger;

client.login(config.BOT_SETTINGS.TOKEN);

client.on('message', (message) => {
    if(message.author.bot || !(message.content.startsWith(config.BOT_SETTINGS.COMMAND_PREFIXES))) {
        return;
    }
    let cmdArgs = message.content.substring(message.content.indexOf(config.BOT_SETTINGS.COMMAND_PREFIXES) + 1).split(new RegExp(/\s+/));
    let cmdName = cmdArgs.shift().toLowerCase();
    client.logMessage.log('COMMAND EXECUTION', `${message.author.tag} executed Aurora Bot command -${cmdName} ${cmdArgs.join(' ')}`);
    if(client.commands.get(cmdName)) {
        client.commands.get(cmdName).run(client, message, cmdArgs);
    }
});

(async function registerCommands(dir = 'commands') {
    let files = await fs.readdir(path.join(__dirname, dir));
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if(stat.isDirectory()) {
            registerCommands(path.join(dir, file));
        } else if(file.endsWith(".js")) {
            let cmdName = file.substring(0, file.indexOf(".js"));
            let cmdModule = require(path.join(__dirname, dir, file));
            client.commands.set(cmdName, cmdModule);
            client.logMessage.log('INITIALIZE', `Loaded in ${file.replace('.js', '')} command!`);
        }
    }
})();

(async function registerEvents(dir = 'events') {
    // C:\Users\Ronski\Desktop\Aurora Bot
    // C:\Users\Ronski\Desktop\Aurora Bot\events
    let files = await fs.readdir(path.join(__dirname, dir));
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if(stat.isDirectory()) {
            registerEvents(path.join(dir, file));
        } else if(file.endsWith(".js")) {
            let eventName = file.substring(0, file.indexOf(".js"));
            let eventModule = require(path.join(__dirname, dir, eventName));
            client.on(eventName, eventModule.bind(null, client));
            client.logMessage.log('INITIALIZE', `Loaded in ${file.replace('.js', '')} event!`);
        }
    }
})();