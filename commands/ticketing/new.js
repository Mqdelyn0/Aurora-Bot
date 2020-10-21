const Discord = require('discord.js');
const config = require('../../config.json');
const TicketModel = require('../../models/tickets.js');

module.exports.run = async (bot, message, arguments) => {
    if(arguments.length < 1) {
        return message.channel.send("You need a reason to make a ticket! `-new (reason)`");
    } else {
        let reason = arguments.join(' ');
        let hasATicket = await TicketModel.findOne(
            { authorId: `${message.author.id}` }
        );
        if(hasATicket) {
            let ticket = await TicketModel.findOne({ authorId: `${message.author.id}` }, (err, rows) => {
                if(err) {
                    message.channel.send('Oh No! There was a error with our ticketing system... Try again later!');
                    bot.logMessage.log('ERROR', `There was a error trying to get a ticket entry from MongoDB for ${message.author.id}`);
                    bot.logMessage.log('ERROR', err);
                    return;
                } else {
                    return rows.toObject().channelId;
                }
            });
            message.channel.send(`You already have a ticket! Visit it @ <#${ticket.channelId}>`);
            return;
        }
        
        message.guild.channels.create(`ticket-${message.author.username}`, 'text').then(async channel => {
            let model = new TicketModel(
                { channelId: `${channel.id}`, authorId: `${message.author.id}`, reason: `${reason}`}
            );
            try {
                await model.save();
                message.channel.send(`The ticket creation was successfully created! Visit the ticket @ <#${channel.id}>`);
                channel.overwritePermissions([
                    {
                        id: message.author.id,
                        allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES']
                    },
                    {
                        id: message.guild.id,
                        deny: ['VIEW_CHANNEL']
                    },
                    {
                        id: config.PERMISSIONS.SUPPORT_ROLE,
                        allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES']
                    }
                ]);
                let sendEmbed = new Discord.MessageEmbed()
                    .setTitle('Ticket Creation')
                    .setColor(config.BOT_SETTINGS.EMBED_COLOR)
                    .setFooter(config.BOT_SETTINGS.BOT_CREDITS)
                    .setDescription(`Welcome to your ticket! If you would like to close the ticket at any time, Do "-close"!\nReason: ${reason}`);
                channel.send(sendEmbed);
            } catch(error) {
                bot.logMessage.log('ERROR', `Oh No! There was a error making a tickets entry to MongoDB for ${message.author.tag}!`);
                bot.logMessage.log('ERROR', error);
            }
        })
    }
};