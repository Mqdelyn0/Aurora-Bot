const Discord = require('discord.js');
const config = require('../../config.json');
const CoinModel = require('../../models/coins.js');

module.exports.run = async (bot, message, arguments) => {
    if(arguments.length < 1) {
        await CoinModel.findOne({ id: message.author.id }, (err, rows) => {
            if(!rows)
                return message.channel.send(`Oh No! There was a error getting your economy data :( Please try again later or make a ticket!`);
            if(err) {
                message.channel.send(`Oh No! There was a error getting your economy data :( Please try again later or make a ticket!`);
                bot.logMessage.log('ERROR', `Oh No! There was a error getting a coins entry from MongoDB for ${message.author.tag}!`);
                bot.logMessage.log('ERROR', err);
                return;
            } else {
                let coinsToReturn = rows.toObject().coins;
                let sendEmbed = new Discord.MessageEmbed()
                    .setTitle('Economy | Coins')
                    .setDescription(`You currently have ${coinsToReturn} coins!`)
                    .setFooter(config.BOT_SETTINGS.BOT_CREDITS)
                    .setColor(config.BOT_SETTINGS.EMBED_COLOR);
                message.channel.send(sendEmbed);
            }
        });
    }
    else if(arguments.length >= 1) {
        let targetPerson = message.mentions.users.first();
        await CoinModel.findOne({ id: targetPerson.id }, (err, rows) => {
            if(!rows)
                return message.channel.send(`Oh No! Therer was a error getting your economy data :( Please try again later or make a ticket!`);
            if(err) {
                message.channel.send(`Oh No! Therer was a error getting your economy data :( Please try again later or make a ticket!`);
                bot.logMessage.log('ERROR', `Oh No! There was a error getting a coins entry from MongoDB for ${targetPerson.tag}!`);
                bot.logMessage.log('ERROR', err);
                return;
            } else {
                let coinsToReturn = rows.toObject().coins;
                let sendEmbed = new Discord.MessageEmbed()
                    .setTitle('Economy | Coins')
                    .setDescription(`<@${targetPerson.id}> currently have ${coinsToReturn} coins!`)
                    .setFooter(config.BOT_SETTINGS.BOT_CREDITS)
                    .setColor(config.BOT_SETTINGS.EMBED_COLOR);
                message.channel.send(sendEmbed);
            }
        });
    }
};