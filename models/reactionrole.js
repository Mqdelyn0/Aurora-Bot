const mongoose = require('mongoose');

const ReactionRole = mongoose.Schema({
    messageId: String,
    roleId: String
});

module.exports = mongoose.model('ReactionRole', ReactionRole);