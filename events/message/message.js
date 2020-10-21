const Discord = require('discord.js');
const config = require('../../config.json');
const CoinModel = require('../../models/coins.js');
const SuggestionModel = require('../../models/suggestions.js');

function generateCoins() {
    let coin = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    return coin;
}

module.exports = async (bot, message) => {
    if(message.author.bot)
        return;
    let model = await CoinModel.findOne({ id: message.author.id });
    if(message.channel.id === config.CHANNELS.SUGGESTIONS_CREATE) {
        let sendEmbed = new Discord.MessageEmbed()
            .setColor(config.BOT_SETTINGS.EMBED_COLOR)
            .setFooter(config.BOT_SETTINGS.BOT_CREDITS)
            .setTitle(`Suggestion | ${message.author.tag}`)
            .setDescription(message);
        message.channel.send(sendEmbed).then(msg => {
            msg.react(`768208414429937714`)
            msg.react(`768208361920790578`);
            let suggestModel = new SuggestionModel({ id: msg.id, suggestion: message, authorId: message.author.id });
            try {
                suggestModel.save();
            } catch(error) {
                bot.logMessage.log('ERROR', `Oh No! There was a error making a suggestions entry to MongoDB for ${message.author.tag}!`);
                bot.logMessage.log('ERROR', error);
                msg.delete();
            }
        });
        message.delete();
    }
    if(!model) {
        let model = new CoinModel({ id: message.author.id, coins: generateCoins() });
        try {
            await model.save();
            message.channel.send(`Congrats! You said your first messaage! Do \`-coins\` @ <#${config.CHANNELS.BOT_SPAM}>`);
        } catch(error) {
            bot.logMessage.log('ERROR', `Oh No! There was a error making a coins entry to MongoDB for ${message.author.tag}!`);
            bot.logMessage.log('ERROR', error);
        }
        return;
    } else {
        await CoinModel.findOne({ id: message.author.id }, (err, rows) => {
            let coinsAdding = generateCoins();
            if(err) {
                bot.logMessage.log('ERROR', `Oh No! There was a error getting a coins entry from MongoDB for ${message.author.tag}!`);
                bot.logMessage.log('ERROR', error);
            } else {
                let coinsToAdd = rows.toObject().coins;
                CoinModel.updateOne({ id: message.author.id }, { coins: coinsToAdd + coinsAdding }, (err) => {
                    if(err) {
                        bot.logMessage.log('ERROR', `Oh No! There was a error updating a coins entry to MongoDB for ${message.author.tag}!`);
                        bot.logMessage.log('ERROR', error);
                    } else {
                    }
                });
            }
        });
    }
}