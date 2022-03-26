const express = require('express');
const mongoose  = require('mongoose');
const app = express();
const path = require('path')
const ejsMate = require('ejs-mate')
const Worker  = require('./models/worker')
const methodOverride = require('method-override')
const cloudDB_URL = 'mongodb+srv://best_team:best_team@cluster0.pdhtp.mongodb.net/hackathon?retryWrites=true&w=majority'


mongoose.connect(cloudDB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.engine('ejs', ejsMate)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))


app.get("/",(req,res)=>{
    res.render('home');
});

// app.get("/makecampground",async(req,res)=>{
//     const camp = new Campground({title:'My BackYard',description:'Cheap camping'})
//     await camp.save();
//     res.send(camp)
// });
app.get("/workers",async(req,res)=>{
    const workers = await Worker.find({})
    res.render('workers/index',{workers})
})
app.get('/workers/new',(req,res)=>{
    res.render('workers/new');
})
app.post('/workers',async(req,res)=>{
    const worker = new Worker(req.body.worker)
    await worker.save();
    console.log(req.body);
    res.redirect(`/workers`)
})

app.get('/workers/:id',async(req,res)=>{
    // const {id}=req.params()
    const campground = await Campground.findById(req.params.id)
    res.render('workers/show',{campground})
})

app.get('/workers/:id/edit',async(req,res)=>{
    const worker = await Worker.findById(req.params.id)
    res.render('workers/edit',{worker})
})
app.put('/workers/:id',async(req,res)=>{
    const {id}=req.params;
    const worker = await Worker.findByIdAndUpdate(id,{...req.body.worker})
    res.redirect('/workers');
})

app.delete('/workers/:id',async(req,res)=>{
    const {id}= req.params;
    await Worker.findByIdAndDelete(id);
    res.redirect('/workers');
})




app.get('/projects/new', (req, res)=>{
    res.render('project/new')
})
app.post('/projects', (req, res)=>{
    console.log(req.body);
    res.send('made postttttt')
})




app.listen(8000,()=>{
    console.log("serving on port 8000")
})