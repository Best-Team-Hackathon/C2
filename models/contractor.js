const mongoose = require('mongoose');

const contractorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name cannot be blank']
    },
    age: {
        type: Number,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
    adhaar:{
        type: Number,
        required: true,
    },
    phone:{
        type: Number,
        required: true
    }
    
})

const Contractor = mongoose.model('Contractors', contractorsSchema);

module.exports = Contractor;