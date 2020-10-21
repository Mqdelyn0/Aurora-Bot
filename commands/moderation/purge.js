const Discord = require('discord.js');
const config = require('../../config.json');

module.exports.run = async (bot, message, arguments) => {
    const roles = config.PERMISSIONS.MODERATION_COMMANDS;
    if(message.member.roles.cache.some(role => roles.includes(role.id))) {
        if(arguments.length < 2) {
            message.channel.send(config.MESASGES.NOT_ENOUGH_ARGS);
            return
        }
        else if(arguments.length >= 2) {
            const amount = arguments[0];
            const reason = arguments.slice(1).join(' ');
            if(isNaN(amount)) {
                message.channel.send('That\'s not a number!');
                return;
            }
            if(amount > 100) {
                message.channel.send('You can only purge 100 messages at a time!');
                return;
            }
                message.channel.messages.fetch({ limit: amount }).then(messages => {
                message.channel.bulkDelete(messages);
                })
            message.channel.send(`<@${message.author.id}> has purged the chat!\nReason: ${reason}`);
            bot.logMessage.log('INFO', `${message.author.tag} has purged ${amount} messages in ${message.channel.name}!`);
            bot.logMessage.log('INFO', `Reason: ${reason}`);
        }
    } else {
        message.channel.send(config.MESASGES.NO_PERM);
    }
};