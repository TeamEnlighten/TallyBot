const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const reqNumber = {
    type: Number,
    default: 0
}

const teamSchema = mongoose.Schema({
    guildId: reqString,
    userId: reqString,
    win:  reqNumber,
    loss: reqNumber,

})

module.exports = mongoose.model('score-data', teamSchema)