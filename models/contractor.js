const mongoose = require('mongoose');
var fs = require('fs');
var multer = require('multer');

const contractorsSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    gender:{
        type: String,
    },
    adhaar:{
        type: Number,
    },
    phone:{
        type: Number,
    },
    // img: { 
    //     data: Buffer, 
    //     contentType: String 
    //  }

    
})

const Contractor = mongoose.model('Contractors', contractorsSchema);

module.exports = Contractor;