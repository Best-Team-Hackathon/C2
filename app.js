require('dotenv').config()
const express = require('express');
const mongoose  = require('mongoose');
const app = express();
const path = require('path')
const ejsMate = require('ejs-mate')
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");




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

app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
app.use(passport.session());

  const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
  });
  
  userSchema.plugin(passportLocalMongoose);
  
  const User = new mongoose.model("User", userSchema);
  
  passport.use(User.createStrategy());
  
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());



app.get("/",(req,res)=>{
    res.render('home');
});

app.get("/login", function (req, res) {
    res.render("login");
  });

  app.post("/login", (req, res, next) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.render("login");
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect("/workers");
      });
    })(req, res, next);
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
    console.log(worker);
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

app.get("/signup", function (req, res) {
    res.render("signup");
  });
  
  app.post("/signup", (req, res) => {
    User.register(
      {
        username: req.body.username,
        email: req.body.email,
      },
      req.body.password,
      (err, user) => {
        if (err) {
          console.log(err);
          res.render("signup");
        } else {
          passport.authenticate("local")(req, res, () => {
            res.redirect("/workers");
          });
        }
      }
    );
  });

// app.post("/login",(req,res)=>{

// })


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

//images




app.listen(3000,()=>{
    console.log("serving on port 8000")
})