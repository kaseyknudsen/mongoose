/* this is where we will define the mongoose schema and the model  for all documents
in our databases campsites collection*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campsiteSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    /* causes mongoose to automatically add 2 properties to this scheme:
    1. createdAt & updatedAt (mongoose will manage for us)*/
    timestamps: true
})

//first argument needs to be singular and capitalized
const Campsite = mongoose.model('Campsite', campsiteSchema);

module.exports = Campsite;