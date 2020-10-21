const Discord = require('discord.js');
const config = require('../../config.json');

module.exports.run = async (bot, message, arguments) => {
    let guild = bot.guilds.cache.get(config.BOT_SETTINGS.GUILDID);
    const roles = config.PERMISSIONS.MODERATION_COMMANDS;
    if(message.member.roles.cache.some(role => roles.includes(role.id))) {
        bot.channels.cache.get(config.CHANNELS.SERVERSTATS_ALL).setName(`Total Members: ${guild.members.cache.size}`);
        bot.channels.cache.get(config.CHANNELS.SERVERSTATS_BOTS).setName(`Total Bots: ${guild.members.cache.filter(member => member.user.bot).size}`);
        bot.channels.cache.get(config.CHANNELS.SERVERSTATS_HUMANS).setName(`Total Gamers: ${guild.members.cache.filter(member => !member.user.bot).size}`);
        bot.logMessage.log('INFO', `Server Stats has been updated! Total Members: ${guild.members.cache.size}, Total Bots: ${guild.members.cache.filter(member => member.user.bot).size}, Total Gamers: ${guild.members.cache.filter(member => !member.user.bot).size}`);
    } else {
        message.channel.send(config.MESASGES.NO_PERM);
    }
};