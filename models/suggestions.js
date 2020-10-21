const mongoose = require('mongoose');

const Suggestion = mongoose.Schema({
    id: String,
    suggestion: String,
    authorId: String
});

module.exports = mongoose.model('Suggestion', Suggestion);