const Discord = require('discord.js');
const config = require('../../config.json');
const os = require('os');

module.exports.run = async (bot, message, arguments) => {
    const listOfChannels = [];
    let guild = bot.guilds.cache.get(config.BOT_SETTINGS.GUILDID);
    guild.channels.cache.forEach(channel => {
        if(channel.type == 'text')
            listOfChannels.push(channel);
    });
    let totalSeconds = (bot.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let sendEmbed = new Discord.MessageEmbed()
        .setTitle('Aurora Bot Information')
        .setColor(config.BOT_SETTINGS.EMBED_COLOR)
        .addField('Bot Uptime', `${seconds}sec, ${minutes}min, ${hours}hr, ${days}d`)
        .addField('Bot OS', `${os.platform()}`)
        .addField('Bot RAM Usage', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB /${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`)
        .setFooter(config.BOT_SETTINGS.BOT_CREDITS);
    message.channel.send(sendEmbed);
};