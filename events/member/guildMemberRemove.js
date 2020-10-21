const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = async (bot, member) => {
    let guild = bot.guilds.cache.get(config.BOT_SETTINGS.GUILDID);
    let channel = bot.channels.cache.get(config.CHANNELS.WELCOME_LEAVE);
    bot.logMessage.log('INFO', `${member.user.tag} has left! There are now ${guild.members.cache.filter(member => !member.user.bot).size} members!`);
    let sendEmbed = new Discord.MessageEmbed()
        .setTitle(`**LEAVE** [${guild.members.cache.filter(member => !member.user.bot).size}]`)
        .setDescription(`See ya from ${guild.name}, <@${member.user.id}>! We hope to see you again!`)
        .setColor(config.BOT_SETTINGS.EMBED_COLOR)
        .setFooter(config.BOT_SETTINGS.BOT_CREDITS);
    bot.channels.cache.get(config.CHANNELS.SERVERSTATS_ALL).setName(`Total Members: ${guild.members.cache.size}`);
    bot.channels.cache.get(config.CHANNELS.SERVERSTATS_BOTS).setName(`Total Bots: ${guild.members.cache.filter(member => member.user.bot).size}`);
    bot.channels.cache.get(config.CHANNELS.SERVERSTATS_HUMANS).setName(`Total Gamers: ${guild.members.cache.filter(member => !member.user.bot).size}`);
    channel.send(sendEmbed);
}