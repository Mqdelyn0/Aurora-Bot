const Discord = require('discord.js');
const config = require('../../config.json');
const SuggestionModel = require('../../models/suggestions.js');

module.exports.run = async (bot, message, arguments) => {
    const roles = config.PERMISSIONS.ADMINISTRAION_COMMANDS;
    const reason = arguments.slice(2).join(' ');
    if(message.member.roles.cache.some(role => roles.includes(role.id))) {
        if(arguments.length < 1) {
            let sendEmbed = new Discord.MessageEmbed()
                .setColor(config.BOT_SETTINGS.EMBED_COLOR)
                .setFooter(config.BOT_SETTINGS.BOT_CREDITS)
                .setTitle(`Incorrect Usage | ${message.author.tag}`)
                .setDescription(`\n-suggestions accept (message id)\n-suggestions deny (message id)`);
            message.channel.send(sendEmbed);
        }
        else if(arguments.length >= 2) {
            if(arguments[0] != "accept" && arguments[0] != "deny") {
                let sendEmbed = new Discord.MessageEmbed()
                    .setColor(config.BOT_SETTINGS.EMBED_COLOR)
                    .setFooter(config.BOT_SETTINGS.BOT_CREDITS)
                    .setTitle(`Incorrect Usage | ${message.author.tag}`)
                    .setDescription(`\n-suggestions accept (message id) (reason)\n-suggestions deny (message id) (reason)`);
                message.channel.send(sendEmbed);
                return;
            }
            let suggestModel = await SuggestionModel.findOne({ id: arguments[1] });
            if(!suggestModel) {
                let sendEmbed = new Discord.MessageEmbed()
                    .setColor(config.BOT_SETTINGS.EMBED_COLOR)
                    .setFooter(config.BOT_SETTINGS.BOT_CREDITS)
                    .setTitle(`Error | ${message.author.tag}`)
                    .setDescription(`\nThat isn't a suggestion!`);
                message.channel.send(sendEmbed);
                return;
            }
            if(arguments[0] == "accept") {
                let channel = bot.channels.cache.get(config.CHANNELS.SUGGESTIONS_ACCEPTED);
                let author = bot.users.cache.get(suggestModel.authorId);
                let sendEmbed = new Discord.MessageEmbed()
                    .setColor(config.BOT_SETTINGS.EMBED_COLOR)
                    .setFooter(config.BOT_SETTINGS.BOT_CREDITS)
                    .setTitle(`Accepted Suggestion | ${author.tag}`)
                    .setDescription(`**SUGGESTION** ${suggestModel.suggestion}\n**REASON** ${reason}`);
                channel.send(sendEmbed);
                suggestModel.deleteOne({ id: arguments[1] }, (err) => {
                    if(err) {
                        bot.logMessage.log('ERROR', `Oh No! There was a error deleting a suggestions entry to MongoDB for ${message.author.tag}!`);
                        bot.logMessage.log('ERROR', error);
                    }
                });
            }
            if(arguments[0] == "deny") {
                let channel = bot.channels.cache.get(config.CHANNELS.SUGGESTIONS_DENIED);
                let author = bot.users.cache.get(suggestModel.authorId);
                let sendEmbed = new Discord.MessageEmbed()
                    .setColor(config.BOT_SETTINGS.EMBED_COLOR)
                    .setFooter(config.BOT_SETTINGS.BOT_CREDITS)
                    .setTitle(`Denied Suggestion | ${author.tag}`)
                    .setDescription(`**SUGGESTION** ${suggestModel.suggestion}\n**REASON** ${reason}`);
                channel.send(sendEmbed);
                suggestModel.deleteOne({ id: arguments[1] }, (err) => {
                    if(err) {
                        bot.logMessage.log('ERROR', `Oh No! There was a error deleting a suggestions entry to MongoDB for ${message.author.tag}!`);
                        bot.logMessage.log('ERROR', error);
                    }
                });
            }
        }
    } else {
        message.channel.send(config.MESASGES.NO_PERM);
    }
};