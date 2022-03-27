const mongoose = require('mongoose')
const {Schema, model} = mongoose
const Worker = require('./worker')

const attendenceSchema = Schema({
    date: String,
    worker: {type:Schema.Types.ObjectId, ref:'Worker'}
})

const Attendence = new model('Attendence', attendenceSchema)

module.exports = Attendence 