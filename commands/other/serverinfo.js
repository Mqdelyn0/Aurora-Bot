const Discord = require('discord.js');
const config = require('../../config.json');
const ping = require('minecraft-server-util');
const { set } = require('mongoose');

module.exports.run = async (bot, message, arguments) => {
    if(arguments.length < 2)
        return message.channel.send('Usage: `-serverinfo (Server IP) (Port, Usually 25565)`');

    ping(`${arguments[0]}`, Number.parseInt(arguments[1]), (err, res) => {
        if(err)
            return message.channel.send('An error occured :(');
        let sendEmbed = new Discord.MessageEmbed()
            .setTitle(`Server Info: ${arguments[0]}:${arguments[1]}`)
            .setColor(config.BOT_SETTINGS.EMBED_COLOR)
            .setFooter(config.BOT_SETTINGS.BOT_CREDITS)
            .addFields(
                { name: "Online Players", value: `${res.onlinePlayers}` },
                { name: "Max Players", value: `${res.maxPlayers}` },
                { name: "Server Version", value: `${res.version}` }
            );
        message.channel.send(sendEmbed);
    });
};