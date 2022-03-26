const mongoose = require('mongoose');
const Worker = require('../models/worker');

const cloudDB_URL = 'mongodb+srv://best_team:best_team@cluster0.pdhtp.mongodb.net/hackathon?retryWrites=true&w=majority'


mongoose.connect(cloudDB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedData = [
    {name:'darshan' , age:20, gender:'M', adhaar:2323, phone:32442342},
    {name:'darsan' , age:20, gender:'M', adhaar:2323, phone:32442342},
    {name:'arshn' , age:0, gender:'M', adhaar:2323, phone:32442342},
    {name:'daran' , age:2, gender:'M', adhaar:2323, phone:32442342},
    {name:'darsan' , age:20, gender:'M', adhaar:2323, phone:324422342},
]

Worker.insertMany(seedData)
    .then(data=>{
        console.log('Success');
    })