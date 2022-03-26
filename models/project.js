const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    location:{
        city: String,
        state: String,
    },
    geometry:{      // geoJSON format to store geographic points
        type: {
            type: String, 
            enum: ['Point'],
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
    }
})

const Project = mongoose.model('Projects', projectSchema)

module.exports = Project