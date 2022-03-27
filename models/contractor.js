const mongoose = require('mongoose');
var fs = require('fs');
var multer = require('multer');

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
    },
    // img: { 
    //     data: Buffer, 
    //     contentType: String 
    //  }

    
})

const Contractor = mongoose.model('Contractors', contractorsSchema);

module.exports = Contractor;