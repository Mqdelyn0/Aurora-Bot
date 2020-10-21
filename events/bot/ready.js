const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = async (bot) => {
    let guild = bot.guilds.cache.get(config.BOT_SETTINGS.GUILDID);
    bot.logMessage.log('READY', `Demonic Bot Started Up, Watching ${guild.members.cache.filter(member => !member.user.bot).size} people!`);
}