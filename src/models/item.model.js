const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Item = new Schema({
    name: {
        type: String
    },
    greeting: {
        type: String
    },
    file: {
        type: Object
    }
})

module.exports = mongoose.model('Item', Item)

// END of document
