const mongoose = require('mongoose');

const Coin = mongoose.Schema({
    id: String,
    coins: Number
});

module.exports = mongoose.model('Coin', Coin);