const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Schema is 'Collection' level category in MongoDB
// key: object-value pairs define non-relational records
// within that category

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
