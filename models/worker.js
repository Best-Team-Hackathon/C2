const mongoose = require('mongoose');

const workersSchema = new mongoose.Schema({
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

const Worker = mongoose.model('Workers', workersSchema);

module.exports = Worker;