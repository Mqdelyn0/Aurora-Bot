const mongoose = require('mongoose');

const Ticket = mongoose.Schema({
    channelId: String,
    authorId: String,
    reason: String,
});

module.exports = mongoose.model('Ticket', Ticket);