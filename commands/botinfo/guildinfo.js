const Discord = require('discord.js');
const config = require('../../config.json');

module.exports.run = async (bot, message, arguments) => {
    const listOfChannels = [];
    let guild = bot.guilds.cache.get(config.BOT_SETTINGS.GUILDID);
    guild.channels.cache.forEach(channel => {
        if(channel.type == 'text')
            listOfChannels.push(channel);
    });
    let sendEmbed = new Discord.MessageEmbed()
        .setTitle('Demonic Network Information')
        .setColor(config.BOT_SETTINGS.EMBED_COLOR)
        .addField('Guild Owner', `${guild.owner}`, true)
        .addField('Guild Created', `${guild.createdAt.toDateString()}`, true)
        .addField('Guild Name', `${guild.name}`, true)
        .addField(`Guild Roles [${guild.roles.cache.size}]`, `${guild.roles.cache.map(roles => `${roles}`).join(', ')}`, true)
        .addField(`Guild Channels [${listOfChannels.length}]`, `${listOfChannels.join(', ')}`)
        .addField('Guild Members | All', `${guild.members.cache.size}`, true)
        .addField('Guild Members | Humans', `${guild.members.cache.filter(member => !member.user.bot).size}`, true)
        .addField('Guild Members | Robots', `${guild.members.cache.filter(member => member.user.bot).size}`, true)
        .setFooter(config.BOT_SETTINGS.BOT_CREDITS);
    message.channel.send(sendEmbed);
};