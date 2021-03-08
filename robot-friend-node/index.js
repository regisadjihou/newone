const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors')
const app = express()
const register = require("./controllers/register")
const signin = require("./controllers/signin")
const image = require("./controllers/image")
const profile = require("./controllers/profile")
//help to connect the frontend to the backend
app.use(cors())
//************************************** 

app.use(bodyParser.json())

// MySql database   
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user : 'root',
        password : 'regis',
        database : 'brain'
    }
  });

app.get('/', function (req, res) {
  knex.select('*').from('users')
  .then(data=>{
    res.json(data)
  })
  
})

//route signin
app.post('/signin', (req, res)=>{signin.handleSignin(req, res, bcrypt,knex)})

//route register
app.post('/register', (req, res)=>{register.handleRegister(req, res, bcrypt,knex)})

// User Profile route --need some work 
app.post('/profile/:id', (req, res)=>{profile.handleProfile(req, res,knex)})  

// rout to increase the entries everytime a picture is submit  
app.put('/image',(req, res)=>{image.handleimage(req, res, knex)})  





// app start on port 3001
app.listen(3001, ()=>{
    console.log("server has started on port 3001")
})



