const Discord = require('discord.js');
const config = require('../../config.json');

module.exports.run = async (bot, message, arguments) => {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Bot Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ws.ping)}ms`);
};