const Discord = require('discord.js');
const config = require('../../config.json');
const reactionRoleModel = require('../../models/reactionrole.js');

module.exports.run = async (bot, message, arguments) => {
    const guild = bot.guilds.cache.get(config.BOT_SETTINGS.GUILDID);
    const roles = config.PERMISSIONS.ADMINISTRAION_COMMANDS;
    if(message.member.roles.cache.some(role => roles.includes(role.id))) {
        if(arguments.length < 1) {
            let sendEmbed = new Discord.MessageEmbed()
                .setColor(config.BOT_SETTINGS.EMBED_COLOR)
                .setFooter(config.BOT_SETTINGS.BOT_CREDITS)
                .setTitle(`Incorrect Usage | ${message.author.tag}`)
                .setDescription(`\n-reactionrole create (role id)\n-reactionrole delete (message id)`);
            message.channel.send(sendEmbed);
            return;
        }
    const role = guild.roles.cache.get()
    } else {
        message.channel.send(config.MESASGES.NO_PERM);
    }
};