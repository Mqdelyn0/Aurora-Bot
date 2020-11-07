const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = async (bot, oldMember, newMember) => {
    const oldRoles = [];
    const newRoles = [];
    const removedRoles = [];
    const addedRoles = [];
    oldMember.roles.cache.forEach(role => oldRoles.push(role));
    newMember.roles.cache.forEach(role => newRoles.push(role));
    oldRoles.forEach(role => {
        if(!newRoles.includes(role))
            removedRoles.push(role);
    });
    newRoles.forEach(role => {
        if(!oldRoles.includes(role))
            addedRoles.push(role);
    });
    if(removedRoles.length >= 1) {
        bot.logMessage.log('INFO', `${removedRoles[0].name} has been removed from ${newMember.user.tag}!`);
        return;
    } else if(addedRoles.length >= 1) {
        bot.logMessage.log('INFO', `${addedRoles[0].name} has been added to ${newMember.user.tag}!`);
        return;
    }
}