require('dotenv').config()
const express = require('express');
const mongoose  = require('mongoose');
const app = express();
const path = require('path')
const ejsMate = require('ejs-mate')

const Worker  = require('./models/worker')
const Contractor = require('./models/contractor')
const Project = require('./models/project')

const methodOverride = require('method-override');
const getGeoData = require('./mapbox/helper');
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
app.use(express.static('public'))
app.use(methodOverride('_method'))


app.get("/",(req,res)=>{
    res.render('home');
});

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

// app.get('/workers/:id',async(req,res)=>{
//     // const {id}=req.params()
//     const campground = await Campground.findById(req.params.id)
//     res.render('workers/show',{campground})
// })

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



// -------------------------------------------------------------
app.get("/",(req,res)=>{
    res.render('home');
});


app.get('/projects', async (req, res)=>{
    const projects = await Project.find({})
    res.render('project/index', {projects})
})
app.get('/projects/new', (req, res)=>{
    res.render('project/new')
})
app.post('/projects', async (req, res)=>{
    console.log(req.body);
    const project = new Project(req.body.project)
    const geoData = await getGeoData(project.location)
    project.geometry =  geoData.body.features[0].geometry

    await project.save()
    res.redirect('/projects')
})




app.get("/contractors",async(req,res)=>{
    const contractors = await Contractor.find({})
    res.render('contractors/index',{contractors})
})
app.get('/contractors/new',(req,res)=>{
    res.render('contractors/new');
})
app.post('/contractors',async(req,res)=>{
    const contractor = new Contractor(req.body.contractor)
    await contractor.save();
    console.log(req.body);
    res.redirect(`/contractors`)
})

// app.get('/workers/:id',async(req,res)=>{
//     // const {id}=req.params()
//     const campground = await Campground.findById(req.params.id)
//     res.render('workers/show',{campground})
// })

app.get('/contractors/:id/edit',async(req,res)=>{
    const contractor = await Contractor.findById(req.params.id)
    res.render('contractors/edit',{contractor})
})
app.put('/contractors/:id',async(req,res)=>{
    const {id}=req.params;
    const contractor = await Contractor.findByIdAndUpdate(id,{...req.body.contractor})
    res.redirect('/contractors');
})

app.delete('/contractors/:id',async(req,res)=>{
    const {id}= req.params;
    await Contractor.findByIdAndDelete(id);
    res.redirect('/contractors');
})



app.listen(8000,()=>{
    console.log("serving on port 8000")
})