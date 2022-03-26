const mongoose = require('mongoose');

const contractorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name cannot be blank']
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    // category: {
    //     type: String,
    //     lowercase: true,
    // }
})

const Contractor = mongoose.model('Contractors', contractorsSchema);

module.exports = Contractor;