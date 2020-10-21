const Discord = require('discord.js');
const config = require('../../config.json');
const TicketModel = require('../../models/tickets.js');

module.exports.run = async (bot, message, arguments) => {
    let ticketId = message.channel.id;
    if(!await TicketModel.findOne({ channelId: ticketId }))
        return message.channel.send('This isn\'t a ticket!');
    await TicketModel.findOne({ channelId: ticketId }, (err, rows) => {
        if(err) {
            message.channel.send('Oh No! There was a error with our ticketing system... Try again later!');
            bot.logMessage.log('ERROR', `There was a error trying to get a ticket entry from MongoDB for ${message.author.tag}`);
            bot.logMessage.log('ERROR', err);
            return;
        } else {
            const channel = message.guild.channels.cache.find(channel => channel.id === ticketId);
            channel.delete();
            TicketModel.deleteOne({ channelId: ticketId }, (err) => {
                if(err) {
                    message.channel.send('Oh No! There was a error with our ticketing system... Try again later!');
                    bot.logMessage.log('ERROR', `There was a error trying to delete a ticket entry from MongoDB for ${message.author.tag}`);
                    bot.logMessage.log('ERROR', err);
                    return;
                }
                bot.logMessage.log('INFO', `Successfully deleted a ticket entry from MongoDB for ${message.author.tag}`);
            });
        }
    });
};